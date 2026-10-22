import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  // Позволяет Nest вызвать onModuleDestroy (закрыть соединение Prisma), когда
  // Docker отправляет SIGTERM при выполнении `docker compose down`.
  app.enableShutdownHooks();

  const port = Number(process.env.PORT ?? 3000);
  // В Docker необходимо слушать 0.0.0.0, иначе проброс портов не сможет
  // достучаться до приложения.
  await app.listen(port, '0.0.0.0');
  new Logger('Bootstrap').log(`Digital card GraphQL API listening on port ${port}`);
}

void bootstrap();
