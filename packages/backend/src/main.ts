import DomainVideoRepo from "./persistence/repositories/videoRepository";
import AssetManager from "./domain/video/assetManager";

const manager = new AssetManager(DomainVideoRepo);

const savedVideo = await manager.addVideo({
    videoUrl: "https://xaes.dev",
    title: "My first video",
    description: "Some nice vid",
});

const publishedVideo = await manager.publishVideo(savedVideo.id);
await manager.unpublishVideo(publishedVideo.id);
