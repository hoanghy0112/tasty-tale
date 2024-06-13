import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeModule } from 'src/recipe/recipe.module';
import { ReviewEntity } from './entities/review.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity]), RecipeModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
