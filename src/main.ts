import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.setGlobalPrefix('api')
  app.disable('x-powered-by');
  const port = Number(process.env.PORT) || 3000

  const config = new DocumentBuilder()
    .setTitle('MOBILE STORE API')
    .setDescription('API для магазина приложений, написанный на Nest.js и TypeScript')
    .setVersion('0.0')
    .addTag('Приложения', 'Операции с приложениями')
    .addTag('Пользователи', 'Операции с пользователями')
    .addBasicAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  let protocol: string
  if (port === 80) { protocol = '(HTTP)' } else if (port === 443) { protocol = '(HTTPS)' } else { protocol = '(хуйня, а не порт)' }
  await app.listen(port, () => console.log(`Сервер стартанул на ${port} порту ${protocol}`));
}
bootstrap();
