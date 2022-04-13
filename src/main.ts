import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const port = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);
    await app.listen(port, () => console.log(`Server runs on port ${port}`));
  } catch (e) {
    console.log(e);
  }
}
bootstrap();
