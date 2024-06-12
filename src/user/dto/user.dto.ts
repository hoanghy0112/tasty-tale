import { BaseDto } from 'src/common/dtos/base.dto';
import { Entity } from 'typeorm';

@Entity()
export class UserDto extends BaseDto {
  displayname: string;

  username: string;

  address: string;

  phone: string;

  googleId: string;
}
