import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { RecipeModule } from 'src/recipe/recipe.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), RecipeModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
