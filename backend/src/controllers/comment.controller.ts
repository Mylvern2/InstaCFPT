import { Body, Controller, Get, Post } from '@nestjs/common'
import { Comment } from 'src/models/comment.model'
import { CommentService } from 'src/services/comment.service'

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async findAll(): Promise<Comment[]> {
    return this.commentService.getComments()
  }

  @Post('add')
  async add(@Body() body): Promise<Comment> {
    return this.commentService.addComment(body.Comment.text, body.Comment.author)
  }
}
