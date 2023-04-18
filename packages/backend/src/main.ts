import server from "./api/server";
import Config from "../config/config";

server.listen(Config.API.PORT, () => {
    console.log(`🚀 Express Server Listening at port: ${Config.API.PORT}`)
});
