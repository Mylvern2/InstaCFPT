import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    essai: number;
    findAll(): Promise<User[]>;
    add(body: any): Promise<User>;
}
