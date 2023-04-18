import { FollowRepository, IFollowRepository } from "../repositories/followRepository";
import { ILikeRepository, LikeRepository } from "../repositories/likeRepository";

export class FollowRepositoryFactory {
    static newInstance(): IFollowRepository {
        return new FollowRepository();
    }
}

export class LikeRepositoryFactory {
    static newInstance(): ILikeRepository {
        return new LikeRepository();
    }
}
