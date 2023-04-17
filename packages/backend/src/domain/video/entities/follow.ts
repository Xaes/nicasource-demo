import { DataTypes, Model } from "sequelize";
import SequelizeClient from "../../../persistence/database";

export interface FollowAttributes {
    followerId: string;
    followingId: string;
}

export interface FollowParams {
    followerId: string;
    followingId: string;
}

export class Follow extends Model<FollowAttributes, FollowParams> {
    followerId!: string;
    followingId!: string;
}

export const FollowModel = Follow.init({
    followerId: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        validate: {
            isUUID: 4
        }
    },
    followingId: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        validate: {
            isUUID: 4
        }
    }
}, {
    sequelize: SequelizeClient,
    tableName: "follow",
    freezeTableName: true,
    timestamps: true,
    indexes: [
        { fields: ["followerId", "followingId"], unique: true }
    ]
});
