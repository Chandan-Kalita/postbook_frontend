"use client"
import React, { useEffect } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SuggestedUserCard } from './SuggestedUserCard';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { selectUserSuggestions, setUserSuggestions } from '@/lib/store/features/userSlice/userSlice';


export const PeopleSuggestions = () => {
    const dispatch = useAppDispatch()
    const suggestedUsers = useAppSelector(selectUserSuggestions)
    useEffect(() => {
        dispatch(setUserSuggestions())
    }, [])

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
                        username={user.username}
                        fullName={user.name || ""}
                        id={user.id || ""}
                        mutualFriends={0}
                    />
                ))}
            </CardContent>
        </Card>
    );
};