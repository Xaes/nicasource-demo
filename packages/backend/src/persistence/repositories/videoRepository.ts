import {IRepository} from "../../domain/common/repository";
import {Video, VideoParams} from "../../domain/video/entities/video";
import DomainException from "../../domain/common/exception";
import SequelizeClient from "../database";

export interface IVideoRepository extends IRepository<VideoParams, Video> {

}

export class VideoRepository implements IVideoRepository {
    private sequelizeRepository = SequelizeClient.getRepository(Video);

    async create(params: VideoParams): Promise<Video> {
        return await this.sequelizeRepository.create(params);
    }

    async delete(video: Video): Promise<void> {
        await this.sequelizeRepository.destroy({
            where: { id: video.id }
        });
    }

    async exists(video: Video): Promise<boolean> {
        const result = await this.sequelizeRepository.findOne({
            where: { id: video.id }
        });
        return !!result;
    }

    async getById(id: string): Promise<Video> {
        const entity = await this.sequelizeRepository.findByPk(id);
        if (!entity) throw new DomainException(`Video with ID ${id} was not found.`);
        else return entity;
    }

    async save(video: Video): Promise<Video> {
        return await video.save();
    }
}

const DomainVideoRepo = new VideoRepository();
export default DomainVideoRepo;
