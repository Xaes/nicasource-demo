import { ReactElement, ReactNode } from "react";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Config from "../../../config";

interface Props {
    children: ReactNode
}

const AuthRoute = (props: Props): ReactElement => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? <>{props.children}</> : <Navigate to={Config.LINKS.SIGNIN} />;
};

export default AuthRoute;
