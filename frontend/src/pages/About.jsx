import React from "react";
import statsBg from "../assets/stats-bg.jpg"; // adjust the path as needed
import CountUp from "react-countup";

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="absolute top-0 left-0 w-full h-[80vh] md:h-[40vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/src/assets/heroImage.jpg')" }}>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-opacity-40"></div>

        {/* Centered Text */}
        <div className="relative text-white text-center">
          <h1
            className="text-5xl font-bold uppercase "
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
            About Us
          </h1>
          <p
            className="text-lg mt-2"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
            Lorem Ipsum is simply dummy text of the printing
          </p>
        </div>
      </section>

      {/* Wrapper to avoid overlap */}
      <div className="relative pt-[60vh] md:pt-[30vh] mt-10">
        {/* Section 1 */}
        <section className=" py-16 px-6 md:px-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="overflow-hidden shadow-lg group">
              <img
                src="/src/assets/about.jpg"
                alt="Hotel Lobby"
                className="w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                About Our Hotel
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy. There
                are many variations of passages of Lorem Ipsum available, but
                the majority have suffered alteration in some form, by injected
                humour, or randomised words which don't look even slightly
                believable. If you are going to use a passage of Lorem Ipsum,
                you need to be sure
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 with reversed layout */}
        <section className="py-16 px-6 md:px-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Text first on large screens */}
            <div className="md:order-1">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                WHY GUESTS CHOOSE SKYLINE HOTEL?
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
            </div>

            {/* Image second on large screens */}
            <div className="overflow-hidden shadow-lg group md:order-2">
              <img
                src="/src/assets/about2.jpg"
                alt="Hotel Dining"
                className="w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        </section>
      </div>
      {/* ✅ Hotel Statistics Section - now outside and full width */}
      <section
        className="text-white py-16 px-4 relative bg-fixed"
        style={{
          backgroundImage: `url(${statsBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw", // <- force full viewport width
          marginLeft: "calc(-50vw + 50%)",
        }}>
        {/* Optional: Add dark overlay */}
        <div className="absolute inset-0 z-0"></div>

        <div
          className="max-w-6xl mx-auto text-center relative z-10"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
          <h2 className="text-4xl font-bold uppercase mb-10">
            Hotel Statistics
          </h2>
          {/* ...inside your component... */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-5xl font-bold">
                <CountUp end={768} duration={3} />
              </h3>
              <p className="text-lg mt-2 uppercase">Guest Stay</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold">
                <CountUp end={632} duration={3} />
              </h3>
              <p className="text-lg mt-2 uppercase">Book Room</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold">
                <CountUp end={1024} duration={3} />
              </h3>
              <p className="text-lg mt-2 uppercase">Member Stay</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold">
                <CountUp end={256} duration={3} />
              </h3>
              <p className="text-lg mt-2 uppercase">Meals Served</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 text-center overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-2 uppercase">
            Team Member
          </h2>
          <p className="text-gray-600 mb-12">
            Lorem Ipsum is simply dummy text of the printing
          </p>

          <div className="flex gap-10 min-w-max justify-start">
            {[
              {
                name: "SHAMEEM ",
                role: "Pixelated Perfectionist",
                img: "/src/assets/member1.jpg",
              },
              {
                name: "KHUSH BAKHT",
                role: "Debugging Ninja",
                img: "/src/assets/member2.jpg",
              },
              {
                name: "LUIS",
                role: "UX/UI Wizard",
                img: "/src/assets/member3.jpg",
              },
              {
                name: "ZAHRA ",
                role: "Debugging Detective",
                img: "/src/assets/member4.jpg",
              },
              {
                name: "MILLION ",
                role: "Ctrl+Z Heroes",
                img: "/src/assets/member5.jpg",
              },
            ].map((member, idx) => (
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
                Active Participation: Every member of the group contributes to discussions, offering ideas, feedback, and suggestions. They don’t just wait for instructions but take ownership of tasks and encourage each other to share their thoughts.
                </p>
                <div className="flex justify-center mt-4 space-x-4 text-gray-500 text-lg">
                  <i className="fab fa-twitter"></i>
                  <i className="fab fa-facebook-f"></i>
                  <i className="fab fa-instagram"></i>
                  <i className="fab fa-tripadvisor"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
