import Entity, { DefaultSchema, EntityAttributes } from "../../common/entity";
import { Follow } from "./follow";
import DomainException from "../../common/exception";
import FollowRepositoryFactory from "../../../persistence/factories/repositoryFactory";
import SequelizeClient from "../../../persistence/database";
import { DataTypes } from "sequelize";

export interface CreatorAttributes extends EntityAttributes {
    name: string,
    email: string,
}

export interface CreatorParams {
    name: string,
    email: string,
}

export class Creator extends Entity<CreatorAttributes, CreatorParams> {
    public name!: string;
    public email!: string;

    public async follow(followerId: string): Promise<Follow> {
        const repository = FollowRepositoryFactory.newInstance();
        return await repository.create({ followerId, followingId: this.id });
    }

    public async unfollow(followerId: string): Promise<void> {
        const repository = FollowRepositoryFactory.newInstance();
        const follow = await repository.findOne({ where: { followerId, followingId: this.id } });
        if (!follow) throw new DomainException(`Creator ${followerId} is not following ${this.id}`);
        else await repository.delete(follow);
    }

}

export const CreatorModel = Creator.init({
    ...DefaultSchema,
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    sequelize: SequelizeClient,
    tableName: "creator",
    freezeTableName: true,
    timestamps: true
});
