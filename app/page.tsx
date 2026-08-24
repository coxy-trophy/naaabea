import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Gallery from "./components/Gallery";
import VideoReel from "./components/VideoReel";
import Featured from "./components/Featured";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";
import CustomCursor from "./components/CustomCursor";

export default function Home() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Gallery />
        <VideoReel />
        <Featured />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
