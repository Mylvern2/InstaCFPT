import { ObjectId } from 'mongodb';
export declare class Comment {
    _id: ObjectId;
    author: ObjectId;
    text: string;
    authorName: string;
}
