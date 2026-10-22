import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ProfileModule } from './profile/profile.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ProfileModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // `true` означает, что схема создаётся в памяти. Контейнеру не нужно
      // записывать файл schema.gql в папку исходного кода во время работы.
      autoSchemaFile: true,
      sortSchema: true,
      // Прежний GraphQL Playground устарел; вместо него используется Apollo Sandbox.
      playground: false,
      // Интроспекцию нужно оставить включённой, иначе Sandbox не сможет показать схему.
      // Для этого проекта это допустимо, поскольку данные изначально публичные.
      introspection: true,
      // `embed: true` отображает Apollo Sandbox по адресу /graphql при открытии в браузере.
      // Параметр указан явно, потому что при NODE_ENV=production иначе могла бы
      // использоваться стартовая страница без Sandbox.
      plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    }),
  ],
})
export class AppModule {}
