import Top from "./sections/Top";
import About from "./sections/About";
import Graduation from "./sections/Graduation";
import Footer from "./components/Footer";
import Events from "./sections/Events";
import Gallery from "./sections/Gallery";
import Headquarters from "./sections/Headquarters";
import InstagramCta from "./sections/InstagramCta";
import ModeloTA from "./sections/ModeloTA";
import Marquee from "./components/Marquee";
import MusicPlayer from "./components/MusicPlayer";
import SmoothScroll from "./components/SmoothScroll";

export default function Home() {
  return (
    <main className="home">
      <Top />
      <About />
      <Marquee />
      <Graduation />
      <Events />
      <ModeloTA />
      <Gallery />
      <Headquarters />
      <InstagramCta />
      <Footer />
      <MusicPlayer />
      <SmoothScroll />
    </main>
  );
}
