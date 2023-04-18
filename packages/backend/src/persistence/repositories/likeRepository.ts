import { IRepository } from "../../domain/common/repository";
import { Like, LikeParams } from "../../domain/video/entities/like";
import { Attributes, FindOptions } from "sequelize";
import { LikeModel } from "../models";

export type ILikeRepository = IRepository<Like, FindOptions<Attributes<Like>>, LikeParams>;

export class LikeRepository implements ILikeRepository {
    private model: typeof Like = LikeModel;

    async delete(like: Like): Promise<void> {
        await this.model.destroy({
            where: {
                creatorId: like.creatorId,
                videoId: like.videoId
            }
        });
    }

    exists(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    getById(): Promise<Like> {
        throw new Error("Method not implemented.");
    }

    async save(model: Like): Promise<Like> {
        return await model.save();
    }

    async findAll(options: FindOptions<Attributes<Like>>): Promise<Like[]>{
        return await this.model.findAll(options);
    }

    async findOne(options: FindOptions<Attributes<Like>>): Promise<Like | null> {
        return await this.model.findOne(options);
    }

    async create(params: LikeParams): Promise<Like> {
        return await this.model.create(params);
    }
}
