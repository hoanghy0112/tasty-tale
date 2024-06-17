import { Injectable } from '@nestjs/common';
import { CreateCookbookDto } from './dto/create-cookbook.dto';
import { UpdateCookbookDto } from './dto/update-cookbook.dto';
import { Repository } from 'typeorm';
import { RecipeService } from 'src/recipe/recipe.service';
import { CookbookEntity } from './entities/cookbook.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CookbookService {
  constructor(
    @InjectRepository(CookbookEntity)
    private readonly cookbookRepository: Repository<CookbookEntity>,
    private readonly recipeService: RecipeService,
  ) {}

  async create(createCookbookDto: CreateCookbookDto) {
    const recipes = await this.recipeService.findByIds(
      createCookbookDto.recipes,
    );
    return this.cookbookRepository.save({ ...createCookbookDto, recipes });
  }

  findRandom(quantity: number = 3) {
    return this.cookbookRepository
      .createQueryBuilder('cookbook')
      .leftJoinAndSelect('cookbook.recipes', 'recipe')
      .leftJoinAndSelect('recipe.images', 'image')
      .orderBy('RANDOM()')
      .limit(quantity)
      .getMany();
  }

  findOne(id: string) {
    return this.cookbookRepository.findOne({
      where: { id },
      relations: { recipes: true, author: true },
    });
  }

  async update(id: string, updateCookbookDto: UpdateCookbookDto) {
    const recipes = await this.recipeService.findByIds(
      updateCookbookDto.recipes,
    );
    const cookbook = await this.cookbookRepository.findOneBy({ id });
    Object.assign(cookbook, updateCookbookDto);
    return this.cookbookRepository.save({ ...cookbook, recipes });
  }

  remove(id: string) {
    return this.cookbookRepository.softDelete({ id });
  }
}
