import { ObjectId } from 'mongodb';
export declare class ImagePub {
    _id: ObjectId;
    path: string;
    publication: ObjectId[];
}
