import Entity, { EntityAttributes } from "./entity";

export interface IRepository<Params extends object, T extends Entity<EntityAttributes, Params>> {
    exists(id: string): Promise<boolean>;
    delete(entity: T): Promise<void>;
    getById(id: string): Promise<T>;
    save(entity: T): Promise<T>;
    create(params: Params): Promise<T>;
}
