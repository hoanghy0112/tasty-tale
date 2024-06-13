import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatedUserDto } from './dto/created-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  create(createdUserDto: CreatedUserDto): Promise<UserEntity> {
    return this.userRepository.save(createdUserDto);
  }

  findById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  findByGoogleId(id: string) {
    return this.userRepository.findOneBy({ googleId: id });
  }
}
