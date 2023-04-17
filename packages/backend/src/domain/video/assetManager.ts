import { Video, VideoParams } from "./entities/video";
import { IVideoRepository } from "../../persistence/repositories/videoRepository";
import { ICreatorRepository } from "../../persistence/repositories/creatorRepository";
import { Creator, CreatorParams } from "./entities/creator";
import DomainException from "../common/exception";

export interface IAssetManager {
    // Creators.
    addCreator(params: CreatorParams): Promise<Creator>;
    findCreatorById(id: string): Promise<Creator>;
    findCreatorByEmail(email: string): Promise<Creator>;

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

    private videoRepository: IVideoRepository;
    private creatorRepository: ICreatorRepository;

    public constructor(creatorRepository: ICreatorRepository, videoRepository: IVideoRepository) {
        this.videoRepository = videoRepository;
        this.creatorRepository = creatorRepository;
    }

    async addCreator(params: CreatorParams): Promise<Creator> {
        return await this.creatorRepository.create(params);
    }

    async addVideo(params: VideoParams): Promise<Video> {
        if (!(await this.creatorRepository.exists(params.creatorId))) {
            throw new DomainException(`Creator with ID ${params.creatorId} does not exist`);
        } else return await this.videoRepository.create(params);
    }

    async publishVideo(id: string): Promise<Video> {
        const video = await this.videoRepository.getById(id);
        video.publish();
        return await this.videoRepository.save(video);
    }

    async unpublishVideo(id: string): Promise<Video> {
        const video = await this.videoRepository.getById(id);
        video.unpublish();
        return await this.videoRepository.save(video);
    }

    findCreatorByEmail(email: string): Promise<Creator> {
        throw new Error("Method not implemented.");
    }

    findCreatorById(id: string): Promise<Creator> {
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
