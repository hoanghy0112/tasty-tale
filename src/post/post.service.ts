import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeService } from 'src/recipe/recipe.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly recipeService: RecipeService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const recipes = await this.recipeService.findByIds(createPostDto.recipes);
    return this.postRepository.save({ ...createPostDto, recipes });
  }

  findOne(id: string) {
    return this.postRepository.findOne({
      where: { id },
      relations: { recipes: true },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const recipes = await this.recipeService.findByIds(updatePostDto.recipes);
    const post = await this.postRepository.findOneBy({ id });
    Object.assign(post, updatePostDto);
    return this.postRepository.save({ ...post, recipes });
  }

  remove(id: string) {
    return this.postRepository.softDelete({ id });
  }
}
