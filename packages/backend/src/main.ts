import { VideoRepository } from "./persistence/sequelizeRepository";

const newVideo = VideoRepository.create({ description: "Some video description", title: "Me at the Zoo!", videoUrl: "https://xaes.dev" });
