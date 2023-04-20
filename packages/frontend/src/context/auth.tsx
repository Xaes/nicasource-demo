import { createContext, ReactNode, useState } from "react";
import { isLoggedIn } from "../services/auth";
import { Creator } from "../types";

interface Props {
    children: ReactNode
}

interface AuthContextState {
    isLoggedInOnContext: boolean,
    creator?: Creator,
    setCreator: (creator?: Creator) => void
}

const AuthContext = createContext<AuthContextState>({
    isLoggedInOnContext: isLoggedIn(),
    setCreator: () => undefined
});

const Provider = (props: Props) => {
    const [creator, setCreator] = useState<Creator | undefined>();

    return (
        <AuthContext.Provider value={{
            setCreator,
            creator,
            isLoggedInOnContext: !!creator,
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default Provider;
export const Context = AuthContext;
