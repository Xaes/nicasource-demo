import { EntityAttributes } from "../../common/entity";
import DomainException from "../../common/exception";
import BaseModel from "../../common/entity";

export interface VideoAttributes extends EntityAttributes {
    title: string;
    description: string;
    publishedAt?: Date;
    isPublished: boolean;
    videoUrl: string;
    creatorId: string;
}

export interface VideoParams {
    title: string;
    description: string;
    videoUrl: string;
    creatorId: string;
}

export class Video extends BaseModel<VideoAttributes, VideoParams> {

    public title!: string;
    public description!: string;
    public publishedAt?: Date;
    public isPublished!: boolean;
    public videoUrl!: string;
    public creatorId!: string;

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
