import VideoAggregate from "./persistence/repositories/videoRepository";
import AssetManager from "./domain/video/assetManager";
import CreatorAggregate from "./persistence/repositories/creatorRepository";

const manager = new AssetManager(CreatorAggregate, VideoAggregate);

const creator1 = await manager.addCreator({
    name: "Diego Balmaceda",
    email: "diego@xaes.dev"
});

const creator2 = await manager.addCreator({
    name: "Juan Alejandro",
    email: "juan@xaes.dev"
});

const savedVideo = await manager.addVideo({
    videoUrl: "https://xaes.dev",
    title: "My first video",
    description: "Some nice vid",
    creatorId: creator1.id
});

await manager.publishVideo(savedVideo.id);
await creator1.follow(creator2.id);
await savedVideo.like(creator1.id);

console.log(JSON.stringify(await manager.findVideoById(savedVideo.id), null, 4));
console.log(JSON.stringify(await manager.findCreatorById(creator1.id), null, 4));
