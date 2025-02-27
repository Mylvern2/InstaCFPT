import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DataSource } from 'typeorm'
import { User } from './models/user.model'
import { Publication } from './models/publication.model'
import { Comment } from './models/comment.model'
import { urlencoded, json } from 'express';
import { join } from 'path';

import { NestExpressApplication } from '@nestjs/platform-express';
export const mongoDataSource = new DataSource({
  type: 'mongodb',
  host: 'mongo',
  port: 27017,
  username: 'user',
  password: 'user',
  database: 'testdb',
  synchronize: true,
  entities: [User, Publication, Comment]
})

mongoDataSource
  .initialize()
  .then(() => {
    console.log(mongoDataSource.isInitialized)
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(urlencoded({extended:true, limit:'20mb'}))
  app.use(json({limit:'20mb'}))
  app.enableCors({
    // Configuration CORS pour le serveur de développement
    // Ou spécifiez les origines que vous voulez autoriser, '*' pour toutes
    origin: '*',
    // origin: 'http://localhost:8080', // port nginx
    // origin: 'https://localhost:7197', // port blazor
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true, // Important si vous envoyez des requêtes avec des credentials comme des cookies
  });
  app.useStaticAssets(join(__dirname, '..', 'images'));
  console.log("Cors enabled")
  await app.listen(3000);
}

bootstrap()
