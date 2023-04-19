import { ReactElement } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { Video } from "../../types";
import { Link } from "react-router-dom";
import Config from "../../../config";
import CreatorIcon from "../creatorIcon";

const VideoItem = (props: Video): ReactElement => {
    return (
        <div>
            <Link to={Config.LINKS.VIDEO_PAGE(props.id)} className="space-y-6 group">
                <img
                    src="https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg"
                    alt="Video alt"
                    className="border border-indigo-400/10 rounded-lg shadow-xl group-hover:shadow-2xl
                        group-hover:shadow-black/40 transition-all group-hover:opacity-70"
                />
                <div>
                    <h4 className="text-white group-hover:text-indigo-400 transition-colors">{props.title}</h4>
                    <p className="text-slate-400 mt-2 text-sm line-clamp-2">{props.description}</p>
                </div>
            </Link>
            <div className="flex items-center justify-between mt-4">
                <CreatorIcon creator={props.creator} />
                <small className="text-slate-400">{new Date(props.createdAt).toLocaleString()}</small>
            </div>
        </div>
    );
};

export default VideoItem;
