import HomeLayouth from "../../view/layouts/landingpage/HomeLayouth";
// import HomeLandingPage from "../../view/pages/landingpage/HomeLandingPage";
// import NewsPage from "../../view/pages/landingpage/NewsPage";
import AboutLp from "../../view/layouts/landingpage/about";
import Login from "../../view/components/elements/login/MainLogin";

export const LandingRoutes = [
    {
        path: "/",
        element: <HomeLayouth />,
        children: [
            // {
            //     index: true,
            //     element: <HomeLandingPage />,
            // },
            {
                path: "tentang",
                element: <AboutLp />,
            },
            // {
            //     path: "berita",
            //     element: <NewsPage />,
            // },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
];
