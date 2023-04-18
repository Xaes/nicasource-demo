import { EntityAttributes } from "../../common/entity";
import DomainException from "../../common/exception";
import BaseModel from "../../common/entity";
import { LikeRepositoryFactory } from "../../../persistence/factories/repositoryFactory";
import { Like } from "./like";

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

    public async like(creatorId: string): Promise<Like> {
        const repository = LikeRepositoryFactory.newInstance();
        return await repository.create({ videoId: this.id, creatorId });
    }

    public async unlike(creatorId: string): Promise<void> {
        const repository = LikeRepositoryFactory.newInstance();
        const like = await repository.findOne({ where: { creatorId, videoId: this.id } });
        if (!like) throw new DomainException(`Video ${this.id} is not liked by Creator ${creatorId}`);
        else await repository.delete(like);
    }

}
