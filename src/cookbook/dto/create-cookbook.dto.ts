import { UserDto } from 'src/user/dto/user.dto';

export class CreateCookbookDto {
  name: string;
  description: string;
  author: UserDto;
  recipes: string[];
}
