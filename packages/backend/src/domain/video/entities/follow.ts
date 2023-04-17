import Entity, {EntityAttributes} from "../../common/entity";
import {Column, ForeignKey, Table} from "sequelize-typescript";
import {Creator} from "./creator";

export interface FollowAttributes extends EntityAttributes {
    follower: string;
    following: string;
}

export interface FollowParams {
    follower: string;
    following: string;
}

@Table({
    tableName: "follow",
    freezeTableName: true,
    timestamps: true,
    indexes: [
        { fields: ["followerId", "followingId"], unique: true }
    ]
})
export class Follow extends Entity<FollowAttributes, FollowParams> {
    @ForeignKey(() => Creator)
    @Column
    followerId!: string;

    @ForeignKey(() => Creator)
    @Column
    followingId!: string;
}
