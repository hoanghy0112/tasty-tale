import { UserEntity } from 'src/user/entities/user.entity';

export class AuthDto {
  access_token!: string;

  user!: UserEntity;
}
