import { type BaseEntity } from '../entities/base.entity';

export class BaseDto {
  id!: string;

  createdAt!: Date;

  updatedAt!: Date;

  translations?: AbstractTranslationDto[];

  constructor(entity: BaseEntity, options?: { excludeFields?: boolean }) {
    if (!options?.excludeFields) {
      this.id = entity.id;
      this.createdAt = entity.createdAt;
      this.updatedAt = entity.updatedAt;
    }
  }
}

export class AbstractTranslationDto extends BaseDto {
  constructor(entity: BaseEntity) {
    super(entity, { excludeFields: true });
  }
}
