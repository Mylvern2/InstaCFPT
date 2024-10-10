import { ObjectId } from 'mongodb';
import { Publication } from 'src/models/publication.model';
export declare class PublicationService {
    getPublications(): Promise<Publication[]>;
    addPublication(title: string, author: ObjectId, image: string, content: string, path: string): Promise<Publication>;
    editTitle(publicationId: ObjectId, title: string): Promise<boolean | Publication>;
    deletePublication(publicationId: ObjectId): Promise<boolean>;
    getAuthorName(authorId: ObjectId): Promise<string>;
    addComment(publicationId: string, userId: string, text: string): Promise<Publication>;
    addLike(publicationId: string, userId: string): Promise<Number>;
    dislike(publicationId: ObjectId, userId: ObjectId): Promise<Number>;
}
