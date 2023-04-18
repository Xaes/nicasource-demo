import { IRepository } from "../../domain/common/repository";
import { Follow, FollowParams } from "../../domain/video/entities/follow";
import { FollowModel } from "../models";
import { Attributes, FindOptions } from "sequelize";

export type IFollowRepository = IRepository<Follow, FindOptions<Attributes<Follow>>, FollowParams>

export class FollowRepository implements IFollowRepository {
    private model: typeof Follow = FollowModel;

    async delete(follow: Follow): Promise<void> {
        await this.model.destroy({
            where: {
                followingId: follow.followingId,
                followerId: follow.followerId
            }
        });
    }

    exists(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    getById(): Promise<Follow> {
        throw new Error("Method not implemented.");
    }

    async save(model: Follow): Promise<Follow> {
        return await model.save();
    }

    async findAll(options: FindOptions<Attributes<Follow>>): Promise<Follow[]>{
        return await this.model.findAll(options);
    }

    async findOne(options: FindOptions<Attributes<Follow>>): Promise<Follow | null> {
        return await this.model.findOne(options);
    }

    async create(params: FollowParams): Promise<Follow> {
        return await this.model.create(params);
    }
}
