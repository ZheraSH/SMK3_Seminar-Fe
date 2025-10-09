import "./index.css";
import MainNavbar from "./assets/components/Fragments/LandingPage/Navbar/MainNavbar";
import MainHomeLayouth from "./assets/components/Layouts/HomeLayouth";
import SectionHead from "./assets/components/Fragments/LandingPage/ArticlesComponents/Hero";
import SectionTentangKami from "./assets/components/Fragments/LandingPage/ArticlesComponents/AboutUs";
import TeamSlider from "./assets/components/Fragments/LandingPage/ArticlesComponents/TeamTefa";
import About from "./assets/components/Fragments/LandingPage/ArticlesComponents/SectionAbout";
import FAQ from "./assets/components/Fragments/LandingPage/ArticlesComponents/FAQ";
import ContactSection from "./assets/components/Fragments/LandingPage/ArticlesComponents/Contact";
import Footer from "./assets/components/Fragments/LandingPage/ArticlesComponents/MainFooter";
import PageWrapper from "./assets/components/Elements/PageWrapper";

function App() {
  return (
    <PageWrapper>
      <SectionHead></SectionHead>
      <SectionTentangKami></SectionTentangKami>
      <TeamSlider></TeamSlider>
      <About></About>
      <FAQ></FAQ>
      <Footer></Footer>
      <MainNavbar></MainNavbar>
    </PageWrapper>
  );
}

export default App;
