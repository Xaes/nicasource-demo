import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIOkMultipleResponse, Video } from "../../types";
import AxiosClient from "../../axios";

export const fetchAllPublishedVideos = createAsyncThunk<APIOkMultipleResponse<Video>>(
    "Video/FetchVideo",
    async () => (await AxiosClient.get("/videos")).data
);
