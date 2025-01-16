import {
    Card,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/card";
import { Avatar, AvatarFallback, } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { IPost } from "@/lib/store/features/postSlice/postSlice";
import Image from "next/image";
// Post Component
interface PostProps {
    post: IPost;
}

export const Post: React.FC<PostProps> = ({ post }: { post: IPost }) => {
    return (
        <Card className="mb-4">
            <CardHeader className="flex flex-row items-center space-x-4 p-4">
                <Avatar>
                    <AvatarFallback>{post.user.username[0]}</AvatarFallback>
                </Avatar>
                <div className="">
                    <h3 className="font-semibold">{post.user.name}</h3>
                    <p className="text-sm text-gray-500">@{post.user.username}</p>
                </div>
                {/* <div className="font-semibold">{post.user.username}</div> */}
            </CardHeader>
            <CardContent className="p-4">
                <p>{post.content}</p>
                <img src="https://placehold.co/600x400" alt="" />
            </CardContent>
            <CardFooter className="flex justify-between p-4">
                <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    Like
                </Button>
                <Button variant="ghost" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Comment
                </Button>
                <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                </Button>
            </CardFooter>
        </Card>
    );
};
