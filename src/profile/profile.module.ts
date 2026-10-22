import { Module } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';

// Resolver (GraphQL) -> Service (бизнес-логика) -> Repository (база данных).
@Module({
  providers: [ProfileResolver, ProfileService, ProfileRepository],
})
export class ProfileModule {}
