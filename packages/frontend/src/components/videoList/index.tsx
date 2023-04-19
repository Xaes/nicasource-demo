import { ReactElement } from "react";
import VideoItem from "./videoItem";
import { Video } from "../../types";

interface Props {
    videos: Video[];
}

const VideoList = (props: Props): ReactElement => {
    return (
        <div className="grid grid-cols-12 gap-12">
            {props.videos.map(video => (
                <div className="col-span-3" key={video.id}>
                    <VideoItem {...video} />
                </div>
            ))}
        </div>
    );
};

export default VideoList;
