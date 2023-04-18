import { Video } from "../domain/video/entities/video";
import { Creator } from "../domain/video/entities/creator";
import { Follow } from "../domain/video/entities/follow";
import { DataTypes } from "sequelize";
import SequelizeClient from "./database";
import { DefaultSchema } from "../domain/common/entity";
import { Like } from "../domain/video/entities/like";

export const CreatorModel = Creator.init({
    ...DefaultSchema,
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Creator's name can't be null" }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: { msg: "Creator's email can't be null" },
            isEmail: { msg: "Provided email is invalid" }
        }
    }
}, {
    sequelize: SequelizeClient,
    tableName: "creator",
    freezeTableName: true,
    timestamps: true
});

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
            isUrl: { msg: "Provided Video URL is invalid" },
            notNull: { msg: "Video URL can't be null" }
        }
    },
    creatorId: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            isUUID: { args: 4, msg: "Provided CreatorID is not a valid UUID" },
            notNull: { msg: "Creator ID can't be null" }
        }
    }
}, {
    sequelize: SequelizeClient,
    tableName: "video",
    timestamps: true,
    freezeTableName: true,
});

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

export const LikeModel = Like.init({
    videoId: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        validate: {
            isUUID: 4
        }
    },
    creatorId: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        validate: {
            isUUID: 4
        }
    }
}, {
    sequelize: SequelizeClient,
    tableName: "like",
    freezeTableName: true,
    timestamps: true,
    indexes: [
        { fields: ["videoId", "creatorId"], unique: true }
    ]
});


// Associations:
// Video - Creator: One to Many.
CreatorModel.hasMany(VideoModel, { foreignKey: "creatorId" });
VideoModel.belongsTo(CreatorModel, { foreignKey: "id" });

// Creator - Follow: Multiple association with same model.
CreatorModel.belongsToMany(CreatorModel, { through: "follow", foreignKey: "followerId", as: "followers" });
CreatorModel.belongsToMany(CreatorModel, { through: "follow", foreignKey: "followingId", as: "following" });
FollowModel.belongsTo(CreatorModel, { as: "follower" });
FollowModel.belongsTo(CreatorModel, { as: "following" });

// Creator / Video - Like: Many to Many.
CreatorModel.belongsToMany(VideoModel, { through: "like", foreignKey: "creatorId", as: "likedVideos" });
VideoModel.belongsToMany(CreatorModel, { through: "like", foreignKey: "videoId", as: "likeUserIds" });
