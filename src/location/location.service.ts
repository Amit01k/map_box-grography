import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'path';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { linestringentity } from './entities/line-string.entity';
import { Location } from './entities/location.entity';
import { Parcel } from './entities/polygon.entity';
import { location_location } from './location.interface';

import { MultiLineString } from "geojson"

@Injectable()
export class LocationService {

  constructor(@InjectRepository(Location) private readonly Location: Repository<Location>,
    @InjectRepository(Parcel)
    private readonly parcel: Repository<Parcel>,
    @InjectRepository(linestringentity)
    private readonly linestrings: Repository<linestringentity>
  ) { }





  create(createLocationDto: location_location): Observable<location_location> {
    //console.log(createLocationDto);

    return from(this.Location.save(createLocationDto))
  }

  findAll() {
    return from(this.Location.find())
  }

  async createParcel(createParcelPointDto: Parcel): Promise<any> {
    const polygon = {
      type: 'polygon',
      coordinates: [createParcelPointDto.coordinates],
      City_Name: createParcelPointDto.City_Name
    }
    console.log(polygon)
    // const parcel = this.parcel.create({ polygon })
    const parcel = this.parcel.create({ City_Name: createParcelPointDto.City_Name, polygon })
    console.log(parcel)
    await this.parcel.save(parcel)
    return parcel
  }

  findAllPolygon() {
    return from(this.parcel.find())
  }


  async createLinePoint(createLinePointDto: linestringentity): Promise<linestringentity> {
    console.log("this is come from linestring service ", createLinePointDto)
    const { coordinates } = createLinePointDto
    // const data = {
    //   City_Name:createParcelPointDto.City_Name,
    // }
    //console.log(data)
    const lineString: MultiLineString = {
      type: 'MultiLineString',
      coordinates: [coordinates],
    }
    //  const Data = {
    //   City_Name:createLinePointDto.City_Name
    //  }
    //  console.log(Data)
    console.log("line no-73", lineString)
    const line = this.linestrings.create({
      lineString,
      City_Name: createLinePointDto.City_Name
    })
    await this.linestrings.save(line)
    return line
  }
  //}


  lineString() {
    return from(this.linestrings.find())
  }












  ///////////////////////////////////////////////
  // async lineStirng(createline: linestringentity): Promise<any> {
  //   const line = {
  //     type: 'LineSting',
  //     coordinates: [createline.coordinates],
  //     City_Name: createline.City_Name
  //   }
  //   console.log(line)
  //   // const parcel = this.parcel.create({ polygon })
  //   const parcel = this.linestrings.create({ City_Name: createline.City_Name, line })
  //   console.log(parcel)
  //   await this.parcel.save(parcel)
  //   return parcel
  // }




  /////////////////////////////////////////////


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
