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
@Controller('gisdata')
export class LocationController {
  constructor(private readonly locationService: LocationService) { }

  @Get()
  message() {
    return "hii amit"
  }

  @Post("/msg")
  messagePost() {
    return "ndsfgsdfgbufdguf"
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
  @UseInterceptors(
    FileInterceptor('file_asset', {
      storage: diskStorage({
        destination: './files',
      })
    })
  )

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
    console.log(parsedCsv)
    console.log("parsedCsv", parsedCsv.data)
    const add = {
      // pk_id: parsedCsv.data.pk_id,
      lat: parsedCsv.data[0].lat,
      long: parsedCsv.data[0].long,
      City_Name: parsedCsv.data[0].city_name,

      // created_at: new Date(),
      // updated_at: new Date()
    };
    console.log('Data: ', add)

    return this.locationService.create(add);

    ////////////////////////////





    console.log(parsedCsv)

    //improtant 
    //return parsedCsv.data[0].id;
    //{}=   parsedCsv
    //console.log(typeof (parsedCsv.data.id))
  }





  ///////////////////////////////////////////////////////////////////////////











}
