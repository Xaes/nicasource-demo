import Home from "./pages/home";
import { ReactElement } from "react";
import { Provider as ReduxProvider } from "react-redux";
import Store from "./redux/store";
import { BrowserRouter, useRoutes } from "react-router-dom";
import Config from "../config";
import SignUpAndIn from "./modules/signUpAndIn";
import Layout from "./components/layout";
import VideoProfile from "./modules/videoProfile";
import Video from "./pages/video";
import UploadVideo from "./modules/uploadVideo";

const App = (): ReactElement => {

    const routes = useRoutes([
        {
            path: Config.LINKS.HOME,
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: Config.LINKS.VIDEO_PAGE(":videoId"),
                    element: <Video />
                },
                {
                    path: Config.LINKS.SIGNIN,
                    element: <SignUpAndIn />
                },
                {
                    path: Config.LINKS.SIGNUP,
                    element: <SignUpAndIn />
                },
                {
                    path: Config.LINKS.UPLOAD_VIDEO,
                    element: <UploadVideo />
                }
            ]
        },
    ])

    return (
        <ReduxProvider store={Store}>
            {routes}
        </ReduxProvider>
    );
};

export default App;
