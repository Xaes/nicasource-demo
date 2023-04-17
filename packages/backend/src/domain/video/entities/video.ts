import Entity, { EntityAttributes, EntityParams } from "../../common/entity";
import { Column, DataType, Default, IsUrl, Table } from "sequelize-typescript";
import DomainException from "../../common/exception";

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

    public publish(): void {
        if (this.isPublished) throw new DomainException(`Video ID ${this.id} can't be updated because it is already published`);
        else {
            this.isPublished = true;
            this.publishedAt = new Date();
        }
    }

    public unpublish(): void {
        if (!this.isPublished) throw new DomainException(`Video ID ${this.id} can't be updated because it is already unpublished`);
        else {
            this.isPublished = false;
            this.publishedAt = undefined;
        }
    }

    public like(): void {
        throw new Error("Method not implemented");
    }

}
