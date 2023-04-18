import { IRepository } from "../../domain/common/repository";
import { Creator, CreatorParams } from "../../domain/video/entities/creator";
import { CreatorModel, VideoModel } from "../models";
import DomainException from "../../domain/common/exception";
import { Attributes, FindOptions } from "sequelize";

export type ICreatorRepository = IRepository<Creator, FindOptions<Attributes<Creator>>, CreatorParams>

export class CreatorRepository implements ICreatorRepository {
    private model: typeof Creator = CreatorModel;

    async create(params: CreatorParams): Promise<Creator> {
        return await this.model.create(params);
    }

    async delete(creator: Creator): Promise<void> {
        await this.model.destroy({
            where: { id: creator.id }
        });
    }

    async exists(id: string): Promise<boolean> {
        const result = await this.model.findOne({ where: { id } });
        return !!result;
    }

    async getById(id: string): Promise<Creator> {
        const entity = await this.model.findByPk(id, {
            include: [
                { model: CreatorModel, as: "followers" },
                { model: CreatorModel, as: "following" },
                { model: VideoModel, as: "likedVideos" }
            ]
        });
        if (!entity) throw new DomainException(`Creator with ID ${id} was not found.`);
        else return entity;
    }

    async save(model: Creator): Promise<Creator> {
        return await model.save();
    }

    async findAll(options: FindOptions<Attributes<Creator>>): Promise<Creator[]>{
        return await this.model.findAll(options);
    }

    async findOne(options: FindOptions<Attributes<Creator>>): Promise<Creator | null> {
        return await this.model.findOne({
            ...options,
            include: [
                { model: CreatorModel, as: "followers" },
                { model: CreatorModel, as: "following" },
                { model: VideoModel, as: "likedVideos" }
            ]
        });
    }
}

const CreatorAggregate = new CreatorRepository();
export default CreatorAggregate;
