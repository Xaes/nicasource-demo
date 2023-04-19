export default {
    LINKS: {
        HOME: "/",
        SIGNUP: "/signup",
        SIGNIN: "/signin"
    },
    API: {
        URL: import.meta.env.VITE_API_URL || "localhost:8000/api/v1"
    }
};
