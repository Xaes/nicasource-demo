import SequelizeClient from "./database";
import { Video } from "../domain/video/entities/video";

export const VideoRepository = SequelizeClient.getRepository(Video);
