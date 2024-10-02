"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicationService = void 0;
const mongodb_1 = require("mongodb");
const main_1 = require("../main");
const publication_model_1 = require("../models/publication.model");
const user_service_1 = require("./user.service");
const comment_model_1 = require("../models/comment.model");
class PublicationService {
    async getPublications() {
        const PublicationRepo = main_1.mongoDataSource.getRepository(publication_model_1.Publication);
        let publications = await PublicationRepo.find();
        for (let publication of publications) {
            publication.authorName = await this.getAuthorName(publication.author);
            if (publication.likes === null || publication.likes === undefined) {
                publication.likes = [];
            }
            if (publication.comments === null || publication.comments === undefined) {
                publication.comments = [];
            }
            for (let comment of publication.comments) {
                comment.authorName = await this.getAuthorName(comment.author);
            }
        }
        return publications;
    }
    async addPublication(title, author, image) {
        const publicationRepo = main_1.mongoDataSource.getRepository(publication_model_1.Publication);
        let publication = new publication_model_1.Publication();
        publication.title = title;
        publication.author = author;
        publication.image = image;
        publication.authorName = await this.getAuthorName(author);
        return publicationRepo.save(publication);
    }
    async getAuthorName(authorId) {
        const userService = new user_service_1.UserService();
        return userService.getUserName(authorId);
    }
    async addComment(publicationId, userId, text) {
        const publicationObjectId = new mongodb_1.ObjectId(publicationId);
        const userObjectId = new mongodb_1.ObjectId(userId);
        if (!mongodb_1.ObjectId.isValid(userObjectId)) {
            throw new Error('Invalid userId format');
        }
        const publicationRepo = main_1.mongoDataSource.getRepository(publication_model_1.Publication);
        if (!publicationRepo) {
            throw new Error('Publication repository not found');
        }
        let publication = await publicationRepo.findOne({ where: { _id: publicationObjectId } });
        if (publication) {
            const comment = new comment_model_1.Comment();
            comment.author = userObjectId;
            comment.text = text;
            publication.addComment(comment);
            return publicationRepo.save(publication);
        }
        else {
            throw new Error('Publication not found ' + publicationObjectId.toString());
        }
    }
    async addLike(publicationId, userId) {
        const publicationObjectId = new mongodb_1.ObjectId(publicationId);
        if (!mongodb_1.ObjectId.isValid(publicationObjectId)) {
            throw new Error('Invalid publicationId format');
        }
        const userObjectId = new mongodb_1.ObjectId(userId);
        if (!mongodb_1.ObjectId.isValid(userObjectId)) {
            throw new Error('Invalid userId format');
        }
        const publicationRepo = main_1.mongoDataSource.getRepository(publication_model_1.Publication);
        if (!publicationRepo) {
            throw new Error('Publication repository not found');
        }
        let publication = await publicationRepo.findOne({ where: { _id: publicationObjectId } });
        if (publication) {
            publication = publication.addLike(userObjectId);
            publicationRepo.save(publication);
            return publication.likes.length;
        }
        else {
            throw new Error('Publication not found ' + publicationObjectId.toString());
        }
    }
    async dislike(publicationId, userId) {
        const publicationObjectId = new mongodb_1.ObjectId(publicationId);
        if (!mongodb_1.ObjectId.isValid(publicationObjectId)) {
            throw new Error('Invalid publicationId format');
        }
        const userObjectId = new mongodb_1.ObjectId(userId);
        if (!mongodb_1.ObjectId.isValid(userObjectId)) {
            throw new Error('Invalid userId format');
        }
        const publicationRepo = main_1.mongoDataSource.getRepository(publication_model_1.Publication);
        if (!publicationRepo) {
            throw new Error('Publication repository not found');
        }
        let publication = await publicationRepo.findOne({ where: { _id: publicationObjectId } });
        if (publication) {
            publication = publication.dislike(userObjectId);
            publicationRepo.save(publication);
            return publication.likes.length;
        }
        else {
            throw new Error('Publication not found ' + publicationObjectId.toString());
        }
    }
}
exports.PublicationService = PublicationService;
//# sourceMappingURL=publication.service.js.map