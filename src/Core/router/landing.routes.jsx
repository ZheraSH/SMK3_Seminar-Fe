import HomeLayout from "../../view/layouts/landingpage/home-layout";
// import HomeLandingPage from "../../view/pages/landingpage/HomeLandingPage";
// import NewsPage from "../../view/pages/landingpage/NewsPage";
import AboutLp from "../../view/layouts/landingpage/about";
import Login from "../../view/components/elements/login/main-login";

export const LandingRoutes = [
    {
        path: "/",
        element: <HomeLayout />,
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
