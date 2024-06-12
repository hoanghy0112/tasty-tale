import { CreateImageDto } from 'src/image/dto/create-image.dto';

export class CreateStepDto {
  order: number;
  title: string;
  content: string;
  images: CreateImageDto[];
}
