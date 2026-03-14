import Home from "../pages/Home";
import Watch from "../pages/Watch";
import Search from "../pages/SearchPage";
import { HeaderOnly } from "../Layouts";

const publicRoutes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/watch/:slug",
        component: Watch,
        layout: HeaderOnly,
    },
    {
        // Route này: /watch/phim-A/tap-1
        // Sẽ phát chính xác tập 1
        path: "/watch/:slug/:episodeSlug",
        component: Watch,
        layout: HeaderOnly,
    },
    {
        path: "/search",
        component: Search,
    },
];

const privateRoutes = [
];

export { publicRoutes, privateRoutes };