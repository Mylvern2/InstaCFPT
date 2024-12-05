import { Body, Controller, Get, HttpException, HttpStatus, Post, Req } from '@nestjs/common'
import { Comment } from 'src/models/comment.model'
import { CommentService } from 'src/services/comment.service'
import { LoginService } from 'src/services/login.service'

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService, private readonly loginService: LoginService) {}

  @Get()
  async findAll(): Promise<Comment[]> {
    return this.commentService.getComments()
  }

  @Post('add')
  async add(@Body() body, @Req() request: Request): Promise<Comment> {
    const decoded = this.loginService.verifyJWT(request);
    if (decoded === null)
    {
      throw new HttpException("Not Authentified", HttpStatus.UNAUTHORIZED)
    }
    return this.commentService.addComment(body.Comment.text, decoded.id);
  }
}
