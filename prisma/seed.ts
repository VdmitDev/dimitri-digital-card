import { PrismaClient } from '@prisma/client';
import { experience, links, profileData, projects, skillsByCategory } from './seed-data';

const prisma = new PrismaClient();

// Преобразует объект { категория: [названия] } в плоский массив записей таблицы Skill.
function flattenSkills(): { name: string; category: string }[] {
  return Object.entries(skillsByCategory).flatMap(([category, names]) =>
    names.map((name) => ({ name, category })),
  );
}

async function main(): Promise<void> {
  // Все операции выполняются в одной транзакции: если что-то завершится ошибкой,
  // база останется в прежнем состоянии, а контейнер остановится, вместо того чтобы
  // запуститься с частично заполненным профилем.
  await prisma.$transaction(async (tx) => {
    // Профиль ищется по уникальному email, поэтому повторный запуск seed-скрипта
    // обновляет существующую запись, а не создаёт второй профиль.
    const profile = await tx.profile.upsert({
      where: { email: profileData.email },
      update: profileData,
      create: profileData,
    });

    // Для связанных таблиц мы заменяем набор записей целиком, а не выполняем
    // upsert для каждой строки. Seed-файлы служат единственным источником данных:
    // старые записи удаляются, текущие добавляются, поэтому удалённые элементы
    // (например, прежние навыки) действительно исчезают, а повторный запуск
    // приводит базу к тому же состоянию.
    await tx.profileLink.deleteMany({ where: { profileId: profile.id } });
    await tx.profileLink.createMany({
      data: links.map((link) => ({ ...link, profileId: profile.id })),
    });

    await tx.skill.deleteMany({ where: { profileId: profile.id } });
    await tx.skill.createMany({
      data: flattenSkills().map((skill) => ({ ...skill, profileId: profile.id })),
    });

    await tx.experience.deleteMany({ where: { profileId: profile.id } });
    await tx.experience.createMany({
      data: experience.map((job) => ({ ...job, profileId: profile.id })),
    });

    await tx.project.deleteMany({ where: { profileId: profile.id } });
    await tx.project.createMany({
      data: projects.map((project) => ({ ...project, profileId: profile.id })),
    });
  });
}

main()
  .catch((error: unknown) => {
    console.error('Seeding failed:', error);
    // process.exitCode вместо process.exit позволяет сначала выполнить отключение в блоке finally.
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
