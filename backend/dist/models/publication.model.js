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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publication = void 0;
const typeorm_1 = require("typeorm");
const mongodb_1 = require("mongodb");
let Publication = class Publication {
    addComment(comment) {
        if (this.comments === null || this.comments === undefined) {
            this.comments = [];
        }
        this.comments.push(comment);
        return this;
    }
    addLike(user) {
        if (this.likes === null || this.likes === undefined) {
            this.likes = [];
        }
        const userIds = this.likes.map(like => like.toString());
        const userId = user.toString();
        if (!userIds.includes(userId)) {
            this.likes.push(user);
        }
        return this;
    }
    dislike(user) {
        const size = this.likes.length;
        const userStr = user.toString();
        if (this.likes !== null && this.likes !== undefined && this.likes.map(like => like.toString()).includes(userStr)) {
            this.likes = this.likes.filter((like) => like.toString() !== userStr);
        }
        const newSize = this.likes.length;
        if (size === newSize) {
            throw new Error('User not found in the likes array. Previous size: <br>' + size + ', new size: ' + newSize + '.<br> User: ' + user + '.<br> Likes: ' + this.likes);
        }
        return this;
    }
};
exports.Publication = Publication;
__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", mongodb_1.ObjectId)
], Publication.prototype, "_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Publication.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", mongodb_1.ObjectId)
], Publication.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Publication.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Array)
], Publication.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Array)
], Publication.prototype, "likes", void 0);
exports.Publication = Publication = __decorate([
    (0, typeorm_1.Entity)()
], Publication);
//# sourceMappingURL=publication.model.js.map