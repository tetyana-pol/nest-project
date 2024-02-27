import { IsString } from 'class-validator';

export class CreateAdvertisementDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  adress: string;

  @IsString()
  price: string;

  authorId: number;
}

export class ReturnAdvertisementDto {
  id: number;
  title: string;
  description: string;
  img: string;
  adress: string;
  price: string;
}
