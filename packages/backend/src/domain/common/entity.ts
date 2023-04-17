import { DataTypes, Model } from "sequelize";

export interface EntityAttributes {
    id: string;
}

export default class BaseModel<Attributes extends EntityAttributes, Params extends object> extends Model<Attributes, Params> {
    public id!: string;
}

export const DefaultSchema = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        validate: {
            isUUID: 4
        }
    },
};
