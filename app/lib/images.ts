export type PortfolioImage = {
  src: string;
  alt: string;
  category: string;
  type?: "image" | "video";
};

export const heroImage: PortfolioImage = {
  src: "/assets/naaabea09/naaabea09_hero_cutout.png",
  alt: "Naa Abea Benjamin-Addy — full body cutout portrait",
  category: "Portrait",
  type: "image",
};

export const galleryImages: PortfolioImage[] = [
  {
    src: "/assets/naaabea09/malcomprince__1776331711_3876472554047462273_1729534148.jpg",
    alt: "Artistic fruit still-life editorial",
    category: "Editorial",
  },
  {
    src: "/assets/naaabea09/naaabea09_1767553629_3802837925814077534_18489434281.jpg",
    alt: "Studio portrait in black off-shoulder top",
    category: "Portrait",
  },
  {
    src: "/assets/naaabea09/naaabea09_1767816797_3805045543886426177_18489434281.jpg",
    alt: "Outdoor fashion shot in red top",
    category: "Lifestyle",
  },
  {
    src: "/assets/naaabea09/naaabea09_1768590112_3811532574837727831_18489434281.jpg",
    alt: "Warm brick wall editorial",
    category: "Editorial",
  },
  {
    src: "/assets/naaabea09/naaabea09_1768935805_3814432463833823399_18489434281.jpg",
    alt: "Golden interior fashion portrait",
    category: "Lifestyle",
  },
  {
    src: "/assets/naaabea09/naaabea09_1769365570_3818037594638819701_18489434281.jpg",
    alt: "Studio portrait in blue dress",
    category: "Portrait",
  },
  {
    src: "/assets/naaabea09/naaabea09_1773947456_3856472951080140640_18489434281.jpg",
    alt: "Fashion store editorial on red couch",
    category: "Campaign",
  },
  {
    src: "/assets/naaabea09/naaabea09_1779185143_3900410055771592849_18489434281.jpg",
    alt: "Studio portrait in pink and brown dress",
    category: "Portrait",
  },
  {
    src: "/assets/naaabea09/popderi_1783374837_3935550792898046402_54019875422.jpg",
    alt: "High-fashion concrete editorial with red heels",
    category: "Editorial",
  },
  {
    src: "/assets/naaabea09/_blushbybenewa_1775638205_3870656269648683071_56623677886.jpg",
    alt: "Beauty close-up portrait",
    category: "Beauty",
  },
  {
    src: "/assets/naaabea09/naaabea09_1772800773_3846852639547993434_18489434281.jpg",
    alt: "Casual mural portrait in Ghana jersey",
    category: "Lifestyle",
  },
  {
    src: "/assets/naaabea09/naaabea09_1765030193_3781669810816427757_18489434281.jpg",
    alt: "Beach collage moment",
    category: "Lifestyle",
  },
  {
    src: "/assets/naaabea09/naaabea09_1766339494_3792651293014129860_18489434281.mp4",
    alt: "Behind the scenes video",
    category: "Motion",
    type: "video",
  },
  {
    src: "/assets/naaabea09/naaabea09_1773947456_3856472938799211250_18489434281.mp4",
    alt: "Campaign video clip",
    category: "Motion",
    type: "video",
  },
];
