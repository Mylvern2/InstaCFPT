import { ObjectId } from 'mongodb';
import { Comment } from 'src/models/comment.model';
export declare class CommentService {
    getComments(): Promise<Comment[]>;
    addComment(text: string, author: ObjectId): Promise<Comment>;
}
