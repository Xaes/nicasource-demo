import { ReactElement } from "react";
import VideoItem from "./videoItem";

const VideoList = (): ReactElement => {
    return (
        <div className="grid grid-cols-12 gap-12">
            <div className="col-span-3">
                <VideoItem />
            </div>
            <div className="col-span-3">
                <VideoItem />
            </div>
            <div className="col-span-3">
                <VideoItem />
            </div>
        </div>
    )
}

export default VideoList;
