// import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
// import { Polygon, LineSting } from "geojson"

// //import { IsOptional } from "@nestjs/class-validator"

// import { IsOptional } from "class-validator"

// @Entity({ name: "PolygonTable" })
// export class linestringentity {
//     @PrimaryGeneratedColumn()
//     id: number
//     @Column({ nullable: true })
//     City_Name: string;
//     @Index({ spatial: true })
//     @Column({
//         type: 'geography',
//         spatialFeatureType: 'LineSting',
//         srid: 4326,
//         nullable: true
//     })
//     LineSting: LineSting;
//     @IsOptional()
//     coordinates?: number;

//     // coordinates?: number[][]
// }