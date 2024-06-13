import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, Repository } from 'typeorm';
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

  update(user: Partial<UserEntity>) {
    return this.userRepository.save(user);
  }

  findById(id: string, relations?: FindOptionsRelations<UserEntity>) {
    return this.userRepository.findOne({ where: { id }, relations });
  }

  findByGoogleId(id: string) {
    return this.userRepository.findOneBy({ googleId: id });
  }
}
