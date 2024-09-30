import { ObjectId } from 'mongodb';
import { Publication } from 'src/models/publication.model';
export declare class PublicationService {
    getPublications(): Promise<Publication[]>;
    addPublication(title: string, author: ObjectId, image: string): Promise<Publication>;
    getAuthorName(authorId: ObjectId): Promise<string>;
    addComment(publicationId: string, userId: string, text: string): Promise<Publication>;
    addLike(publicationId: string, userId: string): Promise<Number>;
    dislike(publicationId: ObjectId, userId: ObjectId): Promise<Number>;
}
