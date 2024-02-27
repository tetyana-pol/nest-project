import { Module } from '@nestjs/common';
import { AdvertisementService } from './advertisement.service';
import { AdvertisementController } from './advertisement.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [AdvertisementService, PrismaService, JwtService],
  controllers: [AdvertisementController],
})
export class AdvertisementModule {}
