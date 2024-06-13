import { UserDto } from 'src/user/dto/user.dto';

export class CreatePostDto {
  content: string;
  author: UserDto;
  recipes: string[];
}
