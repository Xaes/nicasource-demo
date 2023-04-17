import Entity, { EntityAttributes, EntityParams } from "../../common/entity";
import { Column, DataType, Default, IsUrl, Table } from "sequelize-typescript";

export interface VideoAttributes extends EntityAttributes {
    title: string;
    description: string;
    publishedAt?: Date;
    isPublished: boolean;
    videoUrl: string;
}

export interface VideoParams extends EntityParams {
    title: string;
    description: string;
    videoUrl: string;
}

@Table({
    tableName: "user",
    freezeTableName: true,
    timestamps: true,
})
export class Video extends Entity<VideoAttributes, VideoParams> {

    @Column(DataType.STRING)
    public title!: string;

    @Column(DataType.STRING)
    public description!: string;

    @Column(DataType.DATE)
    public publishedAt?: Date;

    @Default(false)
    @Column(DataType.BOOLEAN)
    public isPublished!: boolean;

    @IsUrl
    @Column(DataType.STRING)
    public videoUrl!: string;

    public static newInstance(params: VideoParams): Video {
        return new Video(params);
    }

    public publish(): void {
        throw new Error("Method not implemented");
    }

    public unpublished(): void {
        throw new Error("Method not implemented");
    }

    public like(): void {
        throw new Error("Method not implemented");
    }

}
