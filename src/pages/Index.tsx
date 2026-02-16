import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Contact />
    </main>
  );
};

export default Index;
