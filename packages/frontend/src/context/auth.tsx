import { createContext, ReactNode, useState } from "react";
import { isLoggedIn } from "../services/auth";

interface Props {
    children: ReactNode
}

interface AuthContextState {
    isLoggedInOnContext: boolean,
    setLoggedIn: (isLogged: boolean) => void
}

const AuthContext = createContext<AuthContextState>({
    isLoggedInOnContext: isLoggedIn(),
    setLoggedIn: () => undefined
})

const Provider = (props: Props) => {
    const [loggedIn, setIsLoggedIn] = useState<boolean>(isLoggedIn());
    const logout = (isLogged: boolean) => setIsLoggedIn(isLogged);

    console.log(loggedIn);

    return (
        <AuthContext.Provider value={{ isLoggedInOnContext: loggedIn, setLoggedIn: logout }}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default Provider;
export const Context = AuthContext;
