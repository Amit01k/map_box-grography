import { Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { Point } from 'geojson'
import { type } from "os";
@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    pk_id: number;

    @Column({ type: 'decimal', nullable: true })
    lat: number;

    @Column({ type: 'decimal', nullable: true })
    long: number;

    @Column({ nullable: true })
    City_Name: string;

    @Index({ spatial: true })
    @Column({
        type: 'geography',
        spatialFeatureType: 'Point',
        srid: 4326,
        nullable: true,
    })
    location: Point;
    // @PrimaryColumn()
    // id: number;

    // @Column()
    // lat: string;

    // @Column()
    // lag: string;


    //@Column()

}
