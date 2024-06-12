import { BaseDto } from 'src/common/dtos/base.dto';
import { Entity } from 'typeorm';

@Entity()
export class CreatedUserDto extends BaseDto {
  accessToken: string;
}
