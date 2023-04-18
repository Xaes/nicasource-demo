import { Model } from "sequelize";

export interface LikeAttributes {
    videoId: string;
    creatorId: string;
}

export interface LikeParams {
    videoId: string;
    creatorId: string;
}

export class Like extends Model<LikeAttributes, LikeParams> {
    videoId!: string;
    creatorId!: string;
}
