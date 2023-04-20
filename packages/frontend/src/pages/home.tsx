import React, { ReactElement } from "react";
import VideoFeed from "../modules/videoFeed";

const Home = (): ReactElement => {
    return (
        <div className="space-y-12">
            <header className="space-y-2">
                <h2>Home</h2>
                <p className="text-slate-400">Browse all our videos</p>
            </header>
            <VideoFeed />
        </div>
    );
};

export default Home;
