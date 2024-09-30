import { ObjectId } from 'mongodb';
import { User } from 'src/models/user.model';
export declare class UserService {
    getUsers(): Promise<User[]>;
    addUser(name: string): Promise<User>;
    getUserName(userId: ObjectId): Promise<string>;
}
