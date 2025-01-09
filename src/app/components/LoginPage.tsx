"use client"
import React from 'react';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { RootState } from '@/lib/store/store';
import { counterSlice } from '@/lib/store/features/counterSlice';
import { login, selectAppLoading } from '@/lib/store/features/appSlice';

// Login Page Component
export const LoginPage = () => {
    const count = useAppSelector((state: RootState) => state.counter.value)
    const isLoading = useAppSelector(selectAppLoading)
    const dispatch = useAppDispatch()
    const [usernameInput, setUsernameInput] = React.useState('')
    const [passwordInput, setPasswordInput] = React.useState('')
    function handleLogin() {
        dispatch(login({ username: usernameInput, password: passwordInput }))
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md">
                <CardContent className="space-y-6 p-6">
                    <div className="w-full aspect-video bg-gray-100 rounded-lg mb-6">
                        <div className="h-full flex items-center justify-center text-gray-400">
                            {count}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Input onChange={(e) => { setUsernameInput(e.target.value) }} value={usernameInput} placeholder="Username" />
                        <Input type="password" placeholder="Password" onChange={(e) => { setPasswordInput(e.target.value) }} value={passwordInput} />

                        {!isLoading ? <Button onClick={handleLogin} className="w-full">Sign In</Button> : <Button disabled className="w-full">Loading...</Button>}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};