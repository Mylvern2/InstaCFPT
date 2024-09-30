import { Entity, ObjectIdColumn, Column } from 'typeorm'
import { ObjectId } from 'mongodb'

@Entity()
export class ImagePub {
  @ObjectIdColumn()
  _id: ObjectId
  @Column()
  path: string
  @Column()
  publication : ObjectId[]
}
