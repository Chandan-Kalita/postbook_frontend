"use client"
import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, } from "@/components/ui/avatar";


// User Profile Sidebar
export const ProfileSidebar = () => {
    return (
        <Card className="w-64 h-fit">
            <CardHeader>
                <Avatar className="w-16 h-16 mx-auto">
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="text-center mt-2">
                    <h3 className="font-semibold">John Doe</h3>
                    <p className="text-sm text-gray-500">@johndoe</p>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex justify-around text-center">
                    <div>
                        <div className="font-semibold">120</div>
                        <div className="text-sm text-gray-500">Following</div>
                    </div>
                    <div>
                        <div className="font-semibold">1.2k</div>
                        <div className="text-sm text-gray-500">Followers</div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">
                    Edit Profile
                </Button>
            </CardFooter>
        </Card>
    );
};
