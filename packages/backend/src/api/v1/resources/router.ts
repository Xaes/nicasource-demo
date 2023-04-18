import { Router } from "express";
import {
    PostCreatorHandler,
    GetCreatorByIdHandler,
    GetVideosHandler,
    GetVideoByIdHandler,
    PostVideoHandler, PublishVideoHandler, UnpublishVideoHandler, GetVideosByCreatorId
} from "./handlers";

const MainRouter = Router();

// Creator Routes.
MainRouter.post("/creators", PostCreatorHandler);
MainRouter.get("/creators/:creatorId", GetCreatorByIdHandler);
MainRouter.get("/creators/:creatorId/videos", GetVideosByCreatorId);
MainRouter.patch("/creators/:creatorId/videos/:videoId/publish", PublishVideoHandler);
MainRouter.patch("/creators/:creatorId/videos/:videoId/unpublish", UnpublishVideoHandler);

// Videos Routes.
MainRouter.get("/videos", GetVideosHandler);
MainRouter.get("/videos/:videoId", GetVideoByIdHandler);
MainRouter.post("/videos", PostVideoHandler);

export default MainRouter;
