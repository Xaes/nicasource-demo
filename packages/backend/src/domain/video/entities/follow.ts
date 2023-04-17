import { Model } from "sequelize";

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
