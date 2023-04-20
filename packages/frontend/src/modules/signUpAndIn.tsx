import { ReactElement, useEffect, useState } from "react";
import { NavLink, Route, useMatch, useNavigate } from "react-router-dom";
import Config from "../../config";
import RegisterForm from "../components/registerForm";
import LoginForm from "../components/loginForm";
import Illustration from "../assets/illustration.svg";

const SignUpAndIn = (): ReactElement => {
    const [feedback, setFeedback] = useState<string | undefined>(undefined);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFeedback(undefined)
        }, 5000);
        return () => clearTimeout(timeout);
    }, [feedback])

    const baseLinkClassName = "text-xl font-semibold";
    const isSignIn = useMatch(Config.LINKS.SIGNIN);
    const isSignUp = useMatch(Config.LINKS.SIGNUP);

    const navigate = useNavigate();

    const getLinkClassName = (active: boolean) => {
        const className = active ? "text-indigo-500" : "text-slate-400 hover:text-white";
        return `${baseLinkClassName} ${className}`
    };

    return (
        <section className="justify-center flex min-h-[70vh] h-full">
            <div className="grid grid-cols-12 gap-20 items-center w-4/5 mx-auto">
                <div className="col-span-7">
                    <img src={Illustration} alt="Illustration" className="mb-12 w-3/5" />
                    <h1>We'd <span className="text-indigo-500">love</span> to see your content!</h1>
                    <h4 className="text-slate-400 font-normal mt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi beatae debitis, dicta dignissimos eum expedita inventore.</h4>
                </div>
                <div className="col-span-5">
                    <div className="space-y-8">
                        <div className="flex items-center space-x-4">
                            <NavLink
                                to={Config.LINKS.SIGNUP}
                                className={({ isActive }) => getLinkClassName(isActive)}
                            >
                                Sign Up
                            </NavLink>
                            <NavLink
                                to={Config.LINKS.SIGNIN}
                                className={({ isActive }) => getLinkClassName(isActive)}
                            >
                                Sign In
                            </NavLink>
                        </div>
                        <div className="rounded-lg bg-gray-900 px-10 py-12 shadow-2xl border border-indigo-300/10">
                            {isSignUp ? (
                                <RegisterForm
                                    onSuccess={(): void => {
                                        setFeedback("Registration successful, you may login now.");
                                        navigate(Config.LINKS.SIGNIN);
                                    }}
                                />
                            ) : undefined}
                            {isSignIn && <LoginForm />}
                        </div>
                        {feedback ? (
                            <span className="form-success text-center w-full">{feedback}</span>
                        ) : undefined}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUpAndIn;
