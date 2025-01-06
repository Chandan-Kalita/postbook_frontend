"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { Bell, } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NotificationItem } from './NotificationItem';


export const NotificationPanel = () => {
    const notifications = [
        { type: 'like', username: 'sarah_smith', time: '5m ago', read: false },
        { type: 'follow', username: 'mike_jones', time: '15m ago', read: false },
        { type: 'comment', username: 'emily_wilson', time: '1h ago', read: true },
        { type: 'like', username: 'john_doe', time: '2h ago', read: true }
    ];

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                        2
                    </span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Notifications</SheetTitle>
                </SheetHeader>
                <div className="mt-4 divide-y">
                    {notifications.map((notification, index) => (
                        <NotificationItem key={index} {...notification} />
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
};
