import SectionHead from "../../components/Fragments/LandingPage/ArticlesComponents/Hero";
import Footer from "../../components/Fragments/LandingPage/ArticlesComponents/MainFooter";
import FAQ from "../../components/Fragments/LandingPage/ArticlesComponents/FAQ";
import AboutSection from "../../components/Fragments/LandingPage/ArticlesComponents/SectionAbout";
import TeamSlider from "../../components/Fragments/LandingPage/ArticlesComponents/TeamTefa";
import SectionTentangKami from "../../components/Fragments/LandingPage/ArticlesComponents/AboutUs";
import MainNavbar from "../../components/Fragments/LandingPage/Navbar/MainNavbar";
import PageWrapper from "../../components/Elements/PageWrapper";

const HomeLandingPage = () => {
  return (
    <PageWrapper>
      <SectionHead></SectionHead>
      <SectionTentangKami></SectionTentangKami>
      <TeamSlider></TeamSlider>
      <AboutSection></AboutSection>
      <FAQ></FAQ>
      <Footer></Footer>
      <MainNavbar></MainNavbar>
    </PageWrapper>
  );
};

export default HomeLandingPage;
