import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

(async () => {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('Task Manager')
      .setDescription('The Task Manager API description')
      .setVersion('1.0')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(cors());
  await app.listen(8081);
})();