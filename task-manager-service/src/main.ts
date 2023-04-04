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
      .addBearerAuth(
          {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header',
          },
          'jwt', // This name here is important for matching up with @ApiBearerAuth() in your controller!
      )
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(cors());
  await app.listen(8081);
})();