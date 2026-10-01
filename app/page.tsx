import Top from "./sections/Top";
import About from "./sections/About";
import Graduation from "./sections/Graduation";
import Footer from "./components/Footer";
import Events from "./sections/Events";
import Gallery from "./sections/Gallery";
import Headquarters from "./sections/Headquarters";
import ModeloTA from "./sections/ModeloTA";
import Marquee from "./components/Marquee";
import MusicPlayer from "./components/MusicPlayer";

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
      <Footer />
      <MusicPlayer />
    </main>
  );
}
