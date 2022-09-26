import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Observable } from 'rxjs';
import { location_location } from './location.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { readFileSync } from 'fs';
import { parse } from "papaparse"
import { connected } from 'process';
import { Parcel } from './entities/polygon.entity';
import { linestringentity } from './entities/line-string.entity';
@Controller('gisdata')
export class LocationController {
  constructor(private readonly locationService: LocationService) { }

  @Get()
  message() {
    return "hii amit"
  }

  @Post("/msg")
  messagePost() {
    return "Hello Amit"
  }

  @Post()
  create(@Body() createLocation: CreateLocationDto): Observable<location_location> {
    console.log(createLocation)
    return this.locationService.create(createLocation);
  }

  @Get("data")
  findAll() {
    return this.locationService.findAll();
  }


  @Post('polygon')
  async createParcelPoint(
    @Body()
    createParcelPointDto: Parcel): Promise<Parcel> {
    console.log(createParcelPointDto)
    return this.locationService.createParcel(createParcelPointDto)
  }

  @Get("polygon")
  polygon() {
    return this.locationService.findAllPolygon();
  }
  // @Post('file')
  // @UseInterceptors(
  //   FileInterceptor('file_asset', {
  //     storage: diskStorage({
  //       destination: './files',
  //     })
  //   })
  // )
  // async uploadFile() {
  //   console.log("file uploaded")
  //   return 'file upload'
  // }

  @Post('file')
  // @UseInterceptors(
  //   FileInterceptor('file_asset', {
  //     storage: diskStorage({
  //       destination: './files',
  //     })
  //   })
  // )

  async uploadFile() {
    const csvFile = readFileSync('files/1.csv')
    const csvData = csvFile.toString()
    const parsedCsv = await parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data,
    });
    /////////////////////////////////
    console.log(parsedCsv.data)

    var a = [1, 2, 3, 4, 5]
    for (var i of a) {
      console.log(i)
    }

    for (let data of parsedCsv.data) {
      console.log("this is come from first looop data", data)
    }
    var add = {}
    for (let i of parsedCsv.data) {
      console.log("this data come from loop", i)
      //console.log("parsedCsv", parsedCsv.data)
      var point = { type: 'Point', coordinates: [i.lat, i.long] };
      add = {
        // pk_id: parsedCsv.data.pk_id,
        lat: i.lat,
        long: i.long,
        City_Name: i.city_name,
        location: point,

      };

      console.log('Data: ', add)
      //return this.locationService.create(add);
      console.log(this.locationService.create(add))
      //return "data added!!!!!!!!!!!!!!!!!!!!!!!"
    }
    ////////////////////////////
    return "data stored in databse!!!!!!!!!!!!!!!!!!!!!!!"
    console.log(parsedCsv)





  }


  @Post('/linestring')
  async linePoint(@Body()
  createlinePointDto: linestringentity): Promise<linestringentity> {
    console.log(createlinePointDto)
    return this.locationService.createLinePoint(createlinePointDto)
  }


  @Get('/linestring')
  lineStringData() {
    return this.locationService.lineString()
  }





  ///////////////////////////////////////////////////////////////////////////











}
