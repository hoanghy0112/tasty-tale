import { CreateImageDto } from 'src/image/dto/create-image.dto';
import { UserDto } from 'src/user/dto/user.dto';

export class CreateReviewDto {
  content: string;
  rating: number;
  user: UserDto;
  recipeId: string;
  images: CreateImageDto[];
}
