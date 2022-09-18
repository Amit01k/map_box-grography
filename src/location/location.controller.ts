import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Observable } from 'rxjs';
import { location_location } from './location.interface';

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

  // @Get()
  // findAll() {
  //   return this.locationService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.locationService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
  //   return this.locationService.update(+id, updateLocationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.locationService.remove(+id);
  // }
}
