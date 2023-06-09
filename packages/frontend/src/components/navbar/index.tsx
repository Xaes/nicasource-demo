import { ReactElement } from "react";
import LogoSVG from "../../assets/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Config from "../../../config";
import useAuth from "../../hooks/useAuth";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

const Navbar = (): ReactElement => {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="container mx-auto">
            <div className="flex items-center justify-between pt-8">
                <Link to={Config.LINKS.HOME} className="flex items-center space-x-4 group">
                    <img src={LogoSVG} alt="VideoHub Nicasource" className="w-10 h-10" />
                    <h3 className="transition-all group-hover:text-indigo-500">VideoHub</h3>
                </Link>
                <div className="flex items-center space-x-8">
                    {!isLoggedIn ? (
                        <>
                            <Link
                                to={Config.LINKS.SIGNUP}
                                className="button button-primary"
                            >
                                Sign Up
                            </Link>
                            <Link
                                to={Config.LINKS.SIGNIN}
                                className="font-semibold text-slate-400 hover:text-white transition-colors"
                            >
                                Sign In
                            </Link>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to={Config.LINKS.STUDIO}
                                className={({ isActive }) =>
                                    isActive ? "font-semibold text-indigo-500" :
                                        "font-semibold text-slate-400 hover:text-white transition-colors"
                                }
                            >
                                Your Studio
                            </NavLink>
                            <Link
                                to={Config.LINKS.UPLOAD_VIDEO}
                                className="button button-primary !flex items-center space-x-2"
                            >
                                <ArrowUpIcon className="inline w-4 h-4" />
                                <span>Upload Video</span>
                            </Link>
                            <button
                                className="font-semibold text-slate-400 hover:text-white transition-colors"
                                onClick={() => {
                                    logout();
                                    navigate(Config.LINKS.HOME);
                                }}
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
