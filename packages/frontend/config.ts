export default {
    LINKS: {
        HOME: "/",
        SIGNUP: "/signup",
        SIGNIN: "/signin",
        VIDEO_PAGE: (id: string) => `/video/${id}`,
        CREATOR_PAGE: (id: string) => `/creator/${id}`,
        STUDIO: "/studio",
        UPLOAD_VIDEO: "/upload"
    },
    API: {
        URL: import.meta.env.VITE_API_URL || "localhost:8000/api/v1"
    }
};
