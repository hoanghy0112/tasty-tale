import { UserDto } from 'src/user/dto/user.dto';

export class CreatePlaylistDto {
  name: string;
  recipeIds: string[];
  user: UserDto;
}
