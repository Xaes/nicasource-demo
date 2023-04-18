import { Video, VideoParams } from "./entities/video";
import VideoAggregate, { IVideoRepository } from "../../persistence/repositories/videoRepository";
import CreatorAggregate, { ICreatorRepository } from "../../persistence/repositories/creatorRepository";
import { Creator, CreatorParams } from "./entities/creator";
import DomainException from "../common/exception";

export interface IAssetManager {
    // Creators.
    addCreator(params: CreatorParams): Promise<Creator>;
    findCreatorById(id: string): Promise<Creator>;
    findCreatorByEmail(email: string): Promise<Creator>;

    // Videos.
    addVideo(params: VideoParams): Promise<Video>
    publishVideo(creatorId: string, videoId: string): Promise<Video>
    unpublishVideo(creatorId: string, videoId: string): Promise<Video>
    findVideoById(id: string): Promise<Video>
    findPublishedVideos(): Promise<Video[]>
    findPublishedVideosByCreatorId(creatorId: string): Promise<Video[]>
    findAllVideosByCreatorId(creatorId: string): Promise<Video[]>
}

export class AssetManager implements IAssetManager {

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
        } else {
            return await this.videoRepository.create(params);
        }
    }

    async publishVideo(creatorId: string, videoId: string): Promise<Video> {
        const video = await this.videoRepository.findOne({
            where: { id: videoId, creatorId }
        });
        if (video) {
            video.publish();
            return await this.videoRepository.save(video);
        }
        throw new DomainException(`Video with ID ${videoId} and Creator ID ${creatorId} does not exists.`);
    }

    async unpublishVideo(creatorId: string, videoId: string): Promise<Video> {
        const video = await this.videoRepository.findOne({
            where: { id: videoId, creatorId }
        });
        if (video) {
            video.unpublish();
            return await this.videoRepository.save(video);
        }
        throw new DomainException(`Video with ID ${videoId} and Creator ID ${creatorId} does not exists.`);
    }

    async findCreatorByEmail(email: string): Promise<Creator> {
        const result = await this.creatorRepository.findOne({ where: { email } });
        if (!result) throw new DomainException(`Creator with email ${email} not found.`);
        else return result;
    }

    async findCreatorById(id: string): Promise<Creator> {
        return await this.creatorRepository.getById(id);
    }

    async findPublishedVideos(): Promise<Video[]> {
        return await this.videoRepository.findAll({ where: { isPublished: true } });
    }

    async findVideoById(id: string): Promise<Video> {
        return await this.videoRepository.getById(id);
    }

    async findPublishedVideosByCreatorId(creatorId: string): Promise<Video[]> {
        return await this.videoRepository.findAll({
            where: { creatorId, isPublished: true }
        });
    }

    async findAllVideosByCreatorId(creatorId: string): Promise<Video[]> {
        return await this.videoRepository.findAll({ where: { creatorId } });
    }
}

const manager = new AssetManager(CreatorAggregate, VideoAggregate);
export default manager;
