import HomeLayout from "../../view/layouts/landingpage/home-layout";
import LandingPageHome from "../../view/layouts/landingpage/landing-page-home";
// import NewsPage from "../../view/pages/landingpage/NewsPage";
import AboutLp from "@assets/layouts/landingpage/about";
import Login from "@components/elements/login/main-login";
import NewsPage from "../../view/layouts/landingpage/news-page";

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
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
];
