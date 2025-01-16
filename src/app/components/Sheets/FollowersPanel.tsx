"use client"
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Bell, } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { selectFollowerCount, selectFollowers, selectFollowingCount, setFollowerCount, setFollowers, setFollowingCount } from '@/lib/store/features/userSlice/userSlice';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


export const FollowersPanel = () => {
    const dispatch = useAppDispatch()
    const followerCount = useAppSelector(selectFollowerCount)
    const followers = useAppSelector(selectFollowers)

    useEffect(() => {
        dispatch(setFollowerCount())
        dispatch(setFollowers())
    }, [followerCount])

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className='cursor-pointer'>
                    <div className="font-semibold">{followerCount}</div>
                    <div className="text-sm text-gray-500">Followers</div>
                </div>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Followers</SheetTitle>
                </SheetHeader>
                <div className="mt-4 divide-y">
                    {followers.map((user, index) => (
                        <UserCard key={user.id} username={user.username} fullName={user.name ?? ""} id={user.id ?? ""} />
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
};


function UserCard({ username, fullName, id }: { username: string, fullName: string, id: string }) {
    function handleUnFollow(id: string) {

    }
    return <div className="flex items-center justify-between py-3">
        <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
                <AvatarFallback>{username[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="text-sm font-medium">{fullName}</span>
                <span className="text-xs text-gray-500">@{username}</span>

            </div>
        </div>
    </div>
}