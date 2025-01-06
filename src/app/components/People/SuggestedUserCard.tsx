"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";


export interface SuggestedUserCardProps {
    username: string;
    fullName: string;
    mutualFriends: number;
}

export const SuggestedUserCard: React.FC<SuggestedUserCardProps> = ({ username, fullName, mutualFriends }) => {
    const [isFollowing, setIsFollowing] = React.useState(false);

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
                variant={isFollowing ? "outline" : "default"}
                size="sm"
                onClick={() => setIsFollowing(!isFollowing)}
            >
                {isFollowing ? 'Following' : 'Follow'}
            </Button>
        </div>
    );
};