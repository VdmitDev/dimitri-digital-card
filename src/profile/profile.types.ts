import { Field, ObjectType } from '@nestjs/graphql';

// Типы схемы GraphQL (подход code-first). Внутренние поля, такие как id,
// sortOrder и временные метки, намеренно не показываются клиентам API.

@ObjectType()
export class ProfileLinkObject {
  @Field() label!: string;
  @Field() url!: string;
}

@ObjectType()
export class SkillObject {
  @Field() name!: string;
  @Field() category!: string;
}

@ObjectType()
export class ExperienceObject {
  @Field() company!: string;
  @Field() position!: string;
  @Field() location!: string;
  @Field() startDate!: string;
  @Field() endDate!: string;
  @Field(() => [String]) achievements!: string[];
}

@ObjectType()
export class ProjectObject {
  @Field() name!: string;
  @Field() description!: string;
  @Field() url!: string;
  @Field(() => [String]) technologies!: string[];
}

// Здесь объявлены только обычные поля профиля. links, skills, experience и projects
// добавляются в ProfileResolver через @ResolveField, чтобы загружаться по запросу.
@ObjectType()
export class ProfileObject {
  @Field() name!: string;
  @Field() headline!: string;
  @Field() description!: string;
  @Field() email!: string;
}
