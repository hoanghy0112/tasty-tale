import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/user/dto/user.dto';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe/create-recipe.dto';
import { RecipeEntity } from './entities/recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
  ) {}

  create(createRecipeDto: CreateRecipeDto & { user: UserDto }) {
    return this.recipeRepository.save(createRecipeDto);
  }

  findByid(id: string) {
    return this.recipeRepository.findOneBy({ id });
  }
}
