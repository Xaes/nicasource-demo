export interface IRepository<Model, QueryOptions extends object, Params extends object> {
    exists(id: string): Promise<boolean>;
    delete(model: Model): Promise<void>;
    getById(id: string): Promise<Model>;
    save(model: Model): Promise<Model>;
    create(params: Params): Promise<Model>;
    findAll(options: QueryOptions): Promise<Model[]>
    findOne(options: QueryOptions): Promise<Model | null>
}
