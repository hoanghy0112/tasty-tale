import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeService } from 'src/recipe/recipe.service';
import { Repository } from 'typeorm';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistEntity } from './entities/playlist.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly playlistRepository: Repository<PlaylistEntity>,
    private readonly recipeService: RecipeService,
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto) {
    const recipes = await this.recipeService.findByIds(
      createPlaylistDto.recipeIds,
    );
    return this.playlistRepository.save({ ...createPlaylistDto, recipes });
  }

  findOne(id: string) {
    return this.playlistRepository.findOne({
      where: { id },
      relations: { recipes: true, user: true },
    });
  }

  async update(id: string, updatePlaylistDto: UpdatePlaylistDto) {
    const recipes = await this.recipeService.findByIds(
      updatePlaylistDto.recipeIds,
    );
    const playlist = await this.playlistRepository.findOneBy({ id });
    Object.assign(playlist, updatePlaylistDto);
    return this.playlistRepository.save({ ...playlist, recipes });
  }

  remove(id: string) {
    return this.playlistRepository.softDelete({ id });
  }
}
