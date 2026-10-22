import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { ProfileRepository } from './profile.repository';

// Слой бизнес-логики. Пока правила простые (например, если профиль не найден,
// возвращается 404), но новые правила следует добавлять сюда, а не в resolver.
@Injectable()
export class ProfileService {
  constructor(private readonly repository: ProfileRepository) {}

  async getProfile(): Promise<Profile> {
    const profile = await this.repository.findMainProfile();
    if (!profile) {
      throw new NotFoundException('Profile has not been seeded yet.');
    }
    return profile;
  }

  // Методы ниже вызываются резолверами полей, поэтому запрос к базе выполняется
  // только тогда, когда клиент запрашивает соответствующее поле.
  getLinks(profileId: string) {
    return this.repository.findLinks(profileId);
  }

  getSkills(profileId: string) {
    return this.repository.findSkills(profileId);
  }

  getExperience(profileId: string) {
    return this.repository.findExperience(profileId);
  }

  getProjects(profileId: string) {
    return this.repository.findProjects(profileId);
  }
}
