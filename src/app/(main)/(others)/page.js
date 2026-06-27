import { Banner } from "@/components/home/Banner";
import Stats from "@/components/home/Stats";

export default async function Home() {
  console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}`);
  return (
    <>
      <Banner></Banner>
      <Stats></Stats>
    </>
  );
}
