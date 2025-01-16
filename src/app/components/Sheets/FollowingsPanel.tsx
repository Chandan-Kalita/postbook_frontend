"use client"
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Bell, } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { selectFollowingCount, selectFollowings, setFollowingCount, setFollowings, unFollow } from '@/lib/store/features/userSlice/userSlice';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


export const FollowingsPanel = () => {
    const dispatch = useAppDispatch()
    const followingCount = useAppSelector(selectFollowingCount)
    const followings = useAppSelector(selectFollowings)
    useEffect(() => {
        dispatch(setFollowingCount())
        dispatch(setFollowings())
    }, [followingCount])

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className='cursor-pointer'>
                    <div className="font-semibold">{followingCount}</div>
                    <div className="text-sm text-gray-500">Following</div>
                </div>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Followings</SheetTitle>
                </SheetHeader>
                <div className="mt-4 divide-y">
                    {followings.map((user, index) => (
                        <UserCard key={user.id} username={user.username} fullName={user.name ?? ""} id={user.id ?? ""} />
                    ))}
                </div>            </SheetContent>
        </Sheet>
    );
};

function UserCard({ username, fullName, id }: { username: string, fullName: string, id: string }) {
    const dispatch = useAppDispatch()
    function handleUnFollow(id: string) {
        dispatch(unFollow({ user_id: id }))
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
            <Button
                variant={"destructive"}
                size="sm"
                onClick={() => handleUnFollow(id)}
            >
                Unfollow
            </Button>
        </div>
    </div>
}