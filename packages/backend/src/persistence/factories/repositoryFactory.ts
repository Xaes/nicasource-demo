import { FollowRepository, IFollowRepository } from "../repositories/followRepository";

export default class FollowRepositoryFactory {
    static newInstance(): IFollowRepository {
        return new FollowRepository();
    }
}
