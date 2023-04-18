import { APIOkResponse, sendOkResponse, TypedRequest, TypedResponse } from "../../types";
import { Creator } from "../../../domain/video/entities/creator";
import AssetManager from "../../../domain/video/assetManager";
import { Video, VideoParams } from "../../../domain/video/entities/video";
import { AddCreatorParams } from "./model";
import Auth from "../../../domain/auth/auth";

export const GetCreatorByIdHandler = async (request: TypedRequest<object, { creatorId: string }>, response: TypedResponse<APIOkResponse<Creator>>): Promise<void> => {
    const creator = await AssetManager.findCreatorById(request.params.creatorId);
    sendOkResponse<Creator>(response, creator);
};

export const PostCreatorHandler = async (request: TypedRequest<AddCreatorParams>, response: TypedResponse<APIOkResponse<Creator>>): Promise<void> => {
    // TODO: Add transactional control. If addCredential fails, creator will still be created.
    const newCreator = await AssetManager.addCreator(request.body.creator);
    await Auth.addCredential({ ...request.body.credential, userId: newCreator.id });
    sendOkResponse<Creator>(response, newCreator);
};

export const GetVideosHandler = async (request: TypedRequest, response: TypedResponse<APIOkResponse<Video>>): Promise<void> => {
    const videoList = await AssetManager.findPublishedVideos();
    sendOkResponse<Video>(response, videoList);
};

export const GetVideoByIdHandler = async (request: TypedRequest<object, { videoId: string}>, response: TypedResponse<APIOkResponse<Video>>): Promise<void> => {
    const video = await AssetManager.findVideoById(request.params.videoId);
    sendOkResponse<Video>(response, video);
};

export const GetVideosByCreatorId = async(request: TypedRequest<object, { creatorId: string }>, response: TypedResponse<APIOkResponse<Video>>): Promise<void> => {
    const videos = await AssetManager.findAllVideosByCreatorId(request.params.creatorId);
    sendOkResponse<Video>(response, videos);
};

export const PostVideoHandler = async (request: TypedRequest<VideoParams>, response: TypedResponse<APIOkResponse<Video>>): Promise<void>=> {
    const newVideo = await AssetManager.addVideo(request.body);
    sendOkResponse<Video>(response, newVideo);
};

export const PublishVideoHandler = async (request: TypedRequest<object, { creatorId: string, videoId: string }>, response: TypedResponse<APIOkResponse<Video>>): Promise<void> => {
    // TODO: Check from JWT Context if passed ID via creatorId is equal to JWT ID.
    const publishedVideo = await AssetManager.publishVideo(request.params.creatorId, request.params.videoId);
    sendOkResponse<Video>(response, publishedVideo);
};

export const UnpublishVideoHandler = async (request: TypedRequest<object, { creatorId: string, videoId: string }>, response: TypedResponse<APIOkResponse<Video>>): Promise<void> => {
    // TODO: Check from JWT Context if passed ID via creatorId is equal to JWT ID.
    const publishedVideo = await AssetManager.unpublishVideo(request.params.creatorId, request.params.videoId);
    sendOkResponse<Video>(response, publishedVideo);
};
