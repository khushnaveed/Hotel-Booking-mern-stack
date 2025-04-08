import React from "react";
import HeroContentCarousel from "../components/HeroContentCarousel";
import HomePageRooms from "../components/HomePageRooms";
import HomePageTestimonials from "../components/HomePageTestimonials";

export default function Home() {
  return (
    <>
      <HeroContentCarousel />
      <HomePageRooms />
      <HomePageTestimonials />
    </>
  );
}
