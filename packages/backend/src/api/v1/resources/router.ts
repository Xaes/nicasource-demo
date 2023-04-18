import { Router } from "express";
import {
    PostUserCreateHandler,
    GetCreatorByIdHandler,
    GetVideosHandler,
    GetVideoByIdHandler,
    PostVideoHandler,
    PublishVideoHandler,
    UnpublishVideoHandler,
    GetVideosByCreatorId,
    PostUserLoginHandler
} from "./handlers";
import asyncHandler from "express-async-handler";
import { authenticateJWT } from "./middlewares";

const MainRouter = Router();

// User Routes.
MainRouter.post("/user", asyncHandler(PostUserCreateHandler));
MainRouter.post("/user/login", asyncHandler(PostUserLoginHandler));

// Creator Routes.
MainRouter.get("/creators/:creatorId", asyncHandler(GetCreatorByIdHandler));
MainRouter.get("/creators/:creatorId/videos", asyncHandler(GetVideosByCreatorId));

// Videos Routes.
MainRouter.get("/videos", asyncHandler(GetVideosHandler));
MainRouter.post("/videos", authenticateJWT, asyncHandler(PostVideoHandler));
MainRouter.get("/videos/:videoId", asyncHandler(GetVideoByIdHandler));
MainRouter.patch("/videos/:videoId/publish", authenticateJWT, asyncHandler(PublishVideoHandler));
MainRouter.patch("/videos/:videoId/unpublish", authenticateJWT, asyncHandler(UnpublishVideoHandler));

export default MainRouter;
