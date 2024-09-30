import { Publication } from 'src/models/publication.model';
import { PublicationService } from 'src/services/publication.service';
export declare class PublicationController {
    private readonly publicationService;
    constructor(publicationService: PublicationService);
    findAll(): Promise<Publication[]>;
    add(body: any): Promise<Publication>;
    addComment(body: any): Promise<Publication>;
    addLike(body: any): Promise<object>;
    dislike(body: any): Promise<object>;
}
