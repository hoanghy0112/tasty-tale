import { PartialType } from '@nestjs/mapped-types';
import { CreateIngredientDto } from '../create-recipe/create-ingredient.dto';

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {}
