import { Entity, ObjectIdColumn, Column } from 'typeorm'
import { ObjectId } from 'mongodb'

@Entity()
export class Comment {
  @ObjectIdColumn()
  _id: ObjectId
  @ObjectIdColumn()
  author: ObjectId;
  @Column()
  text: string
  @Column()
  authorName: string
}
