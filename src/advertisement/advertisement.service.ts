import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAdvertisementDto } from './dto/advertisement.dto';

@Injectable()
export class AdvertisementService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAdvertisementDto, filePath: string) {
    console.log(dto);
    const newAdvertisement = await this.prisma.advertisement.create({
      data: { ...dto, img: filePath, authorId: Number(dto.authorId) },
    });

    return newAdvertisement;
  }

  async getAll() {
    const all = await this.prisma.advertisement.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return all;
  }
}
