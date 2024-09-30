"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./controllers/user.controller");
const publication_controller_1 = require("./controllers/publication.controller");
const comment_controller_1 = require("./controllers/comment.controller");
const user_service_1 = require("./services/user.service");
const publication_service_1 = require("./services/publication.service");
const comment_service_1 = require("./services/comment.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [user_controller_1.UserController, publication_controller_1.PublicationController, comment_controller_1.CommentController],
        providers: [user_service_1.UserService, publication_service_1.PublicationService, comment_service_1.CommentService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map