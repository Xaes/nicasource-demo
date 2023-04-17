import Entity, { EntityAttributes } from "../../common/entity";
import { BelongsTo, Column, DataType, Default, ForeignKey, IsUrl, Table } from "sequelize-typescript";
import DomainException from "../../common/exception";
import { Creator } from "./creator";

export interface VideoAttributes extends EntityAttributes {
    title: string;
    description: string;
    publishedAt?: Date;
    isPublished: boolean;
    videoUrl: string;
}

export interface VideoParams {
    title: string;
    description: string;
    videoUrl: string;
    creatorId: string;
}

@Table({
    tableName: "video",
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

    @ForeignKey(() => Creator)
    @Column
    public creatorId!: string;

    @BelongsTo(() => Creator)
    public creator!: Creator;

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
