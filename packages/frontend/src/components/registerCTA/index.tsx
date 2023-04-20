import { ReactElement } from "react";
import { Link } from "react-router-dom";
import Config from "../../../config";
import { VideoCameraIcon } from "@heroicons/react/24/outline";

const RegisterCTA = (): ReactElement => {
    return (
        <div className="rounded-lg shadow-xl border border-indigo-500/20 bg-indigo-500 text-center p-8">
            <VideoCameraIcon className="w-12 h-12 mx-auto text-white" />
            <h3 className="leading-8 text-[24px] mt-6">Millions of users waiting for you!</h3>
            <p className="text-slate-200 mt-4">Be part of the best videos of the Internet!</p>
            <Link to={Config.LINKS.SIGNUP} className="button button-secondary w-full mt-8">
                Sign Up
            </Link>
        </div>
    );
};

export default RegisterCTA;
