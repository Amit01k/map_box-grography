import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'path';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';
import { location_location } from './location.interface';

@Injectable()
export class LocationService {

  constructor(@InjectRepository(Location) private readonly Location: Repository<Location>) { }





  create(createLocationDto: location_location): Observable<location_location> {
    console.log(createLocationDto);

    return from(this.Location.save(createLocationDto))
  }

  findAll() {
    return from(this.Location.find())
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} location`;
  // }

  // update(id: number, updateLocationDto: UpdateLocationDto) {
  //   return `This action updates a #${id} location`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} location`;
  // }
}
