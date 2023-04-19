import { Router } from "express";
import {
    PostUserCreateHandler,
    GetCreatorByIdHandler,
    GetVideosHandler,
    GetVideoByIdHandler,
    PostVideoHandler,
    PatchVideoHandler,
    PublishVideoHandler,
    UnpublishVideoHandler,
    GetVideosByCreatorId,
    PostUserLoginHandler
} from "./handlers";
import asyncHandler from "express-async-handler";
import { secured } from "./middlewares";

const MainRouter = Router();

// User Routes.
MainRouter.post("/user", asyncHandler(PostUserCreateHandler));
MainRouter.post("/user/login", asyncHandler(PostUserLoginHandler));

// Creator Routes.
MainRouter.get("/creators/:creatorId", asyncHandler(GetCreatorByIdHandler));
MainRouter.get("/creators/:creatorId/videos", asyncHandler(GetVideosByCreatorId));

// Videos Routes.
MainRouter.get("/videos", asyncHandler(GetVideosHandler));
MainRouter.post("/videos", secured, asyncHandler(PostVideoHandler));
MainRouter.patch("/videos/:videoId", secured, asyncHandler(PatchVideoHandler));
MainRouter.get("/videos/:videoId", asyncHandler(GetVideoByIdHandler));
MainRouter.patch("/videos/:videoId/publish", secured, asyncHandler(PublishVideoHandler));
MainRouter.patch("/videos/:videoId/unpublish", secured, asyncHandler(UnpublishVideoHandler));

export default MainRouter;
