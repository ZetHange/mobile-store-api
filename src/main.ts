import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  const port = Number(process.env.PORT) || 3000

  const config = new DocumentBuilder()
    .setTitle('SWN STORE API')
    .setDescription('API для магазина приложений, написанный на Nest.js и TypeScript')
    .setVersion('0.0')
    .addTag('Приложения', 'Операции с приложениями')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  let protocol: string
  if (port === 80) { protocol = '(HTTP)' } else if (port === 443) { protocol = '(HTTPS)' }
  await app.listen(port, () => console.log(`Сервер стартанул на ${port} порту ${protocol}`));
}
bootstrap();
