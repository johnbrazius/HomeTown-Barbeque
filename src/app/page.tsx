import type { Metadata } from "next";
import { Experience } from "@/components/experience/Experience";
import { Ticker } from "@/components/sections/Ticker";
import { ArtOfThePit } from "@/components/sections/ArtOfThePit";
import { MenuShowcase } from "@/components/sections/MenuShowcase";
import { Process } from "@/components/sections/Process";
import { Atmosphere } from "@/components/sections/Atmosphere";
import { Visit } from "@/components/sections/Visit";
import { ExploreGrid, RecognitionBand } from "@/components/sections/Bands";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Experience />
      <Ticker />
      <ArtOfThePit />
      <RecognitionBand />
      <MenuShowcase />
      <Process link />
      <Atmosphere />
      <Visit />
      <ExploreGrid exclude={["/visit"]} title="More from Hometown" />
    </>
  );
}
