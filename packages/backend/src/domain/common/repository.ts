import Entity, {EntityAttributes} from "./entity";

export interface IRepository<Params extends {}, T extends Entity<EntityAttributes, Params>> {
    exists(entity: T): Promise<boolean>;
    delete(entity: T): Promise<void>;
    getById(id: string): Promise<T>;
    save(entity: T): Promise<T>;
    create(params: Params): Promise<T>;
}
