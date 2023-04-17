import {Video, VideoParams} from "./entities/video";
import {IVideoRepository, VideoRepository} from "../../persistence/repositories/videoRepository";

export interface IAssetManager {
    // Creators.
    addCreator(): Promise<unknown>;
    findCreatorById(id: string): Promise<unknown>;
    findCreatorByEmail(email: string): Promise<unknown>;

    // Videos.
    addVideo(params: VideoParams): Promise<Video>
    publishVideo(id: string): Promise<Video>
    unpublishVideo(id: string): Promise<Video>
    findVideoById(id: string): Promise<Video>
    findPublishedVideos(): Promise<Video[]>
    findVideosByCreatorId(creatorId: string): Promise<Video[]>

    // Likes.
    findLikedVideosByCreatorId(creatorId: string): Promise<Video[]>

    // Follows.
    findFollowingByCreatorId(creatorId: string): Promise<unknown[]>
    findFollowersByCreatorId(creatorId: string): Promise<unknown[]>
}

export default class AssetManager implements IAssetManager {

    private repository: IVideoRepository;

    public constructor(repository: IVideoRepository) {
        this.repository = repository;
    }

    addCreator(): Promise<unknown> {
        throw new Error("Method not implemented.");
    }

    async addVideo(params: VideoParams): Promise<Video> {
        return await this.repository.create(params);
    }

    async publishVideo(id: string): Promise<Video> {
        const video = await this.repository.getById(id);
        video.publish();
        return await this.repository.save(video);
    }

    async unpublishVideo(id: string): Promise<Video> {
        const video = await this.repository.getById(id);
        video.unpublish();
        return await this.repository.save(video);
    }

    findCreatorByEmail(email: string): Promise<unknown> {
        throw new Error("Method not implemented.");
    }

    findCreatorById(id: string): Promise<unknown> {
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
