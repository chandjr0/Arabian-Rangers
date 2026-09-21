import heroDesert from "@/assets/hero-desert.webp";
import buggy from "@/assets/buggy.webp";
import dubai from "@/assets/dubai.webp";
import abudhabi from "@/assets/abudhabi.webp";
import camp from "@/assets/camp.webp";
import sand from "@/assets/sand.webp";
import founder from "@/assets/founder.webp";

export const images = { heroDesert, buggy, dubai, abudhabi, camp, sand, founder };

export const brand = {
  name: "Arabian Rangers Tourism",
  short: "Arabian Rangers",
  tagline: "Experience the Magic of the UAE, with us.",
  founder: "Nihad Ali",
  founderRole: "Founder & CEO",
  category: "Travel Arrangements / UAE Tourism",
  /** No verified public number supplied — integration stays disabled until one is. */
  whatsapp: null as string | null,
  email: null as string | null,
};

export const social = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/arabian-max-rangers-tourism/",
  },
  { label: "Instagram", href: null as string | null },
  { label: "Facebook", href: null as string | null },
] as const;

export const nav = [
  { label: "Experiences", to: "/experiences" },
  { label: "Destinations", to: "/destinations" },
  { label: "About", to: "/about" },
  { label: "Journal", to: "/journal" },
  { label: "Contact", to: "/contact" },
] as const;

export type Experience = {
  slug: string;
  title: string;
  heroLine: string;
  summary: string;
  intro: string;
  image: string;
  location: string;
  coords: string;
  kind: string;
  highlights: { label: string; body: string }[];
  layout: "left" | "right" | "full";
};

export const experiences: Experience[] = [
  {
    slug: "desert-safari",
    title: "Desert Safari",
    heroLine: "Into the dunes.",
    summary: "Dune experiences, desert landscapes and traditional camp atmosphere.",
    intro:
      "The dunes outside the city change hour by hour. A safari with Arabian Rangers is built around that shift — the drive out, the light dropping, the quiet of a desert camp.",
    image: heroDesert,
    location: "Dubai Desert, UAE",
    coords: "24°48′N 55°34′E",
    kind: "Desert",
    layout: "left",
    highlights: [
      { label: "The drive", body: "Dune terrain covered in a 4x4, guided by drivers who know the sand." },
      { label: "The light", body: "Composed around the hours when the desert is at its most cinematic." },
      { label: "The camp", body: "Traditional desert camp atmosphere once the sun is down." },
      { label: "The detail", body: "Duration, pickup and inclusions are arranged per booking — tell us your plan." },
    ],
  },
  {
    slug: "dubai-city-tour",
    title: "Dubai City Tour",
    heroLine: "The city, read closely.",
    summary: "Explore Dubai's modern skyline, landmarks and urban character.",
    intro:
      "Dubai is not a view. It is a set of contrasts — creek and skyline, old souk and new tower — covered in one considered route.",
    image: dubai,
    location: "Dubai, UAE",
    coords: "25°12′N 55°16′E",
    kind: "City",
    layout: "right",
    highlights: [
      { label: "Skyline", body: "Modern architecture seen from the angles that actually work." },
      { label: "Landmarks", body: "The city's defining places, paced so you can look at them." },
      { label: "Character", body: "Streets, water and neighbourhoods beyond the postcard." },
      { label: "The detail", body: "Route and timing are shaped to your group on request." },
    ],
  },
  {
    slug: "abu-dhabi-city-tour",
    title: "Abu Dhabi City Tour",
    heroLine: "The capital, up close.",
    summary: "Discover the capital's architecture, culture and landmarks.",
    intro:
      "Abu Dhabi carries a different weight — wider, quieter, more deliberate. The tour follows the waterfront, the cultural landmarks and the architecture that defines the capital.",
    image: abudhabi,
    location: "Abu Dhabi, UAE",
    coords: "24°28′N 54°22′E",
    kind: "City",
    layout: "left",
    highlights: [
      { label: "Architecture", body: "Contemporary and cultural landmarks across the capital." },
      { label: "Waterfront", body: "The corniche and the coastline that frames the city." },
      { label: "Culture", body: "Places that explain how the capital sees itself." },
      { label: "The detail", body: "Stops are confirmed with you before travel." },
    ],
  },
  {
    slug: "buggy-rides",
    title: "Buggy Rides",
    heroLine: "Full throttle.",
    summary: "High-energy desert adventure through the dunes.",
    intro:
      "Sand, engine, horizon. Buggy rides are the loudest thing we do, run over open dune terrain with guidance throughout.",
    image: buggy,
    location: "Dubai Desert, UAE",
    coords: "24°51′N 55°29′E",
    kind: "Adventure",
    layout: "full",
    highlights: [
      { label: "The terrain", body: "Open dunes with real elevation, not a flat practice track." },
      { label: "The machine", body: "Vehicle options are confirmed at booking — we do not guess specifications." },
      { label: "The experience", body: "Short, physical, memorable." },
      { label: "Safety", body: "Briefing and guidance are part of every ride. Requirements confirmed on enquiry." },
    ],
  },
  {
    slug: "uae-adventures",
    title: "UAE Adventures",
    heroLine: "Beyond the itinerary.",
    summary: "Curated experiences across the UAE.",
    intro:
      "Not everything fits a category. Tell us the kind of trip you want across the Emirates and we build it around you.",
    image: camp,
    location: "United Arab Emirates",
    coords: "23°25′N 53°50′E",
    kind: "Custom",
    layout: "right",
    highlights: [
      { label: "Custom routing", body: "Experiences assembled around your dates, group and interests." },
      { label: "Group departures", body: "Arrangements for larger groups travelling together." },
      { label: "Mixed formats", body: "Desert, city and adventure combined in one plan." },
      { label: "The detail", body: "Everything is quoted per request." },
    ],
  },
  {
    slug: "hotel-bookings",
    title: "Hotel Bookings",
    heroLine: "Where you land.",
    summary: "Travel support extending beyond activities.",
    intro:
      "Arabian Rangers arranges accommodation alongside experiences, so the trip holds together from arrival to departure.",
    image: sand,
    location: "United Arab Emirates",
    coords: "24°28′N 54°22′E",
    kind: "Travel",
    layout: "left",
    highlights: [
      { label: "Arranged with the trip", body: "Stays booked alongside the experiences you choose." },
      { label: "Group travel", body: "Support for group departures and multi-room bookings." },
      { label: "Flexible", body: "Options presented against your dates and budget." },
      { label: "The detail", body: "Properties and rates are confirmed on enquiry." },
    ],
  },
];

