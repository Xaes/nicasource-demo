import { ReactElement } from "react";
import { Creator } from "../../types";
import { UserIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Config from "../../../config";

interface Props {
    creator: Creator
}

const CreatorIcon = (props: Props): ReactElement => {
    return  (
        <Link to={Config.LINKS.CREATOR_PAGE(props.creator.id)} className="flex group items-center space-x-4">
            <div
                className="w-8 h-8 text-center flex items-center justify-center rounded-full
                    bg-indigo-600 shadow-xl shadow-indigo-900/20 border border-indigo-500/30"
            >
                <UserIcon className="w-4 h-4 text-white" />
            </div>
            <p className="text-slate-200 text-sm font-semibold group-hover:text-indigo-500 transition-all">{props.creator.name}</p>
        </Link>
    );
};

export default CreatorIcon;
