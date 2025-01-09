"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ReactNode } from 'react';
import { NotificationPanel } from './Notification/NotificationPanel';
import { useAppDispatch } from '@/lib/store/hooks';
import { logout, logoutAsync } from '@/lib/store/features/appSlice';

// Main Layout Component
export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const dispatch = useAppDispatch()
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
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 px-4 flex gap-6">
                {children}
            </main>
        </div>
    );
};
