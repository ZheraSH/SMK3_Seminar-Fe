import Footer from "../components/Fragments/LandingPage/ArticlesComponents/MainFooter";
import MainNavbar from "../components/Fragments/LandingPage/Navbar/MainNavbar";
import SecondAbout from "../components/Fragments/LandingPage/AboutUSComponents/AboutUS";
import SecondMain from "../components/Fragments/LandingPage/AboutUSComponents/HeroAboutUS";
import PageWrapper from "../components/Elements/PageWrapper";

const TentangKami = () => {
  return (
    <PageWrapper>
      <SecondMain></SecondMain>
      <SecondAbout></SecondAbout>
      <Footer></Footer>
      <MainNavbar></MainNavbar>
    </PageWrapper>
  );
};

export default TentangKami;
