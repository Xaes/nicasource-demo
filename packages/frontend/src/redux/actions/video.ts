import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIOkMultipleResponse, APIOkSingleResponse, CreateVideoParams, Video } from "../../types";
import AxiosClient from "../../axios";

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
