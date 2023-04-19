import { createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Video } from "../../types";
import { GenericState, RootState } from "./index";
import { fetchAllPublishedVideos, fetchPublishedVideoById } from "../actions/video";

export const VideoAdapter = createEntityAdapter<Video>({
    selectId: (model: Video) => model.id
});

export const VideoInitialState = VideoAdapter.getInitialState<GenericState>({
    status: "initialized"
});

export const VideoSlice = createSlice({
    name: "Video",
    initialState: VideoInitialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAllPublishedVideos.fulfilled, (state, { payload }): void => {
                VideoAdapter.addMany(state, payload.data);
                state.status = "finished";
            })
            .addCase(fetchPublishedVideoById.fulfilled, (state, { payload }): void => {
                VideoAdapter.addOne(state, payload.data);
                state.status = "finished";
            })
            .addMatcher(
                isAnyOf(
                    fetchAllPublishedVideos.pending,
                    fetchPublishedVideoById.pending
                ),
                (state) => {
                    state.status = "loading";
                }
            )
            .addMatcher(
                isAnyOf(
                    fetchAllPublishedVideos.rejected,
                    fetchPublishedVideoById.rejected
                ),
                (state, payload) => {
                    state.status = "error";
                    console.log(payload);
                }
            );
    }
});

export const { selectById, selectIds, selectEntities, selectAll, selectTotal } =
    VideoAdapter.getSelectors<RootState>((state) => state.Video);

export default VideoSlice.reducer;
