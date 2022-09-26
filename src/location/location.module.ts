import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Parcel } from './entities/polygon.entity';
import { linestringentity } from './entities/line-string.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location, Parcel, linestringentity])
  ],
  controllers: [LocationController],
  providers: [LocationService]
})
export class gismodule { }
