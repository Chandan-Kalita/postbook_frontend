"use client"
import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { selectUser } from '@/lib/store/features/appSlice';
import { NameChangeDialog } from './Layout';
import { setUserSuggestions } from '@/lib/store/features/userSlice/userSlice';
import { FollowingsPanel } from './Sheets/FollowingsPanel';
import { FollowersPanel } from './Sheets/FollowersPanel';


// User Profile Sidebar
export const ProfileSidebar = () => {
    const user = useAppSelector(selectUser)
    const [openNameChangeModal, setOpenNameChangeModal] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setUserSuggestions())
    }, [])
    return (
        <Card className="w-64 h-fit">
            <CardHeader>
                <Avatar className="w-16 h-16 mx-auto">
                    <AvatarFallback>{user?.name?.split(" ").map((v) => v[0]).join("").substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="text-center mt-2">
                    <h3 className="font-semibold">{user?.name}</h3>
                    <p className="text-sm text-gray-500">@{user?.username}</p>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex justify-around text-center">
                    <FollowingsPanel />
                    <FollowersPanel />
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setOpenNameChangeModal(true)}>
                    Edit Profile
                </Button>
                <NameChangeDialog openNameChangeModal={openNameChangeModal} setModelOpen={setOpenNameChangeModal} />
            </CardFooter>
        </Card>
    );
};
