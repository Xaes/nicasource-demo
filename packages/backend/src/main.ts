import VideoAggregate from "./persistence/repositories/videoRepository";
import AssetManager from "./domain/video/assetManager";
import CreatorAggregate from "./persistence/repositories/creatorRepository";

const manager = new AssetManager(CreatorAggregate, VideoAggregate);

const savedCreator = await manager.addCreator({
    name: "Diego Balmaceda",
    email: "diego@xaes.dev"
});

const savedVideo = await manager.addVideo({
    videoUrl: "https://xaes.dev",
    title: "My first video",
    description: "Some nice vid",
    creatorId: savedCreator.id
});

const publishedVideo = await manager.publishVideo(savedVideo.id);
await manager.unpublishVideo(publishedVideo.id);
