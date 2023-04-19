import { ReactElement } from "react";
import { UserIcon } from "@heroicons/react/24/outline";

const VideoItem = (): ReactElement => {
    return (
        <div className="space-y-6 group">
            <img
                src="https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg"
                alt="Video alt"
                className="rounded-lg shadow-xl"
            />
            <div>
                <h4 className="text-white group-hover:text-indigo-400 transition-colors">Sintel - Open Source Movie</h4>
                <p className="text-slate-400 mt-2 text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem ducimus expedita facilis qui.</p>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 text-center flex items-center justify-center rounded-full bg-indigo-600 shadow-xl shadow-indigo-900/20 border border-indigo-500/30">
                            <UserIcon className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-slate-200 text-sm font-semibold">Blender Foundation</p>
                    </div>
                    <small className="text-slate-400">3 hours ago</small>
                </div>
            </div>
        </div>
    )
};

export default VideoItem;
