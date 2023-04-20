import React, { ReactElement } from "react";
import VideoProfile from "../modules/videoProfile";

const VideoPage = (): ReactElement => {
    return (
        <section>
            <div className="grid grid-cols-12 gap-x-16">
                <div className="col-span-9 space-y-8">
                    <VideoProfile />
                </div>
            </div>
        </section>
    );
};

export default VideoPage;
