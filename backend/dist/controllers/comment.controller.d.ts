import { Comment } from 'src/models/comment.model';
import { CommentService } from 'src/services/comment.service';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    findAll(): Promise<Comment[]>;
    add(body: any): Promise<Comment>;
}
