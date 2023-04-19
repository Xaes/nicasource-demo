import React, { ReactElement, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAllPublishedVideos, fetchPublishedVideoById } from "../redux/actions/video";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/slices";
import { selectById } from "../redux/slices/video";
import Loading from "../components/loading";
import CreatorIcon from "../components/creatorIcon";

const VideoProfile = (): ReactElement => {
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams<{ videoId: string }>();
    const video = useSelector((state: RootState) => params.videoId ? selectById(state, params.videoId) : undefined);
    const videoStatus = useSelector((state: RootState) => state.Video.status);

    useEffect(() => {
        (async () => {
            if (params.videoId) await dispatch(fetchPublishedVideoById(params.videoId));
        })();
    }, [params.videoId])

    return(
        <>
            {video ? (
                <section>
                    <div className="grid grid-cols-12 gap-x-16">
                        <div className="col-span-9 space-y-8">
                            <div className="border border-indigo-300/10 rounded-lg shadow-xl">
                                <video src={video.videoUrl} className="aspect-video	bg-black rounded-lg min-w-full" controls={true} autoPlay={true} />
                            </div>
                            <div className="space-y-6">
                                <header className="space-y-2">
                                    <h2>{video.title}</h2>
                                    <p className="text-slate-400">{video.description}</p>
                                </header>
                                <CreatorIcon creator={video.creator} />
                            </div>
                        </div>
                        <div className="col-span-3 space-y-8">
                            <h3>Most Recent Videos</h3>
                        </div>
                    </div>
                </section>
            ) : null}
            <Loading loading={!video && videoStatus === "loading"} />
        </>
    )
};

export default VideoProfile;
