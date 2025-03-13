import HeroSection from "@/src/component/HeroSection";
import styles from "@/src/styles/sass/components/Home.module.scss";

const Home = () => {
   return (
      <main>
      <section
        id="fold1"
        className={styles.HomeBannerActive}
      >
        <HeroSection />
      </section>
    </main>
   );
}

export default Home;