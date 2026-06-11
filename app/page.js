import About from "@/components/About";
import AutomationFlow from "@/components/AutomationFlow";
import CareBot from "@/components/CareBot";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <AutomationFlow />
        <About />
      </main>
      <Footer />
      <CareBot />
    </>
  );
}
