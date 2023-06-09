import { ReactElement } from "react";
import VideoItem from "./videoItem";
import { Video } from "../../types";

interface Props {
    videos: Video[];
    showBadges?: boolean;
}

const VideoList = (props: Props): ReactElement => {
    return (
        <div className="grid grid-cols-12 gap-y-16 gap-x-12">
            {props.videos.map(video => (
                <div className="col-span-3" key={video.id}>
                    <VideoItem video={video} showBadge={props.showBadges} />
                </div>
            ))}
        </div>
    );
};

export default VideoList;
