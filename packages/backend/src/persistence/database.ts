import { Sequelize } from "sequelize-typescript";
import Config from "../../config/config";
import { Video } from "../domain/video/entities/video";
import { Creator } from "../domain/video/entities/creator";
import {Follow} from "../domain/video/entities/follow";

const SequelizeClient = new Sequelize(Config.DB.NAME, Config.DB.USER, Config.DB.PASSWORD, {
    host: Config.DB.HOST,
    dialect: "postgres",
    pool: {
        min: 1,
        max: Config.DB.POOL_MAX
    },
    define: {
        timestamps: true
    },
    models: [Video, Creator, Follow],
    repositoryMode: true,
});

export default SequelizeClient;
