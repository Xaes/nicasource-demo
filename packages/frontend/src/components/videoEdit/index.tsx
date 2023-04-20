import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/slices";
import { selectById } from "../../redux/slices/video";
import useForm from "../../hooks/useForm";
import { fetchPublishedVideoById, updateVideo } from "../../redux/actions/video";
import { APIErrorResponse } from "../../types";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/24/outline";
import useAuth from "../../hooks/useAuth";

const VideoEdit = (): ReactElement | null => {
    const { creator } = useAuth();
    const [error, setError] = useState<APIErrorResponse | undefined>(undefined);
    const dispatch = useDispatch<AppDispatch>();
    const params = useParams<{ videoId: string }>();
    const video = useSelector((state: RootState) => params.videoId ? selectById(state, params.videoId) : undefined);

    useEffect(() => {
        (async () => {
            if (params.videoId) await dispatch(fetchPublishedVideoById(params.videoId));
        })();
    }, [params.videoId]);

    const { registerValue, submit, loading, items } = useForm({
        items: {
            title: { required: true, value: video?.title },
            description: { required: true, value: video?.description }
        },
        onSubmit: async ({ items }) => {
            try {
                if (params.videoId) {
                    setError(undefined);
                    await dispatch(updateVideo({
                        id: params.videoId,
                        title: items.title.value as string,
                        description: items.description.value as string
                    }));
                }
            } catch (error) {
                setError(error as APIErrorResponse);
            }
        }
    });

    if (video && creator && video.creatorId === creator.id) {
        return (
            <div className="rounded-lg bg-gray-900 px-10 py-12 shadow-2xl border border-indigo-300/10">
                <form
                    role="form"
                    className="space-y-8"
                    onSubmit={async (event) => {
                        event.preventDefault();
                        await submit();
                    }}
                >
                    <PencilIcon className="w-7 h-7 text-indigo-400" />
                        <fieldset className="space-y-4">
                            <label>
                                <span>Title:</span>
                                <input
                                    placeholder="A nice title"
                                    type="text"
                                    value={items.title.value as string}
                                    onChange={({ target }) => registerValue("title", target.value)}
                                />
                                {items.title.hasError && ( <span className="form-error">A title is required.</span> )}
                            </label>
                            <label>
                                <span>Description:</span>
                                <input
                                    placeholder="A nice description"
                                    type="text"
                                    value={items.description.value as string}
                                    onChange={({ target }) => registerValue("description", target.value)}
                                />
                                {items.description.hasError && ( <span className="form-error">A description is required.</span> )}
                            </label>
                        </fieldset>
                        <button
                            disabled={loading}
                            className="button button-primary w-full"
                            type="submit"
                        >
                            <span className="flex items-center justify-center">
                                {loading ? (<ArrowPathIcon className="w-4 h-4 animate-spin text-white mr-2" />) : undefined}
                                <span>Edit video</span>
                            </span>
                        </button>
                    {error && error.errorMessage ? (
                        <span className="form-error text-center w-full capitalize">{error.errorMessage}</span>
                    ) : undefined}
                </form>
            </div>
        );
    } else return null;
}

export default VideoEdit;
