import {
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    IsDate,
    IsUUID,
    Model,
    PrimaryKey, Unique,
    UpdatedAt
} from "sequelize-typescript";

export interface EntityAttributes {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export default class Entity<Attributes extends EntityAttributes, Params extends object = object> extends Model<Attributes, Params> {
    @IsUUID(4)
    @PrimaryKey
    @Unique
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
        id!: string;

    @CreatedAt
    @IsDate
    @Column(DataType.DATE)
        createdAt!: Date;

    @UpdatedAt
    @IsDate
    @Column(DataType.DATE)
        updatedAt!: Date;

    @DeletedAt
    @IsDate
    @Column(DataType.DATE)
        deletedAt?: Date;
}
