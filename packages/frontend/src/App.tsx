import Home from "./pages/home";
import { ReactElement } from "react";
import { Provider as ReduxProvider } from "react-redux";
import Store from "./redux/store";

const App = (): ReactElement => {
    return (
        <ReduxProvider store={Store}>
            <Home />
        </ReduxProvider>
    );
};

export default App;
