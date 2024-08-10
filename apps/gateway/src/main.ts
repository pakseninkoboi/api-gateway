import { NestFactory } from '@nestjs/core';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configure CORS options
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, AccessToken, RefreshToken', // Add AccessToken to allowed headers
  };

  // Enable CORS with the specified options
  app.enableCors(corsOptions);
  await app.listen(4003, '0.0.0.0'); // Update port to 3000
}
bootstrap();
