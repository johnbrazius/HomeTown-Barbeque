import { chapters } from "@/content/experience";
import { venueImages } from "@/lib/images";
import { ExperienceStage, type StageChapter } from "./ExperienceStage";

/**
 * Home page opener: a scroll-driven walk from the street into the
 * restaurant. Resolves photos on the server (real venue photos when present,
 * concept fallbacks otherwise) and hands plain data to the client stage.
 */
export function Experience() {
  const photos = venueImages();
  const data: StageChapter[] = chapters.map((c) => {
    const photo = photos.find((p) => p.name === c.slot) ?? photos[0];
    return { ...c, photo };
  });
  return <ExperienceStage chapters={data} />;
}
