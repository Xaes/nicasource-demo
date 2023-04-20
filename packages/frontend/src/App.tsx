import Home from "./pages/home";
import { ReactElement } from "react";
import { Provider as ReduxProvider } from "react-redux";
import Store from "./redux/store";
import { useRoutes } from "react-router-dom";
import Config from "../config";
import SignUpAndIn from "./modules/signUpAndIn";
import Layout from "./components/layout";
import Video from "./pages/video";
import UploadVideo from "./modules/uploadVideo";
import AuthRoute from "./components/authRoute";
import Studio from "./pages/studio";

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
                    element: <AuthRoute><UploadVideo /></AuthRoute>
                },
                {
                    path: Config.LINKS.STUDIO,
                    element: <AuthRoute><Studio /></AuthRoute>
                }
            ]
        },
    ]);

    return (
        <ReduxProvider store={Store}>
            {routes}
        </ReduxProvider>
    );
};

export default App;
