import { ReactElement } from "react";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

interface Props {
    loading: boolean
}

const Loading = (props: Props): ReactElement | null => {
    return props.loading ? (
        <div className="flex items-center justify-center p-12">
            <ArrowPathIcon className="w-12 h-12 animate-spin text-indigo-600" />
        </div>
    ) : null;
};

export default Loading;
