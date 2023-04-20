import { AssetManager } from "../../src/domain/video/assetManager";
import { InMemoryCreatorRepository, InMemoryVideoRepository } from "./repositories";

describe("Asset Manager entity", () => {

    const creatorRepository = new InMemoryCreatorRepository();
    const videoRepository = new InMemoryVideoRepository();

    it("should be able to instantiate a new asset manager", () => {
        const manager = new AssetManager(creatorRepository, videoRepository);
        expect(manager).toBeTruthy();
    });

    it("should add a new creator", async () => {
        const manager = new AssetManager(creatorRepository, videoRepository);
        const creator = await manager.addCreator({
            email: "test@gmail.com",
            name: "Test",
        });
        expect(creator).toBeTruthy();
    });

    it("should add a new video", async () => {
        const manager = new AssetManager(creatorRepository, videoRepository);
        const creator = await manager.findCreatorByEmail("test@gmail.com");
        const video = await manager.addVideo({
            title: "Test",
            description: "Test",
            videoUrl: "https://www.youtube.com/watch?v=1",
            creatorId: creator.id,
        });
        expect(video).toBeTruthy();
    });

    it("should update a video", async () => {
        const manager = new AssetManager(creatorRepository, videoRepository);
        const creator = await manager.findCreatorByEmail("test@gmail.com");
        const video = await manager.addVideo({
            title: "Test",
            description: "Test",
            videoUrl: "https://www.youtube.com/watch?v=1",
            creatorId: creator.id,
        });
        expect(video).toBeTruthy();

        const updatedVideo = await manager.updateVideo(video.id, {
            title: "Test 2",
            description: "Test 2",
            videoUrl: "https://www.youtube.com/watch?v=2",
        });
        expect(updatedVideo).toBeTruthy();
        expect(updatedVideo.title).toBe("Test 2");
        expect(updatedVideo.description).toBe("Test 2");
        expect(updatedVideo.videoUrl).toBe("https://www.youtube.com/watch?v=2");
    });

    it("should publish and unpublish video", async () => {
        const manager = new AssetManager(creatorRepository, videoRepository);
        const creator = await manager.findCreatorByEmail("test@gmail.com");
        const video = await manager.addVideo({
            title: "Test",
            description: "Test",
            videoUrl: "https://www.youtube.com/watch?v=1",
            creatorId: creator.id,
        });
        expect(video).toBeTruthy();

        const publishedVideo = await manager.publishVideo(creator.id, video.id);
        expect(publishedVideo).toBeTruthy();
        expect(publishedVideo.isPublished).toBeTruthy();

        const unpublishedVideo = await manager.unpublishVideo(creator.id, video.id);
        expect(unpublishedVideo).toBeTruthy();
        expect(unpublishedVideo.isPublished).toBeFalsy();
    });
});
