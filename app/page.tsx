import { Loader } from "@/components/loader";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero/hero";
import { Manifesto } from "@/components/manifesto";
import { Capabilities } from "@/components/capabilities";
import { Process } from "@/components/process";
import { Stats } from "@/components/stats";
// import { TradeKit } from "@/components/trade-kit"; // kept in repo, not currently rendered
import { WorkGallery } from "@/components/work-gallery";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <Hero />
      <Manifesto />
      <Capabilities />
      <Process />
      <Sta