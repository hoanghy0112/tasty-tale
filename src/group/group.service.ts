import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupEntity } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}

  create(createGroupDto: CreateGroupDto): Promise<GroupEntity> {
    return this.groupRepository.save(createGroupDto);
  }

  findOne(id: string) {
    return `This action returns a #${id} group`;
  }

  update(id: string, updateGroupDto: UpdateGroupDto) {
    return this.groupRepository.update({ id }, updateGroupDto);
  }
}
