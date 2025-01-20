import HeroSection from "../component/HeroSection";
import Footer from "../component/layout/Footer";
import Header from "../component/layout/Header";

const Home = () => {
  return (
    <>
      <main className="basecolor1-light-bg">
        <Header />
        <HeroSection />
        <Footer />
      </main>
    </>
  );
};

export default Home;
