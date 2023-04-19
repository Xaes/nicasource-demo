import { combineReducers } from "@reduxjs/toolkit";
import VideoReducer from "./video";
export interface GenericState {
    error?: string,
    status: "loading" | "finished" | "error" | "initialized";
    selectedEntity?: string;
}

const RootReducer = combineReducers({
    Video: VideoReducer
});

export type RootState = ReturnType<typeof RootReducer>;
export default RootReducer;
