import { Entity, ObjectIdColumn, Column } from 'typeorm'
import { ObjectId } from 'mongodb'
import { User } from './user.model'
import { Comment } from './comment.model'

@Entity()
export class Publication {

  @ObjectIdColumn()
  _id: ObjectId
  @Column()
  title: string
  @Column()
  author: ObjectId
  @Column()
  image: string
  @Column()
  comments: Comment[]
  @Column()
  likes: ObjectId[]
  likesCount: number
  authorName: string

  /**
   * Add a comment to the comments array
   * @param comment Comment to add to the comments array 
   * @returns the publication instance 
   */
  addComment(comment): Publication {
    if (this.comments === null || this.comments === undefined) {
      this.comments = [];
    }
    this.comments.push(comment);
    return this; // return this instance of the Publication
  }

  /**
   * Add a user to the likes array 
   *  if field "likes" is not null or undefined and the user is not already in the likes array. 
   *    ==> If the user is already in the likes array, do not add it again
   *  Else, creates the field "likes" and adds the user to the likes array.
   * @param user ObjectId of the user to add to the likes array
   * @returns size of the likes array after adding the user
   */
  addLike(user: ObjectId): Publication {
    if (this.likes === null || this.likes === undefined) {
      this.likes = [];
    }
    // Convertit tous les ObjectId en string pour la comparaison
    const userIds = this.likes.map(like => like.toString());
    const userId = user.toString();

    if (!userIds.includes(userId)) {
      this.likes.push(user);
    }
    return this; // return this instance of the Publication
  }

  /**
   * Remove a user to the likes array 
   *  Remove user from array field "likes" is not null or undefined and the user is in the likes array. 
   * @param user ObjectId of the user to remove to the likes array
   * @returns the publication instance
   * 
   */
  dislike(user: ObjectId): Publication {
    const size = this.likes.length;
    // Convert user ObjectId to string for comparison
    const userStr = user.toString();
    // remove user from the likes array if the user is in the likes array
    if (this.likes !== null && this.likes !== undefined && this.likes.map(like => like.toString()).includes(userStr)) {
      //remove user from the likes array
      this.likes = this.likes.filter((like) => like.toString() !== userStr);
    }
    const newSize = this.likes.length;
    if (size === newSize) {
      throw new Error('User not found in the likes array. Previous size: <br>' + size + ', new size: ' + newSize + '.<br> User: ' + user + '.<br> Likes: ' + this.likes);
    }
    return this; // return this instance of the Publication
  }

}
