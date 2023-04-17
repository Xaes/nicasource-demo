import { DefaultSchema, EntityAttributes } from "../../common/entity";
import DomainException from "../../common/exception";
import BaseModel from "../../common/entity";
import SequelizeClient from "../../../persistence/database";
import { DataTypes, Deferrable } from "sequelize";

export interface VideoAttributes extends EntityAttributes {
    title: string;
    description: string;
    publishedAt?: Date;
    isPublished: boolean;
    videoUrl: string;
    creatorId: string;
}

export interface VideoParams {
    title: string;
    description: string;
    videoUrl: string;
    creatorId: string;
}

export class Video extends BaseModel<VideoAttributes, VideoParams> {

    public title!: string;
    public description!: string;
    public publishedAt?: Date;
    public isPublished!: boolean;
    public videoUrl!: string;
    public creatorId!: string;

    public publish(): void {
        if (this.isPublished) throw new DomainException(`Video ID ${this.id} can't be updated because it is already published`);
        else {
            this.isPublished = true;
            this.publishedAt = new Date();
        }
    }

    public unpublish(): void {
        if (!this.isPublished) throw new DomainException(`Video ID ${this.id} can't be updated because it is already unpublished`);
        else {
            this.isPublished = false;
            this.publishedAt = undefined;
        }
    }

    public like(): void {
        throw new Error("Method not implemented");
    }

}

export const VideoModel = Video.init({
    ...DefaultSchema,
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publishedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    isPublished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    videoUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    creatorId: {
        type: DataTypes.UUIDV4,
        validate: {
            isUUID: 4
        }
    }
}, {
    sequelize: SequelizeClient,
    tableName: "video",
    timestamps: true,
    freezeTableName: true,
});
