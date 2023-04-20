import React, { ReactElement } from "react";
import Layout from "../components/layout";
import VideoProfile from "../modules/videoProfile";

const VideoPage = (): ReactElement => {
    return (
        <section>
            <div className="grid grid-cols-12 gap-x-16">
                <div className="col-span-9 space-y-8">
                    <VideoProfile />
                </div>
                <div className="col-span-3 space-y-8">
                    <h3>Most Recent Videos</h3>
                </div>
            </div>
        </section>
    );
}

export default VideoPage;
