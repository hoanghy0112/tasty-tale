import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeService } from 'src/recipe/recipe.service';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewEntity } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly recipeService: RecipeService,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const recipe = await this.recipeService.findById(createReviewDto.recipeId);
    return this.reviewRepository.save({ ...createReviewDto, recipe });
  }

  findOne(id: string) {
    return this.reviewRepository.findOne({
      where: { id },
      relations: { recipe: true, images: true, user: true },
    });
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const recipe = await this.recipeService.findById(updateReviewDto.recipeId);
    const review = await this.reviewRepository.findOneBy({ id });
    Object.assign(review, updateReviewDto);
    return this.reviewRepository.save({ ...review, recipe });
  }

  remove(id: string) {
    return this.reviewRepository.softDelete({ id });
  }
}
