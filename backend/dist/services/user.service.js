"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const main_1 = require("../main");
const user_model_1 = require("../models/user.model");
class UserService {
    async getUsers() {
        const userRepo = main_1.mongoDataSource.getRepository(user_model_1.User);
        return userRepo.find();
    }
    async addUser(name, password) {
        const userRepo = main_1.mongoDataSource.getRepository(user_model_1.User);
        let user = new user_model_1.User();
        user.name = name;
        user.password = password;
        return userRepo.save(user);
    }
    async getUserName(userId) {
        const userRepo = main_1.mongoDataSource.getRepository(user_model_1.User);
        const user = await userRepo.findOneBy({ _id: userId });
        if (!user || !user.name) {
            return 'Unknown';
        }
        return user.name;
    }
    async editName(userId, username) {
        const userRepo = main_1.mongoDataSource.getRepository(user_model_1.User);
        const user = await userRepo.findOneBy({ _id: userId });
        console.log("test");
        if (!user || !user.name) {
            return false;
        }
        const result = await userRepo.update({ _id: userId }, { name: username });
        return user;
    }
    async deleteUser(userId) {
        const userRepo = main_1.mongoDataSource.getRepository(user_model_1.User);
        const result = await userRepo.delete({ _id: userId });
        return result.affected > 0;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map