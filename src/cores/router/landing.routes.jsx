import HomeLayout from "@/view/layouts/landingpage/home-layout";
import LandingPageHome from "@/view/layouts/landingpage/landing-page-home";
import AboutLp from "@/view/layouts/landingpage/about";
import Login from "@elements/login/main-login";
import NewsPage from "@/view/layouts/landingpage/news-page";
import GaleryPage from "@/view/layouts/landingpage/galery-page";

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
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
];
