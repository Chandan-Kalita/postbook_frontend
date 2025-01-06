"use client"
import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export interface NotificationItemProps {
    type: string;
    username: string;
    time: string;
    read: boolean;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ type, username, time, read }) => {
    const getNotificationContent = () => {
        switch (type) {
            case 'like':
                return `${username} liked your post`;
            case 'follow':
                return `${username} started following you`;
            case 'comment':
                return `${username} commented on your post`;
            default:
                return '';
        }
    };

    return (
        <div className={`p-4 border-b ${read ? 'bg-white' : 'bg-blue-50'}`}>
            <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10">
                    <AvatarFallback>{username[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <p className="text-sm">{getNotificationContent()}</p>
                    <span className="text-xs text-gray-500">{time}</span>
                </div>
            </div>
        </div>
    );
};