"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAppDispatch } from '@/lib/store/hooks';
import { follow } from '@/lib/store/features/userSlice/userSlice';


export interface SuggestedUserCardProps {
    username: string;
    fullName: string;
    mutualFriends: number;
    id: string
}

export const SuggestedUserCard: React.FC<SuggestedUserCardProps> = ({ username, fullName, mutualFriends, id }) => {
    const dispatch = useAppDispatch()
    function handleFollow(user_id: string) {
        dispatch(follow({ user_id }))
    }
    return (
        <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                    <AvatarFallback>{username[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-sm font-medium">{fullName}</span>
                    <span className="text-xs text-gray-500">@{username}</span>
                    {mutualFriends > 0 && (
                        <span className="text-xs text-gray-500">{mutualFriends} mutual friends</span>
                    )}
                </div>
            </div>
            <Button
                variant={"default"}
                size="sm"
                onClick={() => handleFollow(id)}
            >
                Follow
            </Button>
        </div>
    );
};