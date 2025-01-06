import {
    Card,
    CardContent,
    CardHeader,
    CardFooter
} from "@/components/ui/card";
import { Avatar, AvatarFallback, } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from 'lucide-react';

// Post Component
interface PostProps {
    username: string;
    content: string;
}

export const Post: React.FC<PostProps> = ({ username, content }) => {
    return (
        <Card className="mb-4">
            <CardHeader className="flex flex-row items-center space-x-4 p-4">
                <Avatar>
                    <AvatarFallback>{username[0]}</AvatarFallback>
                </Avatar>
                <div className="font-semibold">{username}</div>
            </CardHeader>
            <CardContent className="p-4">
                <p>{content}</p>
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
