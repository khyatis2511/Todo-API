import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`Nest App Started on ${process.env.PORT ?? 3088}`);
  console.log(`http://localhost:${process.env.PORT ?? 3088}/api/`);
  await app.listen(process.env.PORT ?? 3088);
}
bootstrap();
