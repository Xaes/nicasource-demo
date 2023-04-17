import Entity, {EntityAttributes, EntityParams} from "./entity";

export interface IRepository<T extends Entity<EntityAttributes, EntityParams>> {
    exists(entity: T): Promise<boolean>;
    delete(entity: T): Promise<void>;
    getById(id: string): Promise<T>;
    update(entity: T): Promise<T>;
    create(params: EntityParams): Promise<T>;
}
