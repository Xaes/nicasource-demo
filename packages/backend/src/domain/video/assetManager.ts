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
    findPublishedVideosByCreatorId(creatorId: string): Promise<Video[]>
    findAllVideosByCreatorId(creatorId: string): Promise<Video[]>
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
        } else {
            return await this.videoRepository.create(params);
        }
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
