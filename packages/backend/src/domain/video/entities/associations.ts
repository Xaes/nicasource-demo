import { VideoModel } from "./video";
import { CreatorModel } from "./creator";
import { FollowModel } from "./follow";

export default (): void => {

    // Video - Creator: 1 to Many.
    CreatorModel.hasMany(VideoModel, { foreignKey: "creatorId" });
    VideoModel.belongsTo(CreatorModel, { foreignKey: "id" });

    // Creator - Follow: Multiple association with same model.
    CreatorModel.belongsToMany(CreatorModel, { through: "follow", foreignKey: "followerId", as: "followers" });
    CreatorModel.belongsToMany(CreatorModel, { through: "follow", foreignKey: "followingId", as: "following" });
    FollowModel.belongsTo(CreatorModel, { as: "follower" });
    FollowModel.belongsTo(CreatorModel, { as: "following" });
};
