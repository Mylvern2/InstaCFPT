import { Module } from '@nestjs/common'
import { UserController } from './controllers/user.controller'
import { PublicationController } from './controllers/publication.controller'
import { CommentController } from './controllers/comment.controller'
import { UserService } from './services/user.service'
import { PublicationService } from './services/publication.service'
import { CommentService } from './services/comment.service'

@Module({
  imports: [],
  controllers: [UserController, PublicationController, CommentController],
  providers: [UserService, PublicationService, CommentService],
})
export class AppModule {}
