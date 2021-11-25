import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import "reflect-metadata";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Grocy.API')
    .setDescription('Diseño y patrones de software')
    .setVersion('v1')
    .addTag('Orders')
    .addTag('Products')
    .addTag('Suppliers')
    .addTag('Shopping Carts')
    .addTag('Customers')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });

  await app.listen(8080);
}
bootstrap();
