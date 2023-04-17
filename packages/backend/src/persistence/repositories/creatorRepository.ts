import { IRepository } from "../../domain/common/repository";
import { Creator, CreatorParams } from "../../domain/video/entities/creator";
import SequelizeClient from "../database";
import DomainException from "../../domain/common/exception";

export type ICreatorRepository = IRepository<CreatorParams, Creator>

export class CreatorRepository implements ICreatorRepository {
    private sequelizeRepository = SequelizeClient.getRepository(Creator);

    async create(params: CreatorParams): Promise<Creator> {
        return await this.sequelizeRepository.create(params);
    }

    async delete(creator: Creator): Promise<void> {
        await this.sequelizeRepository.destroy({
            where: { id: creator.id }
        });
    }

    async exists(id: string): Promise<boolean> {
        const result = await this.sequelizeRepository.findOne({ where: { id } });
        return !!result;
    }

    async getById(id: string): Promise<Creator> {
        const entity = await this.sequelizeRepository.findByPk(id);
        if (!entity) throw new DomainException(`Creator with ID ${id} was not found.`);
        else return entity;
    }

    async save(creator: Creator): Promise<Creator> {
        return await creator.save();
    }
}

const CreatorAggregate = new CreatorRepository();
export default CreatorAggregate;
