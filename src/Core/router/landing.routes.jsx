<<<<<<< HEAD
import HomeLayouth from "../../view/layouts/landingpage/HomeLayouth";
// import HomeLandingPage from "../../view/pages/landingpage/HomeLandingPage";
// import AboutUS from "../../view/pages/landingpage/AboutUS";
// import NewsPage from "../../view/pages/landingpage/NewsPage";
import Login from "../../view/components/elements/login/MainLogin";

export const LandingRoutes = [
    {
        path: "/lp",
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
=======
import HomeLayout from "../../view/layouts/landingpage/home-layout";
import LandingPageHome from "../../view/layouts/landingpage/landing-page-home";
// import NewsPage from "../../view/pages/landingpage/NewsPage";
import AboutLp from "@assets/layouts/landingpage/about";
import Login from "@components/elements/login/main-login";
import NewsPage from "../../view/layouts/landingpage/news-page";
import GaleryPage from "../../view/layouts/landingpage/galery-page";

export const LandingRoutes = [
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            {
                index: true,
                element: <LandingPageHome />,
            },
            {
                path: "tentang",
                element: <AboutLp />,
            },
            {
                path: "berita",
                element: <NewsPage />,
            },
            {
                path: "galery",
                element: <GaleryPage />,
            },
>>>>>>> dev2
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
];
