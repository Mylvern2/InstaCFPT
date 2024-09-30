import { ObjectId } from 'mongodb';
import { Comment } from './comment.model';
export declare class Publication {
    _id: ObjectId;
    title: string;
    author: ObjectId;
    image: string;
    comments: Comment[];
    likes: ObjectId[];
    likesCount: number;
    authorName: string;
    addComment(comment: any): Publication;
    addLike(user: ObjectId): Publication;
    dislike(user: ObjectId): Publication;
}
