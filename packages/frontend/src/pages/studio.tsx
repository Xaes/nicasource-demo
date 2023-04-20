import React, { ReactElement } from "react";
import useAuth from "../hooks/useAuth";
import StudioFeed from "../modules/studioFeed";

const Studio = (): ReactElement | null => {
    const { creator } = useAuth();

    if (creator) return (
        <section>
            <div className="space-y-12">
                <header className="space-y-2">
                    <h2>Welcome, {creator.name}</h2>
                    <p className="text-slate-400">Here is a list of all your videos</p>
                </header>
                <StudioFeed />
            </div>
        </section>
    ); return null;
};

export default Studio;
