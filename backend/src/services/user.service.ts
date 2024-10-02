import { ObjectId } from 'mongodb'
import { mongoDataSource } from 'src/main'
import { User } from 'src/models/user.model'

export class UserService {
  async getUsers(): Promise<User[]> {
    // const userRepo = mongoDataSource.getRepository(User)
    const userRepo = mongoDataSource.getRepository(User)
    return userRepo.find()
  }

  async addUser(name: string, password: string): Promise<User> {
    const userRepo = mongoDataSource.getRepository(User)
    let user = new User()
    user.name = name
    user.password = password;
    return userRepo.save(user)
  }

  // get name of user by id
  async getUserName(userId: ObjectId): Promise<string> {
    const userRepo = mongoDataSource.getRepository(User)
    const user = await userRepo.findOne({ where: { _id: userId } })
    if (!user || !user.name) {
      console.log(user, userId);
      return 'Unknown'
    }
    return user.name
  }
}
