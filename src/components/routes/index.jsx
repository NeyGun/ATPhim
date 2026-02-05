import Home from "../pages/Home";
import Watch from "../pages/Watch";
import { HeaderOnly } from "../Layouts";
import Search from "../pages/Search";

const publicRoutes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/search",
        component: Search,
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
    }
];

const privateRoutes = [
];

export { publicRoutes, privateRoutes };