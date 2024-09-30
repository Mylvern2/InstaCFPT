import { ObjectId } from 'mongodb';
export declare class User {
    _id: ObjectId;
    name: string;
    password: string;
    followers: ObjectId[];
    followings: ObjectId[];
}
