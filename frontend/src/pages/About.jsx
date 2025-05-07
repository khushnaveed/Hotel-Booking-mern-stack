import React from "react";
import CountUp from "react-countup";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaTripadvisor,
} from "react-icons/fa";

import about1 from "../assets/about.jpg";
import about2 from "../assets/about2.jpg";
import statsBg from "../assets/stats-bg.jpg";
import member1 from "../assets/member1.jpg";
import member2 from "../assets/member2.jpg";
import member3 from "../assets/member3.jpg";
import member4 from "../assets/member4.jpg";
import member5 from "../assets/member5.jpg";
import HeroSection from "../components/HeroSection";

const teamMembers = [
  { name: "SHAMEEM", role: "Pixelated Perfectionist", img: member1 },
  { name: "KHUSH BAKHT", role: "Debugging Ninja", img: member2 },
  { name: "LUIS", role: "UX/UI Wizard", img: member3 },
  { name: "ZAHRA", role: "Debugging Detective", img: member4 },
  { name: "MILLION", role: "Ctrl+Z Heroes", img: member5 },
];

export default function About() {
  return (
    <>
      <HeroSection
        title="About Us"
        subtitle="Discover Our Story. Driven by Passion, Defined by Excellence."
        backgroundImage="/src/assets/heroImage.jpg"
      />

      {/* Wrapper Content */}
      <div className=" relative mt-10">
        {/* Section 1 */}
        <section className="py-16 px-6 md:px-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="overflow-hidden shadow-lg group">
              <img
                src={about1}
                alt="Hotel Lobby"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                About Our Hotel
              </h2>
              <p className="text-gray-600 text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quibusdam neque magni, aliquid voluptatum debitis facere aliquam
                voluptatibus nesciunt tempore voluptates rem perferendis tempora
                odio sequi modi delectus itaque! Officiis, cum. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Quibusdam neque
                magni, aliquid voluptatum debitis facere aliquam voluptatibus
                nesciunt tempore voluptates rem perferendis tempora odio sequi
                modi delectus itaque! Officiis, cum.{" "}
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="py-16 px-6 md:px-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                WHY GUESTS CHOOSE SKYLINE HOTEL?
              </h2>
              <p className="text-gray-600 text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quibusdam neque magni, aliquid voluptatum debitis facere aliquam
                voluptatibus nesciunt tempore voluptates rem perferendis tempora
                odio sequi modi delectus itaque! Officiis, cum.Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Quibusdam neque magni,
                aliquid voluptatum debitis facere aliquam voluptatibus nesciunt
                tempore voluptates rem perferendis tempora odio sequi modi
                delectus itaque! Officiis, cum.
              </p>
            </div>
            <div className="overflow-hidden shadow-lg group">
              <img
                src={about2}
                alt="Hotel Dining"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Stats Section */}
      <section
        className=" text-white py-16 px-4 relative bg-fixed"
        style={{
          backgroundImage: `url(${statsBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40" />
        <div
          className="max-w-6xl mx-auto text-center relative z-10"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
        >
          <h2 className="text-4xl font-bold uppercase mb-10">
            Hotel Statistics
          </h2>
          <div className=" grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Guest Stay", value: 768 },
              { label: "Book Room", value: 632 },
              { label: "Member Stay", value: 1024 },
              { label: "Meals Served", value: 256 },
            ].map((stat, idx) => (
              <div key={idx}>
                <h3 className="text-5xl font-bold">
                  <CountUp end={stat.value} duration={3} />
                </h3>
                <p className="text-lg mt-2 uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className=" py-10 text-center overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-2 uppercase">
            Team Member
          </h2>
          <p className="text-gray-600 mb-12">
            Lorem Ipsum is simply dummy text of the printing
          </p>

          <div className="flex min-w-max justify-start">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="text-center w-64 flex-shrink-0">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-36 h-36 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="text-lg font-bold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500">{member.role}</p>
                <p className="text-sm text-gray-600 mt-4">
                  Active Participation: Every member contributes to discussions,
                  offering ideas and support.
                </p>
                <div className="flex justify-center mt-4 space-x-4 text-gray-500 text-lg">
                  <FaTwitter className="hover:text-blue-400 cursor-pointer" />
                  <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
                  <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                  <FaTripadvisor className="hover:text-green-600 cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
