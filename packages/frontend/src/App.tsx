import Home from "./pages/home";
import { ReactElement } from "react";
import { Provider as ReduxProvider } from "react-redux";
import Store from "./redux/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VideoPage from "./pages/video";

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/video/:videoId", element: <VideoPage />}
])

const App = (): ReactElement => {
    return (
        <ReduxProvider store={Store}>
            <RouterProvider router={router} />
        </ReduxProvider>
    );
};

export default App;
