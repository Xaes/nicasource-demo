import { IRepository } from "../../domain/common/repository";
import { Video, VideoModel, VideoParams } from "../../domain/video/entities/video";
import DomainException from "../../domain/common/exception";
import { Attributes, FindOptions } from "sequelize";

export type IVideoRepository = IRepository<Video, FindOptions<Attributes<Video>>, VideoParams>

export class VideoRepository implements IVideoRepository {
    private model: typeof Video = VideoModel;

    async delete(video: Video): Promise<void> {
        await this.model.destroy({ where: { id: video.id } });
    }

    async exists(id: string): Promise<boolean> {
        const result = await this.model.findOne({ where: { id } });
        return !!result;
    }

    async getById(id: string): Promise<Video> {
        const entity = await this.model.findByPk(id);
        if (!entity) throw new DomainException(`Video with ID ${id} was not found.`);
        else return entity;
    }

    async save(model: Video): Promise<Video> {
        return await model.save();
    }

    async findAll(options: FindOptions<Attributes<Video>>): Promise<Video[]> {
        return await this.model.findAll(options);
    }

    async findOne(options: FindOptions<Attributes<Video>>): Promise<Video | null> {
        return await this.model.findOne(options);
    }

    async create(params: VideoParams): Promise<Video> {
        return await this.model.create(params);
    }
}

const VideoAggregate = new VideoRepository();
export default VideoAggregate;
