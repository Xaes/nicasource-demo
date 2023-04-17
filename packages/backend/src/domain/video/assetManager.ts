import {Video} from "./entities/video";
import { VideoRepository } from "../../persistence/repositories/videoRepository";

export interface IAssetManager {
    // Creators.
    addCreator(): Promise<unknown>;
    findCreatorById(): Promise<unknown>;
    findCreatorByEmail(): Promise<unknown>;

    // Videos.
    addVideo(): Promise<Video>
    findVideoById(id: string): Promise<Video>
    findPublishedVideos(): Promise<Video[]>
    findVideosByCreatorId(creatorId: string): Promise<Video[]>

    // Likes.
    findLikedVideosByCreatorId(creatorId: string): Promise<Video[]>

    // Follows.
    findFollowingByCreatorId(creatorId: string): Promise<unknown[]>
    findFollowersByCreatorId(creatorId: string): Promise<unknown[]>
}

class AssetManager implements IAssetManager {

    private repository: VideoRepository;

    public constructor(repository: VideoRepository) {
        this.repository = repository;
    }

    addCreator(): Promise<unknown> {
        throw new Error("Method not implemented.");
    }

    addVideo(): Promise<Video> {
        throw new Error("Method not implemented.");
    }

    findCreatorByEmail(): Promise<unknown> {
        throw new Error("Method not implemented.");
    }

    findCreatorById(): Promise<unknown> {
        throw new Error("Method not implemented.");
    }

    findFollowersByCreatorId(creatorId: string): Promise<unknown[]> {
        throw new Error("Method not implemented.");
    }

    findFollowingByCreatorId(creatorId: string): Promise<unknown[]> {
        throw new Error("Method not implemented.");
    }

    findLikedVideosByCreatorId(creatorId: string): Promise<Video[]> {
        throw new Error("Method not implemented.");
    }

    findPublishedVideos(): Promise<Video[]> {
        throw new Error("Method not implemented.");
    }

    findVideoById(id: string): Promise<Video> {
        throw new Error("Method not implemented.");
    }

    findVideosByCreatorId(creatorId: string): Promise<Video[]> {
        throw new Error("Method not implemented.");
    }

}
