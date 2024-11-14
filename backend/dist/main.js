"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDataSource = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const typeorm_1 = require("typeorm");
const user_model_1 = require("./models/user.model");
const publication_model_1 = require("./models/publication.model");
const comment_model_1 = require("./models/comment.model");
const express_1 = require("express");
const path_1 = require("path");
exports.mongoDataSource = new typeorm_1.DataSource({
    type: 'mongodb',
    host: 'mongo',
    port: 27017,
    username: 'user',
    password: 'user',
    database: 'testdb',
    synchronize: true,
    entities: [user_model_1.User, publication_model_1.Publication, comment_model_1.Comment]
});
exports.mongoDataSource
    .initialize()
    .then(() => {
    console.log(exports.mongoDataSource.isInitialized);
    console.log('Data Source has been initialized!');
})
    .catch((err) => {
    console.error('Error during Data Source initialization', err);
});
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, express_1.urlencoded)({ extended: true, limit: '20mb' }));
    app.use((0, express_1.json)({ limit: '20mb' }));
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type, Accept',
        credentials: true,
    });
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'images'));
    console.log("Cors enabled");
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map