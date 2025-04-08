import { restaurantData } from "../assets/restaurantData"
//all should install it
//npm install react-icons
import { FaTwitter, FaFacebookF, FaInstagram, FaTripadvisor } from "react-icons/fa";

export default function Restaurant() {
  return (
    <>
      {/*  <div className="relative w-full h-[400px] overflow-hidden">
        <img
          src="https://landing.engotheme.com/html/skyline/demo/images/Restaurants/Restaurants-4.jpg"
          alt="Restaurant Banner"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold">Restaurant</h1>
          <p className="mt-2 text-lg">Welcome to our restaurant</p>
        </div>
      </div> */}



      <section
        className="absolute top-0 left-0 w-full h-[80vh] md:h-[40vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://static01.nyt.com/images/2024/02/13/multimedia/LH-pan-seared-salmon-lwzt/LH-pan-seared-salmon-lwzt-superJumbo.jpg')" }}>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-opacity-40"></div>

        {/* Centered Text */}
        <div className="relative text-white text-center">
          <h1
            className="text-5xl font-bold uppercase "
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
            Restaurant
          </h1>
          <p
            className="text-lg mt-2"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
            Wellcome to our restaurant
          </p>
        </div>
      </section>









      {/* Main Content */}
      <div className=" min-h-screen flex flex-col items-center justify-center pt-[60vh] md:pt-[30vh]">
        {/* Loop through all menu items */}
        <div className="w-full max-w-screen-lg space-y-10">
          {restaurantData.map((group, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center text-center"
            >
              <h2 className="text-2xl font-semibold mt-6 mb-1">{group.title}</h2>
              <p className="text-gray-500 mb-8">{group.time}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 ">
                {group.items.map((item, index) => (
                  // Main flex container for image and text
                  <div key={index} className="flex gap-4">
                    {/* Fixed image container */}
                    <div className="relative w-[259px] h-[256px] overflow-hidden flex-shrink-0">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:opacity-90"
                      />
                    </div>

                    {/* Text container */}
                    <div className="flex flex-col justify-start">
                      <h4 className="text-lg font-semibold">{item.name}</h4>
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


    </>
  );
}










/* 


<footer className="bg-[#2b2a28] w-full text-white">
  <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 px-6 py-8">
    <div className="flex items-center gap-4 w-full md:w-auto">
      <div className="w-12 h-12 border border-[#8E7037] rounded-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-[#8E7037]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4l8 8 8-8"
          />
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="2"
            ry="2"
            stroke="currentColor"
            fill="none"
          />
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
      <a href="#" className="hover:text-[#8E7037] transition">
        <FaTwitter />
      </a>
      <a href="#" className="hover:text-[#8E7037] transition">
        <FaFacebookF />
      </a>
      <a href="#" className="hover:text-[#8E7037] transition">
        <FaTripadvisor />
      </a>
      <a href="#" className="hover:text-[#8E7037] transition">
        <FaInstagram />
      </a>
    </div>
  </div>
</footer>




*/