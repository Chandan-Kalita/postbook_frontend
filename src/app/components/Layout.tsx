"use client"
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ReactNode } from 'react';
import { NotificationPanel } from './Notification/NotificationPanel';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { logout, logoutAsync, selectUser, updateProfile } from '@/lib/store/features/appSlice';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

// Main Layout Component
export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)
    const [openNameChangeModal, setOpenNameChangeModal] = useState(false)
    useEffect(() => {
        if (!user?.name) {
            setOpenNameChangeModal(true)
        }
    }, [user])
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold">Social App</h1>
                    <div className="flex items-center space-x-4">
                        <NotificationPanel />
                        <Avatar className="w-8 h-8">
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <Button variant="ghost" onClick={() => { dispatch(logoutAsync()) }}>Logout</Button>
                        <NameChangeDialog openNameChangeModal={openNameChangeModal} />
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 px-4 flex gap-6">
                {children}
            </main>
        </div>
    );
};

export const NameChangeDialog = ({ openNameChangeModal, setModelOpen }: { openNameChangeModal: boolean, setModelOpen?: (v: boolean) => void }) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)
    const [name, setName] = useState(user?.name)

    const handleSubmit = () => {
        if (!name) return
        dispatch(updateProfile({ name: name }))
    }
    return <Dialog open={openNameChangeModal} onOpenChange={(v) => { setModelOpen?.(v) }}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input id="name" value={name || ""} onChange={(e) => { setName(e.target.value) }} className="col-span-3" />
                </div>
            </div>
            <DialogFooter>
                <Button onClick={handleSubmit} type="submit">Save changes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}
