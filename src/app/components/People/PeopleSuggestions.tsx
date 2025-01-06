"use client"
import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SuggestedUserCard } from './SuggestedUserCard';


export const PeopleSuggestions = () => {
    const suggestedUsers = [
        { username: 'alex_smith', fullName: 'Alex Smith', mutualFriends: 5 },
        { username: 'emma_wilson', fullName: 'Emma Wilson', mutualFriends: 3 },
        { username: 'james_brown', fullName: 'James Brown', mutualFriends: 2 },
        { username: 'lisa_parker', fullName: 'Lisa Parker', mutualFriends: 7 },
        { username: 'mark_davis', fullName: 'Mark Davis', mutualFriends: 1 }
    ];

    return (
        <Card className="w-64">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">People you might know</h3>
                    <Button variant="ghost" size="sm">See all</Button>
                </div>
            </CardHeader>
            <CardContent className="divide-y">
                {suggestedUsers.map((user) => (
                    <SuggestedUserCard
                        key={user.username}
                        {...user}
                    />
                ))}
            </CardContent>
        </Card>
    );
};