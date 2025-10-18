import ThirdMain from "../../components/Fragments/LandingPage/Articles/HeroBerita";
import NewsSection from "../../components/Fragments/LandingPage/Articles/News";
import Footer from "../../components/Fragments/LandingPage/ArticlesComponents/MainFooter";
import MainNavbar from "../../components/Fragments/LandingPage/Navbar/MainNavbar";
import PageWrapper from "../../components/Elements/PageWrapper";

const Berita = () => {
  return (
    <PageWrapper loadingDuration={2000}>
      <ThirdMain></ThirdMain>
      <NewsSection></NewsSection>
      <Footer></Footer>
      <MainNavbar></MainNavbar>
    </PageWrapper>
  );
};
export default Berita;
