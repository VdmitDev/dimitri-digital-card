import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Profile } from '@prisma/client';
import { ProfileService } from './profile.service';
import {
  ExperienceObject,
  ProfileLinkObject,
  ProfileObject,
  ProjectObject,
  SkillObject,
} from './profile.types';

// Только слой GraphQL: он связывает запросы и поля с вызовами сервиса,
// не содержит бизнес-логики и не обращается к Prisma напрямую.
@Resolver(() => ProfileObject)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfileObject, { description: 'Returns the public digital business card.' })
  profile(): Promise<Profile> {
    return this.profileService.getProfile();
  }

  // Связанные данные разрешаются через @ResolveField, а не загружаются одним большим `include`.
  // GraphQL вызывает резолвер поля только тогда, когда клиент запрашивает это поле.
  // Поэтому `{ profile { name } }` выполняет один запрос, а запрос навыков добавляет ещё один.
  // Один общий `include` всегда загружал бы все пять таблиц. Сейчас API возвращает один профиль,
  // поэтому проблемы N+1 нет. Если API начнёт возвращать список профилей, понадобится DataLoader.
  @ResolveField(() => [ProfileLinkObject])
  links(@Parent() profile: Profile) {
    return this.profileService.getLinks(profile.id);
  }

  @ResolveField(() => [SkillObject])
  skills(@Parent() profile: Profile) {
    return this.profileService.getSkills(profile.id);
  }

  @ResolveField(() => [ExperienceObject])
  experience(@Parent() profile: Profile) {
    return this.profileService.getExperience(profile.id);
  }

  @ResolveField(() => [ProjectObject])
  projects(@Parent() profile: Profile) {
    return this.profileService.getProjects(profile.id);
  }
}
