import { Entity } from 'typeorm';

@Entity()
export class CreatedUserDto {
  googleId: string;
  displayname: string;
  email: string;
}
