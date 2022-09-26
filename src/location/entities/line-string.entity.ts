
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
//  import {LineString} from "geojson";
import { MultiLineString } from "geojson";
import { IsOptional } from "class-validator";
@Entity('MultiLineString')
export class linestringentity {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ nullable: true })
    City_Name: string;
    @Index({ spatial: true })
    @Column({
        type: 'geography',
        //  spatialFeatureType:'MultiLineString',
        srid: 4326,
        nullable: true
    })
    lineString: MultiLineString;
    @IsOptional()
    coordinates?: number[][]
}