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

    public async follow(followingId: string): Promise<Follow> {
        if (followingId === this.id) throw new DomainException("A Creator cannot follow itself.");
        const repository = FollowRepositoryFactory.newInstance();
        return await repository.create({ followerId: this.id, followingId: followingId });
    }

    public async unfollow(followingId: string): Promise<void> {
        if (followingId === this.id) throw new DomainException("A Creator cannot follow itself.");
        const repository = FollowRepositoryFactory.newInstance();
        const follow = await repository.findOne({ where: { followerId: this.id, followingId: followingId } });
        if (!follow) throw new DomainException(`Creator ${this.id} is not following ${followingId}`);
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
