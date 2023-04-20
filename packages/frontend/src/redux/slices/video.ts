import { createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Video } from "../../types";
import { GenericState, RootState } from "./index";
import {
    addVideo,
    fetchAllPublishedVideos,
    fetchAllVideosByCreatorId,
    fetchPublishedVideoById, publishVideo, unpublishVideo, updateVideo
} from "../actions/video";

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
            .addCase(fetchAllVideosByCreatorId.fulfilled, (state, { payload }): void => {
                VideoAdapter.addMany(state, payload.data);
                state.status = "finished";
            })
            .addCase(updateVideo.fulfilled, (state, { payload }): void => {
                VideoAdapter.updateOne(state, { id: payload.data.id, changes: payload.data });
                state.status = "finished";
            })
            .addCase(addVideo.fulfilled, (state): void => {
                state.status = "finished";
            })
            .addCase(publishVideo.fulfilled, (state, { payload }): void => {
                VideoAdapter.updateOne(state, { id: payload.data.id, changes: payload.data });
                state.status = "finished";
            })
            .addCase(unpublishVideo.fulfilled, (state, { payload }): void => {
                VideoAdapter.updateOne(state, { id: payload.data.id, changes: payload.data });
                state.status = "finished";
            })
            .addMatcher(
                isAnyOf(
                    fetchAllPublishedVideos.pending,
                    fetchPublishedVideoById.pending,
                    addVideo.pending,
                    updateVideo.pending,
                    publishVideo.pending,
                    unpublishVideo.pending
                ),
                (state) => {
                    state.status = "loading";
                }
            )
            .addMatcher(
                isAnyOf(
                    fetchAllPublishedVideos.rejected,
                    fetchPublishedVideoById.rejected,
                    addVideo.rejected,
                    updateVideo.rejected,
                    publishVideo.rejected,
                    unpublishVideo.rejected
                ),
                (state) => {
                    state.status = "error";
                }
            );
    }
});

export const { selectById, selectIds, selectEntities, selectAll, selectTotal } =
    VideoAdapter.getSelectors<RootState>((state) => state.Video);

export default VideoSlice.reducer;
