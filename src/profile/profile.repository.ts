import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// Слой доступа к данным: единственное место в модуле профиля, где содержатся
// Prisma-запросы. Сервису не нужно знать, как именно хранятся данные. Правила
// сортировки определены здесь, поэтому порядок результатов стабилен и предсказуем.
@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  // API обслуживает одну цифровую визитку, поэтому профиль выбирается как самая
  // ранняя запись. Email не требуется жёстко прописывать в коде приложения.
  findMainProfile() {
    return this.prisma.profile.findFirst({ orderBy: { createdAt: 'asc' } });
  }

  findLinks(profileId: string) {
    return this.prisma.profileLink.findMany({
      where: { profileId },
      orderBy: { label: 'asc' },
    });
  }

  findSkills(profileId: string) {
    return this.prisma.skill.findMany({
      where: { profileId },
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    });
  }

  findExperience(profileId: string) {
    return this.prisma.experience.findMany({
      where: { profileId },
      orderBy: { sortOrder: 'asc' },
    });
  }

  findProjects(profileId: string) {
    return this.prisma.project.findMany({
      where: { profileId },
      orderBy: { sortOrder: 'asc' },
    });
  }
}
