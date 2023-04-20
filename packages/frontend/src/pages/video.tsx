import React, { ReactElement } from "react";
import VideoProfile from "../modules/videoProfile";
import RegisterCTA from "../components/registerCTA";
import useAuth from "../hooks/useAuth";
import VideoEdit from "../components/videoEdit";

const VideoPage = (): ReactElement => {
    const { isLoggedIn  } = useAuth();
    return (
        <section>
            <div className="grid grid-cols-12 gap-x-16">
                <div className="col-span-9 space-y-8">
                    <VideoProfile />
                </div>
                <div className="col-span-3 space-y-8">
                    {isLoggedIn  ? <VideoEdit /> : <RegisterCTA />}
                </div>
            </div>
        </section>
    );
};

export default VideoPage;
