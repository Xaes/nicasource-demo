/* eslint-disable @typescript-eslint/no-unused-vars */
import { FindOptions } from "sequelize";
import { Creator, CreatorParams, CreatorAttributes } from "../../src/domain/video/entities/creator";
import { Video, VideoAttributes, VideoParams } from "../../src/domain/video/entities/video";
import { ICreatorRepository } from "../../src/persistence/repositories/creatorRepository";
import { IVideoRepository } from "../../src/persistence/repositories/videoRepository";

export class InMemoryVideoRepository implements IVideoRepository {
    private videos: Video[] = [];
    private idCounter = 1;

    async delete(video: Video): Promise<void> {
        const index = this.videos.findIndex((v) => v.id === video.id);
        if (index !== -1) {
            this.videos.splice(index, 1);
        }
        return Promise.resolve();
    }

    async exists(id: string): Promise<boolean> {
        return Promise.resolve(this.videos.some((v) => v.id === id));
    }

    async getById(id: string): Promise<Video> {
        const video = this.videos.find((v) => v.id === id);
        if (!video) {
            throw new Error(`Video with ID ${id} was not found.`);
        }
        return Promise.resolve(video);
    }

    async save(video: Video): Promise<Video> {
        const index = this.videos.findIndex((v) => v.id === video.id);
        if (index !== -1) {
            this.videos.splice(index, 1, video);
        } else {
            video.id = String(this.idCounter++);
            this.videos.push(video);
        }
        return Promise.resolve(video);
    }

    async findAll(): Promise<Video[]> {
        return Promise.resolve(this.videos);
    }

    findOne(options: FindOptions<VideoAttributes>): Promise<Video | null> {
        return Promise.resolve(this.videos[0]);
    }

    async create(params: VideoParams): Promise<Video> {
        const video = new Video(params);
        this.videos.push(video);
        return Promise.resolve(video);
    }
}

export class InMemoryCreatorRepository implements ICreatorRepository {
    private creators: Creator[] = [];
    private idCounter = 1;

    exists(id: string): Promise<boolean> {
        return Promise.resolve(this.creators.some((c) => c.id === id));
    }
    delete(model: Creator): Promise<void> {
        const index = this.creators.findIndex((c) => c.id === model.id);
        if (index !== -1) {
            this.creators.splice(index, 1);
        }
        return Promise.resolve();
    }
    getById(id: string): Promise<Creator> {
        const creator = this.creators.find((c) => c.id === id);
        if (!creator) {
            throw new Error(`Creator with ID ${id} was not found.`);
        }
        return Promise.resolve(creator);
    }
    save(model: Creator): Promise<Creator> {
        const index = this.creators.findIndex((c) => c.id === model.id);
        if (index !== -1) {
            this.creators.splice(index, 1, model);
        } else {
            model.id = String(this.idCounter++);
            this.creators.push(model);
        }
        return Promise.resolve(model);
    }

    create(params: CreatorParams): Promise<Creator> {
        const creator = new Creator(params);
        this.creators.push(creator);
        return Promise.resolve(creator);
    }

    findAll(options: FindOptions<CreatorAttributes>): Promise<Creator[]> {
        return Promise.resolve(this.creators);
    }

    findOne(options: FindOptions<CreatorAttributes>): Promise<Creator | null> {
        return Promise.resolve(this.creators[0]);
    }

}