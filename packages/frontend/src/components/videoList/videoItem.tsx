import { ReactElement } from "react";
import { Video } from "../../types";
import { Link } from "react-router-dom";
import Config from "../../../config";
import CreatorIcon from "../creatorIcon";

interface Props {
    video: Video,
    showBadge?: boolean
}

const VideoItem = (props: Props): ReactElement => {
    return (
        <div className="relative">
            {props.showBadge ? (
                <span
                    className={`absolute z-50 top-4 right-4 border border-indigo-500/10 text-white py-1 px-2.5 text-xs font-semibold rounded ${props.video.isPublished ? "bg-indigo-500" : "bg-gray-800"}`}
                >
                    {props.video.isPublished ? "Published" : "Unpublished"}
                </span>
            ) : undefined}
            <Link to={Config.LINKS.VIDEO_PAGE(props.video.id)} className="space-y-6 group">
                <img
                    src="https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg"
                    alt="Video alt"
                    className="border border-indigo-400/10 rounded-lg shadow-xl group-hover:shadow-2xl
                        group-hover:shadow-black/40 transition-all group-hover:opacity-70"
                />
                <div>
                    <h4 className="text-white group-hover:text-indigo-400 transition-colors">{props.video.title}</h4>
                    <p className="text-slate-400 mt-2 text-sm line-clamp-2">{props.video.description}</p>
                </div>
            </Link>
            <div className="flex items-center justify-between mt-4">
                <CreatorIcon creator={props.video.creator} />
                <small className="text-slate-400">{new Date(props.video.createdAt).toLocaleString()}</small>
            </div>
        </div>
    );
};

export default VideoItem;
