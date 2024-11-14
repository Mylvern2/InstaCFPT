"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const main_1 = require("src/main");
const comment_model_1 = require("src/models/comment.model");
class CommentService {
    async getComments() {
        const CommentRepo = main_1.mongoDataSource.getRepository(comment_model_1.Comment);
        return CommentRepo.find();
    }
    async addComment(text, author) {
        const CommentRepo = main_1.mongoDataSource.getRepository(comment_model_1.Comment);
        let comment = new comment_model_1.Comment();
        comment.text = text;
        comment.author = author;
        return CommentRepo.save(comment);
    }
}
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map