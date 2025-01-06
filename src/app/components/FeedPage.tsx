"use client"
import React from 'react';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Post } from './Post';


// Feed Page Component
export const FeedPage = () => {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <Card className="mb-6">
                <CardContent className="p-4">
                    <Input placeholder="Write a post..." />
                    <Button className="mt-4">Post</Button>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <Post
                    username="johndoe"
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                />
                <Post
                    username="janedoe"
                    content="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
                <Post
                    username="janedoe"
                    content="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
                <Post
                    username="janedoe"
                    content="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
                <Post
                    username="janedoe"
                    content="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
                <Post
                    username="janedoe"
                    content="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
                <Post
                    username="janedoe"
                    content="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
                <Post
                    username="janedoe"
                    content="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
                <Post
                    username="janedoe"
                    content="Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
            </div>
        </div>
    );
};
