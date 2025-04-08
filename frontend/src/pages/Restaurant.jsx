import { restaurantData } from "../assets/restaurantData";
import { FaTwitter, FaFacebookF, FaInstagram, FaTripadvisor } from "react-icons/fa";

export default function Restaurant() {
  return (
    <>
      {/* Hero Banner */}
      <section
        className="relative w-full h-[80vh] md:h-[40vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://static01.nyt.com/images/2024/02/13/multimedia/LH-pan-seared-salmon-lwzt/LH-pan-seared-salmon-lwzt-superJumbo.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-30" />
        <div className="relative text-white text-center">
          <h1 className="text-5xl font-bold uppercase font-['Playfair_Display']" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
            Restaurant
          </h1>
          <p className="text-lg mt-2" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
            Welcome to our restaurant
          </p>
        </div>
      </section>

      {/* Menu Section */}
      <div className="flex flex-col items-center justify-center relative mt-10">
        <div className="w-full max-w-screen-lg px-4 space-y-12">
          {restaurantData.map((group, i) => (
            <div key={i} className="text-center">
              <h2 className="text-3xl font-semibold font-['Playfair_Display'] mt-6 mb-2">{group.title}</h2>
              <p className="text-gray-500 mb-8">{group.time}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {group.items.map((item, index) => (
                  <div key={index} className="flex gap-5 items-start">
                    <div className="w-[259px] h-[256px] overflow-hidden flex-shrink-0">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                      />
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-semibold font-['Playfair_Display']">{item.name}</h4>
                      <p className="text-gray-600 text-sm mb-2">{item.desc}</p>
                      <p className="font-bold text-[#8E7037]">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2b2a28] w-full text-white mt-20">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-6 py-10">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-12 h-12 border border-[#8E7037] flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#8E7037]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l8 8 8-8" />
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2" stroke="currentColor" fill="none" />
              </svg>
            </div>

            <div className="flex items-center border border-gray-600 px-4 py-2 w-full max-w-md">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow bg-transparent focus:outline-none text-white placeholder:text-gray-400"
              />
              <button className="ml-3 text-xl text-white hover:text-[#8E7037] transition">
                ➤
              </button>
            </div>
          </div>

          <div className="flex gap-6 text-2xl mt-6 md:mt-0">
            <a href="#" className="hover:text-[#8E7037] transition"><FaTwitter /></a>
            <a href="#" className="hover:text-[#8E7037] transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-[#8E7037] transition"><FaTripadvisor /></a>
            <a href="#" className="hover:text-[#8E7037] transition"><FaInstagram /></a>
          </div>
        </div>
      </footer>
    </>
  );
}
