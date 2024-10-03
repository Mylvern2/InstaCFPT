"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicationController = void 0;
const common_1 = require("@nestjs/common");
const publication_service_1 = require("../services/publication.service");
let PublicationController = class PublicationController {
    constructor(publicationService) {
        this.publicationService = publicationService;
    }
    findAll() {
        return this.publicationService.getPublications();
    }
    async add(body) {
        return this.publicationService.addPublication(body.title, body.author, body.image);
    }
    async addComment(body) {
        try {
            return this.publicationService.addComment(body.publicationId, body.userId, body.text);
        }
        catch (error) {
            console.error('Error adding comment', error);
            throw error;
        }
    }
    async addLike(body) {
        const likes = await this.publicationService.addLike(body.publicationId, body.userId);
        return { "publicationId": body.publicationId, "likes": likes };
    }
    async dislike(body) {
        const likes = await this.publicationService.dislike(body.publicationId, body.userId);
        return { "publicationId": body.publicationId, "likes": likes };
    }
};
exports.PublicationController = PublicationController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublicationController.prototype, "add", null);
__decorate([
    (0, common_1.Put)('comment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublicationController.prototype, "addComment", null);
__decorate([
    (0, common_1.Patch)('like'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublicationController.prototype, "addLike", null);
__decorate([
    (0, common_1.Patch)('dislike'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublicationController.prototype, "dislike", null);
exports.PublicationController = PublicationController = __decorate([
    (0, common_1.Controller)('publications'),
    __metadata("design:paramtypes", [publication_service_1.PublicationService])
], PublicationController);
//# sourceMappingURL=publication.controller.js.map