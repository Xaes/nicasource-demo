import { Router } from "express";
import {
    PostCreatorHandler,
    GetCreatorByIdHandler,
    GetVideosHandler,
    GetVideoByIdHandler,
    PostVideoHandler,
    PublishVideoHandler,
    UnpublishVideoHandler,
    GetVideosByCreatorId
} from "./handlers";
import asyncHandler from "express-async-handler";

const MainRouter = Router();

// Creator Routes.
MainRouter.post("/creators", asyncHandler(PostCreatorHandler));
MainRouter.get("/creators/:creatorId", asyncHandler(GetCreatorByIdHandler));
MainRouter.get("/creators/:creatorId/videos", asyncHandler(GetVideosByCreatorId));
MainRouter.patch("/creators/:creatorId/videos/:videoId/publish", asyncHandler(PublishVideoHandler));
MainRouter.patch("/creators/:creatorId/videos/:videoId/unpublish", asyncHandler(UnpublishVideoHandler));

// Videos Routes.
MainRouter.get("/videos", asyncHandler(GetVideosHandler));
MainRouter.get("/videos/:videoId", asyncHandler(GetVideoByIdHandler));
MainRouter.post("/videos", asyncHandler(PostVideoHandler));

export default MainRouter;
