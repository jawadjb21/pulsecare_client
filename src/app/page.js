import { Banner } from "@/components/home/Banner";
import { Footer } from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import Stats from "@/components/home/Stats";
import { getSession } from "@/lib/getSession";
import Image from "next/image";

export default async function Home() {
  const user = await getSession();
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <Navbar user={user}></Navbar>
      <Banner></Banner>
      <Stats></Stats>
      <Footer></Footer>
    </div>
  );
}
