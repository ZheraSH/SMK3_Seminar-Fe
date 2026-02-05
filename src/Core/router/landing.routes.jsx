import HomeLayouth from "../../view/layouts/landingpage/HomeLayouth";
// import HomeLandingPage from "../../view/pages/landingpage/HomeLandingPage";
// import AboutUS from "../../view/pages/landingpage/AboutUS";
// import NewsPage from "../../view/pages/landingpage/NewsPage";
import Login from "../../view/components/elements/login/MainLogin";

export const LandingRoutes = [
    {
        path: "/kacaw",
        element: <HomeLayouth />,
        children: [
            // {
            //     index: true,
            //     element: <HomeLandingPage />,
            // },
            // {
            //     path: "tentangkami",
            //     element: <AboutUS />,
            // },
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
