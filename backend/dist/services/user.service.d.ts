import { ObjectId } from 'mongodb';
import { User } from 'src/models/user.model';
export declare class UserService {
    getUsers(): Promise<User[]>;
    addUser(name: string, password: string): Promise<User>;
    getUser(username: string): Promise<User> | null;
    getUserName(userId: ObjectId): Promise<string>;
    editName(userId: ObjectId, username: string): Promise<boolean | User>;
    deleteUser(userId: ObjectId): Promise<boolean>;
}
