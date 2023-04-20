import { useContext } from "react";
import { Context } from "../context/auth";
import { logout as sessionLogout, login as sessionLogin, LoginParams } from "../services/auth";

export interface AuthHookReturn {
    logout: () => void
    login: (params: LoginParams) => void
    isLoggedIn: boolean
}

export default (): AuthHookReturn => {
    const context = useContext(Context);

    const logout = () => {
        sessionLogout();
        context.setLoggedIn(false);
    }

    const login = async (params: LoginParams) => {
        await sessionLogin({ ...params, credentialType: "password" });
        context.setLoggedIn(true);
    }

    return { logout, login, isLoggedIn: context.isLoggedInOnContext }

}
