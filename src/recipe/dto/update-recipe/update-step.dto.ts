import { PartialType } from '@nestjs/mapped-types';
import { CreateStepDto } from '../create-recipe/create-step.dto';

export class UpdateStepDto extends PartialType(CreateStepDto) {}
