import { ReactElement, useState } from "react";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { APIErrorResponse } from "../../types";
import useForm, { validateURL } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addVideo } from "../../redux/actions/video";

const CreateVideoForm = (): ReactElement => {
    const dispatch = useDispatch<AppDispatch>();
    const [error, setError] = useState<APIErrorResponse | undefined>(undefined);

    const { registerValue, submit, loading, items } = useForm({
        items: {
            title: { required: true },
            description: { required: true },
            url: {
                required: true,
                validate: {
                    fn: ({ value }) => validateURL(value)
                }
            },
        },
        onSubmit: async ({ items }) => {
            try {
                setError(undefined);
                await dispatch(addVideo({
                    title: items.title.value as string,
                    description: items.description.value as string,
                    videoUrl: items.url.value as string
                }));
            } catch (error) {
                setError(error as APIErrorResponse);
            }
        }
    });

    return (
        <form
            role="form"
            className="space-y-8"
            onSubmit={async (event) => {
                event.preventDefault();
                await submit();
            }}
        >
            <VideoCameraIcon className="w-8 h-8 text-indigo-400" />
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
                <label>
                    <span>URL:</span>
                    <input
                        placeholder="URL"
                        type="url"
                        value={items.url.value as string}
                        onChange={({ target }) => registerValue("url", target.value)}
                    />
                    {items.url.hasError && ( <span className="form-error">A valid URL is required.</span> )}
                </label>
                {error && error.errorMessage ? (
                    <span className="form-error text-center w-full capitalize">{error.errorMessage}</span>
                ) : undefined}
            </fieldset>
            <button
                disabled={loading}
                className="button button-primary w-full"
                type="submit"
            >
                <span className="flex items-center justify-center">
                    {loading ? (<ArrowPathIcon className="w-4 h-4 animate-spin text-white mr-2" />) : undefined}
                    <span>Upload video</span>
                </span>
            </button>
        </form>
    );
};

export default CreateVideoForm;
