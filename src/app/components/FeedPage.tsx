"use client"
import React, { useEffect } from 'react';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Post } from './Post';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { createPost, loadPosts, selectPosts } from '@/lib/store/features/postSlice/postSlice';


// Feed Page Component
export const FeedPage = () => {
    const dispatch = useAppDispatch();
    const [post, setPost] = React.useState("");
    const handlePost = () => {
        if (!post) return;
        dispatch(createPost({ content: post }));
        setPost("");
    };
    return (
        <div className="max-w-2xl mx-auto p-4">
            <Card className="mb-6">
                <CardContent className="p-4">
                    <Input value={post} onChange={e => setPost(e.target.value)} placeholder="Write a post..." />
                    <Button onClick={handlePost} className="mt-4">Post</Button>
                </CardContent>
            </Card>

            <PostList />
        </div>
    );
};
const PostList = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    useEffect(() => {
        dispatch(loadPosts())
    }, [])
    return <div className="space-y-4">
        {Object.values(posts).map((post) => (
            <Post key={post.id} post={post} />
        ))}
    </div>
}
