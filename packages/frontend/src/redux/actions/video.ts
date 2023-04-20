import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIOkMultipleResponse, APIOkSingleResponse, CreateVideoParams, UpdateVideoParams, Video } from "../../types";
import AxiosClient from "../../axios";

export const fetchAllVideosByCreatorId = createAsyncThunk<APIOkMultipleResponse<Video>, string>(
    "Video/fetchAllVideosByCreatorId",
    async (creatorId) => (await AxiosClient.get<APIOkMultipleResponse<Video>>(`/creators/${creatorId}/videos`)).data
);

export const fetchAllPublishedVideos = createAsyncThunk<APIOkMultipleResponse<Video>>(
    "Video/FetchPublishedVideos",
    async () => (await AxiosClient.get<APIOkMultipleResponse<Video>>("/videos")).data
);

export const fetchPublishedVideoById = createAsyncThunk<APIOkSingleResponse<Video>, string>(
    "Video/FetchPublishedVideo",
    async (id: string) => (await AxiosClient.get<APIOkSingleResponse<Video>>(`/videos/${id}`)).data
);

export const addVideo = createAsyncThunk<APIOkSingleResponse<Video>, CreateVideoParams>(
    "Video/CreateVideo",
    async (params: CreateVideoParams) => (await AxiosClient.post<APIOkSingleResponse<Video>>("/videos", params)).data
);

export const updateVideo = createAsyncThunk<APIOkSingleResponse<Video>, UpdateVideoParams>(
    "Video/UpdateVideo",
    async (params: UpdateVideoParams) => (await AxiosClient.patch(`/videos/${params.id}`, params)).data
)

export const publishVideo = createAsyncThunk<APIOkSingleResponse<Video>, string>(
    "Video/PublishVideo",
    async (videoId: string) => (await AxiosClient.patch(`/videos/${videoId}/publish`)).data
);

export const unpublishVideo = createAsyncThunk<APIOkSingleResponse<Video>, string>(
    "Video/UnpublishVideo",
    async (videoId: string) => (await AxiosClient.patch(`/videos/${videoId}/unpublish`)).data
)

