"use client"
import React from 'react';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Login Page Component
export const LoginPage = ({ setLoginStatus }: { setLoginStatus: (status: boolean) => void }) => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md">
                <CardContent className="space-y-6 p-6">
                    <div className="w-full aspect-video bg-gray-100 rounded-lg mb-6">
                        <div className="h-full flex items-center justify-center text-gray-400">
                            Logo/Image
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Input placeholder="Username" />
                        <Input type="password" placeholder="Password" />
                        <Button onClick={() => setLoginStatus(true)} className="w-full">Sign In</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};