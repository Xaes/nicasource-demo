import { Sequelize } from "sequelize";
import Config from "../../config/config";

const SequelizeClient = new Sequelize(Config.DB.NAME, Config.DB.USER, Config.DB.PASSWORD, {
    host: Config.DB.HOST,
    dialect: "postgres",
    pool: {
        min: 1,
        max: Config.DB.POOL_MAX
    },
    define: {
        timestamps: true
    }
});

export default SequelizeClient;
