import React from "react";
import HeroContentCarousel from "../components/homePageComponents/HeroContentCarousel";
import HomePageRooms from "../components/homePageComponents/HomePageRooms";
import HomePageTestimonials from "../components/homePageComponents/HomePageTestimonials";
import HomePageServices from "../components/homePageComponents/HomePageServices";
import HomePageGallery from "../components/homePageComponents/HomePageGallery";

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
