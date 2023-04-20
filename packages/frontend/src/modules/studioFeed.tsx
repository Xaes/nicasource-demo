import { ReactElement, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/slices";
import { selectAll } from "../redux/slices/video";
import { fetchAllVideosByCreatorId } from "../redux/actions/video";
import VideoList from "../components/videoList";
import Loading from "../components/loading";

const StudioFeed = (): ReactElement | null => {
    const { creator } = useAuth();
    const dispatch = useDispatch<AppDispatch>();
    // TODO: Create a custom redux selector for optimization.
    const videosByCreator = useSelector((state: RootState) => selectAll(state).filter(video => video.creatorId === creator?.id));
    const videoStatus = useSelector((state: RootState) => state.Video.status);

    useEffect(() => {
        (async () => {
            if (creator) await dispatch(fetchAllVideosByCreatorId(creator.id));
        })();
    }, [creator]);

    if (creator) return (
        <section>
            <VideoList videos={videosByCreator} showBadges={true} />
            <Loading loading={videosByCreator.length === 0 && videoStatus === "loading"} />
        </section>
    ); return null;
};

export default StudioFeed;
