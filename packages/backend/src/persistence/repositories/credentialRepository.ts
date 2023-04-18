import { FindOptions, Attributes } from "sequelize";
import { Credential, CredentialParams } from "../../domain/auth/entities/credential";
import { IRepository } from "../../domain/common/repository";
import DomainException from "../../domain/common/exception";

export type ICredentialRepository = IRepository<Credential, FindOptions<Attributes<Credential>>, CredentialParams>;

export class CredentialRepository implements ICredentialRepository {
    private model: typeof Credential = Credential;

    async create(params: CredentialParams): Promise<Credential> {
        return await this.model.create(params);
    }
    async delete(credential: Credential): Promise<void> {
        await this.model.destroy({
            where: { id: credential.id }
        });
    }
    async exists(id: string): Promise<boolean> {
        const result = await this.model.findOne({ where: { id } });
        return !!result;
    }
    async getById(id: string): Promise<Credential> {
        const entity = await this.model.findByPk(id);
        if (!entity) throw new DomainException(`Credential with ID ${id} was not found.`);
        else return entity;
    }
    async save(credential: Credential): Promise<Credential> {
        return await credential.save();
    }
    async findAll(options: FindOptions<Attributes<Credential>>): Promise<Credential[]> {
        return await this.model.findAll(options);
    }
    async findOne(options: FindOptions<Attributes<Credential>>): Promise<Credential | null> {
        return await this.model.findOne(options);
    }
}

const AuthAggregate = new CredentialRepository();
export default AuthAggregate;
