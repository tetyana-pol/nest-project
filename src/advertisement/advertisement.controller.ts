import {
  Controller,
  Post,
  Get,
  Body,
  UseInterceptors,
  UploadedFile,
  Param,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  CreateAdvertisementDto,
  ReturnAdvertisementDto,
} from './dto/advertisement.dto';
import { AdvertisementService } from './advertisement.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('advertisement')
export class AdvertisementController {
  constructor(private advertisementService: AdvertisementService) {}

  @Get()
  async allAdvertisements(): Promise<ReturnAdvertisementDto[]> {
    return await this.advertisementService.getAll();
  }

  @Get('image/:imagename')
  getImage(@Param('imagename') image: string, @Res() res) {
    const response = res.sendFile(image, { root: './uploads' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  @UseGuards(JwtGuard)
  @Post('add')
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1000);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async addAdvertisement(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateAdvertisementDto,
  ) {
    return await this.advertisementService.create(dto, file.filename);
  }
}
