import { ReactElement, ReactNode } from "react";
import Navbar from "../navbar";
import { Outlet } from "react-router-dom";

interface Props {
    children?: ReactNode,
    className?: string
}

const Layout = (props: Props): ReactElement => {
    const contentClassName = props.className ? ` ${props.className}` : "";
    return (
        <div className="space-y-16">
            <Navbar />
            <main className={`container mx-auto min-h-[70vh]${contentClassName}`}>
                <Outlet />
            </main>
            <footer className="container mx-auto flex justify-between text-slate-400 py-8">
                <small>All rights reserved.</small>
                <small>Made by <a href="https://xaes.dev" className="font-semibold text-slate-200 hover:text-indigo-500">Diego Balmaceda</a>.</small>
            </footer>
        </div>
    );
};

export default Layout;
