import Top from "./sections/Top";
import About from "./sections/About";
import Graduation from "./sections/Graduation";
import Footer from "./components/Footer";
import Events from "./sections/Events";
import Gallery from "./sections/Gallery";
import Headquarters from "./sections/Headquarters";
import ModeloTA from "./sections/ModeloTA";

export default function Home() {
  return (
    <main>
      <Top />
      <About />
      <Graduation />
      <Events />
      <ModeloTA />
      <Gallery />
      <Headquarters />
      <Footer />
    </main>
  );
}
