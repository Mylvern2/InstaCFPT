import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Patch
} from '@nestjs/common';
import { Publication } from 'src/models/publication.model'
import { PublicationService } from 'src/services/publication.service'

@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) { }

  @Get()
  findAll(): Promise<Publication[]> {
    return this.publicationService.getPublications();
  }

  @Post('add')
  async add(@Body() body): Promise<Publication> {
    return this.publicationService.addPublication(body.publication.title, body.publication.author, body.publication.image)
  }

  @Put('comment')
  async addComment(@Body() body): Promise<Publication> {
    try {
      return this.publicationService.addComment(body.publicationId, body.userId, body.text)
    } catch (error) {
      console.error('Error adding comment', error)
      throw error
    }
  }

  /**
   * Patch addLike method :
   * envoi publicationService.addLike(body.publicationId, body.userId) 
   * et retourne un objet json contenant {"publicationId": publicationId, "likes": nombre de likes retourné par la methode addLike
   * @param body 
   * @returns  
   */
  @Patch('like')
  async addLike(@Body() body): Promise<object> {
    const likes = await this.publicationService.addLike(body.publicationId, body.userId)
    return { "publicationId": body.publicationId, "likes": likes }
  }

  /**
   * Patch dislike method :
   * envoi publicationService.addLike(body.publicationId, body.userId) 
   * et retourne un objet json contenant {"publicationId": publicationId, "likes": nombre de likes retourné par la methode addLike
   * @param body 
   * @returns  
   */
  @Patch('dislike')
  async dislike(@Body() body): Promise<object> {
    const likes = await this.publicationService.dislike(body.publicationId, body.userId)
    return { "publicationId": body.publicationId, "likes": likes }
  }
}
