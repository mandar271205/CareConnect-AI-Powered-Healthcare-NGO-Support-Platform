import About from "@/components/About";
import AutomationFlow from "@/components/AutomationFlow";
import CareBot from "@/components/CareBot";
import Footer from "@/components/Footer";
import FormTabs from "@/components/FormTabs";
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
        <FormTabs />
        <AutomationFlow />
        <About />
      </main>
      <Footer />
      <CareBot />
    </>
  );
}