export const destinations = [
  {
    name: "Dubai",
    coords: "25°12′N 55°16′E",
    note: "Skyline, creek and the dune belt that starts where the roads end.",
    image: dubai,
  },
  {
    name: "Abu Dhabi",
    coords: "24°28′N 54°22′E",
    note: "The capital — architecture, waterfront and cultural landmarks.",
    image: abudhabi,
  },
  {
    name: "The Desert",
    coords: "24°48′N 55°34′E",
    note: "Open dunes, camps and the terrain that defines the Emirates.",
    image: heroDesert,
  },
];

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  body: string[];
  quote: string;
  related: string;
};

export const posts: Post[] = [
  {
    slug: "reading-the-dunes",
    title: "Reading the dunes",
    date: "2026",
    category: "Desert",
    excerpt: "Why the same stretch of sand never looks the same twice.",
    image: heroDesert,
    quote: "The desert is not empty. It is edited, hourly, by wind and light.",
    related: "desert-safari",
    body: [
      "Sand keeps no record. A ridge that reads as permanent in the morning is gone by evening, redrawn a few metres north by wind that never asked permission.",
      "That is the reason a safari is never a repeat. The route is a suggestion; the terrain writes the rest of it on the day.",
      "What stays constant is the sequence — the drive out, the drop in temperature, the moment the engine stops and the noise of the city is simply not there anymore.",
    ],
  },
  {
    slug: "the-city-and-the-sand",
    title: "The city and the sand",
    date: "2026",
    category: "Dubai",
    excerpt: "Dubai makes most sense when you see both sides in one day.",
    image: dubai,
    quote: "Twenty minutes separates the tallest building on earth from total silence.",
    related: "dubai-city-tour",
    body: [
      "Most visitors see one Dubai: towers, glass, traffic, a viewing deck. It is impressive and incomplete.",
      "The version worth travelling for is the contrast — the skyline behind you, the dune belt in front, and the short drive that connects them.",
      "Plan the city for daylight and the desert for the last two hours of it. The order matters more than the itinerary.",
    ],
  },
  {
    slug: "packing-for-the-uae",
    title: "Packing for the UAE",
    date: "2026",
    category: "Travel notes",
    excerpt: "Short, practical notes for first-time travellers to the Emirates.",
    image: sand,
    quote: "Bring less. Bring layers. Bring shoes you do not mind filling with sand.",
    related: "uae-adventures",
    body: [
      "Daytime heat and evening desert air are two different climates. A light layer solves most of it.",
      "Closed shoes for dune terrain, sunglasses for glare off the sand, and more water than you think.",
      "For cultural sites, modest clothing keeps every door open. Nothing else is complicated.",
    ],
  },
];

export const experienceOptions = experiences.map((e) => e.title);
