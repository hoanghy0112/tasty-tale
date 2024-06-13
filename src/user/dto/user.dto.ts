import { BaseDto } from 'src/common/dtos/base.dto';
import { Entity } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Entity()
export class UserDto extends BaseDto {
  displayname: string;
  username: string;
  address: string;
  phone: string;
  googleId: string;

  constructor(user: UserEntity) {
    super(user);
    this.displayname = user.displayname;
    this.username = user.displayname;
    this.address = user.address;
    this.phone = user.phone;
    this.googleId = user.googleId;
  }
}
