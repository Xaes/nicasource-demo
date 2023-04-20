import { useContext } from "react";
import { Context } from "../context/auth";
import { logout as sessionLogout, login as sessionLogin, LoginParams } from "../services/auth";
import { Creator } from "../types";

export interface AuthHookReturn {
    logout: () => void
    login: (params: LoginParams) => void
    isLoggedIn: boolean,
    creator?: Creator,
}

export default (): AuthHookReturn => {
    const context = useContext(Context);

    const logout = () => {
        sessionLogout();
        context.setCreator(undefined);
    };

    const login = async (params: LoginParams): Promise<void> => {
        const response = await sessionLogin({ ...params, credentialType: "password" });
        context.setCreator(response.data.creator);
    };

    return { logout, login, creator: context.creator, isLoggedIn: context.isLoggedInOnContext };

};
