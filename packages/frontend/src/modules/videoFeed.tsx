import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchAllPublishedVideos } from "../redux/actions/video";
import { RootState } from "../redux/slices";
import Loading from "../components/loading";
import { selectAll } from "../redux/slices/video";
import VideoList from "../components/videoList";

const VideoFeed = (): ReactElement => {
    const dispatch = useDispatch<AppDispatch>();
    const videoList = useSelector((state: RootState) => selectAll(state));
    const videoStatus = useSelector((state: RootState) => state.Video.status);

    useEffect(() => {
        (async () => {
            await dispatch(fetchAllPublishedVideos())
        })()
    }, [])

    return (
        <section>
            {videoList.length > 0 ? (
                <VideoList videos={videoList} />
            ) : null}
            <Loading loading={videoList.length === 0 && videoStatus === "loading"} />
        </section>
    )
};

export default VideoFeed;
