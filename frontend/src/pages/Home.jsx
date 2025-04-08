import React from "react";
import HeroContentCarousel from "../components/HeroContentCarousel";
import HomePageRooms from "../components/HomePageRooms";
import HomePageTestimonials from "../components/HomePageTestimonials";
import HomePageServices from "../components/HomePageServices";
import HomePageGallery from "../components/HomePageGallery";

export default function Home() {
  return (
    <>
      <HeroContentCarousel />
      <HomePageRooms />
      <HomePageTestimonials />
      <HomePageServices />
      <HomePageGallery />
    </>
  );
}
