import { Entity, ObjectIdColumn, Column } from 'typeorm'
import { ObjectId } from 'mongodb'

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId
  @Column()
  name: string
  @Column()
  password: string
  @Column()
  followers: ObjectId[]
  @Column()
  followings: ObjectId[]
}
