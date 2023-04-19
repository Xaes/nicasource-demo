import { APIOkResponse, sendOkResponse, TypedRequest, TypedResponse } from "../../types";
import { Creator } from "../../../domain/video/entities/creator";
import AssetManager from "../../../domain/video/assetManager";
import { Video } from "../../../domain/video/entities/video";
import { AddCreatorParams, CreateVideoParams, CreatorIdParam, LoginParams, PatchVideoParams, VideoIdParam } from "./model";
import Auth from "../../../domain/auth/auth";
import { SessionToken } from "../../../domain/auth/entities/sessiontoken";

export const GetCreatorByIdHandler = async (request: TypedRequest<object, CreatorIdParam>, response: TypedResponse<APIOkResponse<Creator>>): Promise<void> => {
    const creator = await AssetManager.findCreatorById(request.params.creatorId);
    sendOkResponse<Creator>(response, creator);
};

export const PostUserCreateHandler = async (request: TypedRequest<AddCreatorParams>, response: TypedResponse<APIOkResponse<Creator>>): Promise<void> => {
    // TODO: Add transactional control. If addCredential fails, creator will still be created.
    const newCreator = await AssetManager.addCreator(request.body.creator);
    await Auth.addCredential({ ...request.body.credential, userId: newCreator.id });
    sendOkResponse<Creator>(response, newCreator);
};

export const PostUserLoginHandler = async (request: TypedRequest<LoginParams>, response: TypedResponse<APIOkResponse<SessionToken>>): Promise<void> => {
    const user = await AssetManager.findCreatorByEmail(request.body.email);
    const accessToken = await Auth.authenticate(user, request.body.credentialType, request.body.challenge);
    sendOkResponse<SessionToken>(response, accessToken);
};

export const GetVideosHandler = async (request: TypedRequest, response: TypedResponse<APIOkResponse<Video>>): Promise<void> => {
    const videoList = await AssetManager.findPublishedVideos();
    sendOkResponse<Video>(response, videoList);
};

export const GetVideoByIdHandler = async (request: TypedRequest<object, VideoIdParam>, response: TypedResponse<APIOkResponse<Video>>): Promise<void> => {
    const video = await AssetManager.findVideoById(request.params.videoId);
    sendOkResponse<Video>(response, video);
};

export const GetVideosByCreatorId = async(request: TypedRequest<object, CreatorIdParam>, response: TypedResponse<APIOkResponse<Video>>): Promise<void> => {
    const videos = await AssetManager.findAllVideosByCreatorId(request.params.creatorId);
    sendOkResponse<Video>(response, videos);
};

export const PostVideoHandler = async (request: TypedRequest<CreateVideoParams>, response: TypedResponse<APIOkResponse<Video>>): Promise<void> => {
    const newVideo = await AssetManager.addVideo({
        ...request.body,
        creatorId: request.session?.userId as string
    });
    sendOkResponse<Video>(response, newVideo);
};

export const PatchVideoHandler = async (request: TypedRequest<PatchVideoParams, VideoIdParam>, response: TypedResponse<APIOkResponse<Video>>): Promise<void> => {
    const updatedVideo = await AssetManager.updateVideo(request.params.videoId, request.body);

    sendOkResponse<Video>(response, updatedVideo);
};

export const PublishVideoHandler = async (request: TypedRequest<object, VideoIdParam>, response: TypedResponse<APIOkResponse<Video>>): Promise<void> => {
    if (request.session) {
        const publishedVideo = await AssetManager.publishVideo(request.session.userId, request.params.videoId);
        sendOkResponse<Video>(response, publishedVideo);
    }
};

export const UnpublishVideoHandler = async (request: TypedRequest<object, VideoIdParam>, response: TypedResponse<APIOkResponse<Video>>): Promise<void> => {
    if (request.session) {
        const publishedVideo = await AssetManager.unpublishVideo(request.session.userId, request.params.videoId);
        sendOkResponse<Video>(response, publishedVideo);
    }
};
