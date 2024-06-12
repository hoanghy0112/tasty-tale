import { Body, Controller, Post } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { ImageService } from './image.service';

@Controller('/v1/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imageService.create(createImageDto);
  }
}
