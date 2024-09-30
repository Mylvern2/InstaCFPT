import { ObjectId } from 'mongodb'
import { mongoDataSource } from 'src/main'
import { Comment } from 'src/models/comment.model'

export class CommentService {
  async getComments(): Promise<Comment[]> {
    const CommentRepo = mongoDataSource.getRepository(Comment)
    return CommentRepo.find()
  }

  async addComment(text:string, author: ObjectId): Promise<Comment> {
    const CommentRepo = mongoDataSource.getRepository(Comment)
    let comment = new Comment()
    comment.text = text
    comment.author = author
    return CommentRepo.save(comment)
  }
}

