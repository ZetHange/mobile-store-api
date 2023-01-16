import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.disable('x-powered-by');
  app.enableCors();
  const port = Number(process.env.PORT) || 3000;

  const config = new DocumentBuilder()
    .setTitle('MOBILE STORE API')
    .setDescription(
      'Сервисы REST-API для магазина приложений, написанные на Nest.js и TypeScript',
    )
    .setExternalDoc('Store Studio', '/studio')
    .setVersion('0.1')
    .addTag('Приложения', 'Операции с приложениями')
    .addTag('Теги', 'Операции с тегами')
    .addTag('Пользователи', 'Операции с пользователями')
    .addTag('Роли', 'Операции с ролями')
    .addTag('Аутентификация', 'Вход и выход')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  let protocol: string;
  if (port === 80) {
    protocol = '(HTTP)';
  } else if (port === 443) {
    protocol = '(HTTPS)';
  } else {
    protocol = '(хуйня, а не порт)';
  }
  await app.listen(port, () =>
    console.log(`Сервер стартанул на ${port} порту ${protocol}`),
  );
}
bootstrap();
