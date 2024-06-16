import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/types/authenticated-request.type';
import { CookbookService } from './cookbook.service';
import { CreateCookbookDto } from './dto/create-cookbook.dto';
import { UpdateCookbookDto } from './dto/update-cookbook.dto';

@Controller('/v1/cookbook')
export class CookbookController {
  constructor(private readonly cookbookService: CookbookService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createCookbookDto: CreateCookbookDto,
    @Request() req: AuthenticatedRequest,
  ) {
    createCookbookDto.author = req.user;
    return this.cookbookService.create(createCookbookDto);
  }

  @Get()
  findRandom(@Param('quantity') quantity: number) {
    return this.cookbookService.findRandom(quantity);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cookbookService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCookbookDto: UpdateCookbookDto,
  ) {
    return this.cookbookService.update(id, updateCookbookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cookbookService.remove(id);
  }
}
