import { ObjectId, MongoClient } from 'mongodb'
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

  async getUser(username: string) : Promise<User> | null {
    const userRepo = mongoDataSource.getRepository(User);
    const user = await userRepo.findOneBy({name: username});

    return user;
  }

  // get name of user by id
  async getUserName(userId: ObjectId): Promise<string> {
    const userRepo = mongoDataSource.getRepository(User);
    const user = await userRepo.findOneBy({_id: userId})
    if (!user || !user.name)
      {
        return 'Deleted User'
      }
      return user.name
  }

  async editName(userId: ObjectId, username: string) : Promise<boolean | User> {
    const userRepo = mongoDataSource.getRepository(User);
    const user = await userRepo.findOneBy({_id: userId})
    if (!user || !user.name)
    {
      return false;
    }

    await userRepo.update({_id: userId}, {name: username});
    return user;
  }

  async deleteUser(userId: ObjectId) : Promise<boolean>
  {
    const userRepo = mongoDataSource.getRepository(User);
    const result = await userRepo.delete({_id: userId})
    return result.affected > 0;
  }
}
