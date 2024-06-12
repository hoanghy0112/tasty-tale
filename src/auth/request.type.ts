import { UserDto } from 'src/user/dto/user.dto';

export type AuthenticatedRequest = {
  user: UserDto;
} & Request;
