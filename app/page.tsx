import React from "react";
import { Loader } from "@/components/loader";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero/hero";
import { Manifesto } from "@/components/manifesto";
import { Capabilities } from "@/components/capabilities";
import { Process } from "@/components/process";
import { Stats } from "@/components/stats";
import { WorkGallery } from "@/components/work-gallery";
import { About } from "@/components/about";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <React.Fragment>
      <Loader />
      <Nav />
      <Hero />
      <Manifesto />
      <Capabilities />
      <Process />
      <Stats />
      <WorkGallery />
      <About />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </React.Fragment>
  );
}
