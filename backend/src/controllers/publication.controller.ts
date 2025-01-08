import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Patch,
  HttpCode,
  Delete,
  Param,
  Req,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { Publication } from 'src/models/publication.model'
import { LoginService } from 'src/services/login.service';
import { PublicationService } from 'src/services/publication.service'

@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService, private readonly loginService: LoginService) { }

  @Get()
  findAll(): Promise<Publication[]> {
    return this.publicationService.getPublications();
  }

  @Post('add')
  @HttpCode(201)
  async add(@Body() body, @Req() request: Request): Promise<Publication> {
    const decoded = this.loginService.verifyJWT(request);
    if (decoded === null)
    {
      throw new HttpException("Not Authentified", HttpStatus.UNAUTHORIZED)
    }
    return this.publicationService.addPublication(body.title, decoded.id, body.image, body.base64, body.content)
  }

  @Patch('editTitle')
  async editTitle(@Body() body, @Req() request: Request)
  {
    const decoded = this.loginService.verifyJWT(request);
    if (decoded === null)
    {
      throw new HttpException("Not Authentified", HttpStatus.UNAUTHORIZED)
    }
    return this.publicationService.editTitle(body.id, body.title)
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string, @Req() request: Request) : Promise<boolean>
  {
    const decoded = this.loginService.verifyJWT(request);
    if (decoded === null)
    {
      throw new HttpException("Not Authentified", HttpStatus.UNAUTHORIZED)
    }
    const publicationId = new ObjectId(id);
    return this.publicationService.deletePublication(publicationId);
  }

  @Put('comment')
  async addComment(@Body() body, @Req() request: Request): Promise<Publication> {
    const decoded = this.loginService.verifyJWT(request);
    if (decoded === null)
    {
      throw new HttpException("Not Authentified", HttpStatus.UNAUTHORIZED)
    }
    try {
      // !!! Can't modify after last release.
      // Replacing 'decoded.id.id.toString()' for 'decoded.id.toString()' fixes the undefined bug.
      return this.publicationService.addComment(body.publicationId, decoded.id.id.toString(), body.text)
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
  async addLike(@Body() body, @Req() request: Request): Promise<object> {
    const decoded = this.loginService.verifyJWT(request);
    if (decoded === null)
    {
      throw new HttpException("Not Authentified", HttpStatus.UNAUTHORIZED)
    }

    // !!! Can't modify after last release.
    // Replacing 'decoded.id.id.toString()' for 'decoded.id.toString()' fixes the undefined bug.
    const likes = await this.publicationService.addLike(body.publicationId, decoded.id.id.toString())
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
  async dislike(@Body() body, @Req() request: Request): Promise<object> {
    const decoded = this.loginService.verifyJWT(request);
    if (decoded === null)
    {
      throw new HttpException("Not Authentified", HttpStatus.UNAUTHORIZED)
    }
    const likes = await this.publicationService.dislike(body.publicationId, decoded.id)
    return { "publicationId": body.publicationId, "likes": likes }
  }
}
