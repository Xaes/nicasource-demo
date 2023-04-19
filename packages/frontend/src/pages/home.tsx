import React from "react";
import Layout from "../components/layout";
import VideoFeed from "../modules/videoFeed";

const Home = () => {
    return (
        <Layout className="space-y-12">
            <header className="space-y-2">
                <h2>Home</h2>
                <p className="text-slate-400">Browse all our videos</p>
            </header>
            <VideoFeed />
        </Layout>
    );
};

export default Home;
