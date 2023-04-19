import React, { ReactElement } from "react";
import Layout from "../components/layout";
import VideoProfile from "../modules/videoProfile";

const VideoPage = (): ReactElement => {
    return (
        <Layout className="space-y-12">
            <VideoProfile />
        </Layout>
    );
}

export default VideoPage;
