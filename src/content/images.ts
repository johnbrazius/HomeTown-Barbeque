/**
 * Image manifest.
 *
 * Every image on the site is referenced by key from here, so replacing
 * photography means editing this file only.
 *
 * - `file`   is the self-hosted copy in /public/images. `npm run images:fetch`
 *            downloads any missing files from `remote`.
 * - `remote` is the original source. It is only used while the local file
 *            is absent (see src/lib/images.ts).
 *
 * All current images are AI-generated concept imagery (OpenArt, Seedream 4.5)
 * created for this redesign. They are illustrative and do not show the
 * restaurant's real food or premises. Swap in licensed photography of the
 * real venue before any commercial use.
 */

export type ImageEntry = {
  file: string;
  remote: string;
  width: number;
  height: number;
  alt: string;
  /** CSS object-position for art-directed crops */
  focus?: string;
  /** Average tone used as a placeholder while loading */
  tone: string;
};

const CDN = "https://cdn.openart.ai/openart-ai/production/2026-10/create-image/xhJDN7OQFJv48lqPNdab";

export const images = {
  heroWide: {
    file: "hero-brisket-wide.jpg",
    remote: `${CDN}/02179161284302425f2f82b7160c183ba98a715c9386d718d0136_0_1791612861359_d5df4549.jpeg`,
    width: 2848,
    height: 1600,
    alt: "Thick slices of smoked brisket with a dark pepper bark and pink smoke ring on butcher paper",
    focus: "60% 50%",
    tone: "#2a1a12",
  },
  heroTall: {
    file: "hero-brisket-tall.jpg",
    remote: `${CDN}/021791612960125978acb49f7cce3ba6727b8cdf360fb7ed71f40_0_1791612968185_55ca9ba0.jpeg`,
    width: 1728,
    height: 2304,
    alt: "Slices of smoked brisket fanned out on butcher paper, smoke rising behind",
    focus: "50% 55%",
    tone: "#24170f",
  },
  ribs: {
    file: "spare-ribs.jpg",
    remote: `${CDN}/0217916129611286097278e78ff109d0bf5de77146291accb6b7b_0_1791612966901_a18ecd23.jpeg`,
    width: 2304,
    height: 1728,
    alt: "A rack of glazed, wood-smoked pork spare ribs sliced between the bones on a sheet tray",
    tone: "#2b160d",
  },
  pulledPork: {
    file: "pulled-pork-sandwich.jpg",
    remote: `${CDN}/02179161296208425f2f82b7160c183ba98a715c9386d71749963_0_1791612976609_1d7ebd45.jpeg`,
    width: 2304,
    height: 1728,
    alt: "A pulled pork sandwich piled with shredded smoked pork and slaw, pickles on the side",
    tone: "#30200f",
  },
  firebox: {
    file: "pit-firebox-oak.jpg",
    remote: `${CDN}/0217916129631559601394fd5171fb187b1a439528361d315b56d_0_1791612969407_586230e0.jpeg`,
    width: 2848,
    height: 1600,
    alt: "Split oak logs burning inside the open firebox of a black steel smoker",
    tone: "#1c0f08",
  },
  oak: {
    file: "oak-woodpile.jpg",
    remote: `${CDN}/02179161300307733f1a7c43c44499172059af1828f594394060c_0_1791613009180_4ba2f5b6.jpeg`,
    width: 1728,
    height: 2304,
    alt: "A stack of split, seasoned oak logs against a weathered brick wall",
    tone: "#3a2a1f",
  },
  smoke: {
    file: "smoke-chamber.jpg",
    remote: `${CDN}/021791613004116f99996bc9b27db5cda0ac6dd5ae68eda7a01c3_0_1791613011689_8d77fb28.jpeg`,
    width: 2848,
    height: 1600,
    alt: "Briskets and racks of ribs resting on steel grates inside a smoker, wrapped in drifting smoke",
    tone: "#1d1916",
  },
  sides: {
    file: "sides-tray.jpg",
    remote: `${CDN}/02179161300502550b1c418616fd9b5f78a16c5c9d34162deae9f_0_1791613012892_a413a3ed.jpeg`,
    width: 2048,
    height: 2048,
    alt: "Barbecue sides from above: mac and cheese, cornbread with honey butter, collard greens, slaw and pickles",
    tone: "#3b2b1c",
  },
  pudding: {
    file: "banana-pudding.jpg",
    remote: `${CDN}/021791613005663e0fa5d59a7b50e9f748f37815b909e283b009d_0_1791613012324_f0333842.jpeg`,
    width: 2048,
    height: 2048,
    alt: "Banana cream pudding layered with custard, sliced banana and vanilla wafers in a clear cup",
    tone: "#3a2c20",
  },
} satisfies Record<string, ImageEntry>;

export type ImageKey = keyof typeof images;
