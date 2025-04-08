import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Rooms() {
  const navigate = useNavigate();

  return (
    <>
        {/* Hero Section */}
     <section
        className="absolute top-0 left-0 w-full h-[30vh] md:h-[40vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/src/assets/aboutHero.jpg')" }}>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-opacity-40"></div>

        {/* Centered Text */}
        <div className="relative text-white text-center">
          <h1 className="text-5xl font-bold uppercase " style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>ROOMS </h1>
           <p className="text-lg mt-2" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
            Lorem Ipsum is simply dummy text of the printing
           </p>
        </div>
      </section>

      <div className="mt-[35vh] flex flex-row flex-wrap gap-4 justify-center items-center">
        
        {/* Room 1 */}
        <div className='relative overflow-hidden group sm:w-[100%] '>
          <img src="/src/assets/room-34.jpg" alt="" className="transition-all duration-300 transform group-hover:scale-120 object-cover w-full h-full group-hover:filter group-hover:brightness-75" />
          <div className="absolute top-0 left-0 h-full w-[40%] bg-black bg-opacity-20 text-white p-4 flex flex-col pl-6 pt-14" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
            <h1 className='font-bold text-4xl'>LUXURY ROOM</h1>
            <h6 className='text-[#bfa76e]'>Start from $120 per day</h6>
            <p className="mt-6">Our luxury room is designed for guests who enjoy elegance and comfort. It features a spacious layout with a king-size bed, modern furniture, a private balcony, and a large bathroom with a spa-style bathtub. It’s perfect for those looking for a premium and relaxing experience.</p>
            <ul className="list-disc pl-5 mt-6">
              <li>Max: 4 Person(s)</li>
              <li>Size: 35 m2 / 376 ft2</li>
              <li>View: Ocean</li>
              <li>Bed: King-size or twin beds</li>
            </ul>
            <br />
            <button   onClick={() => navigate('/rooms/luxury')}
                      className="px-6 py-2 bg-[#8E7037] text-white hover:bg-white hover:text-[#8E7037] border-2 border-[#8E7037] w-max mt-4 ml-6">View Details</button>
          </div>
        </div>

        {/* Room 2 */}
        <div className='relative overflow-hidden group sm:w-[100%]'>
          <img src="/src/assets/room-35.jpg" alt="" className="transition-all duration-300 transform group-hover:scale-120 object-cover w-full h-full group-hover:filter group-hover:brightness-75" />
          <div className="absolute top-0 right-0 h-full w-[40%] bg-black bg-opacity-20 text-white p-4 flex flex-col pl-6 pt-14" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
            <h1 className='font-bold text-4xl '>FAMILY ROOM</h1>
            <h6 className='text-[#bfa76e]'>Start from $220 per day</h6>
            <p className="mt-6">The family room is ideal for guests traveling with children. It offers plenty of space, multiple beds, and a cozy seating area. With its warm and practical design, it provides comfort and convenience for the whole family.</p>
            <ul className="list-disc pl-5 mt-6">
              <li>Max: 4 Person(s)</li>
              <li>Size: 35 m2 / 376 ft2</li>
              <li>View: Ocean</li>
              <li>Bed: King-size or twin beds</li>
            </ul>
            <br />
            <button    onClick={() => navigate('/rooms/family')}
                       className="px-6 py-2 bg-[#8E7037] text-white hover:bg-white hover:text-[#8E7037] border-2 border-[#8E7037] w-max mt-4 ml-6">View Details</button>
          </div>
        </div>

        {/* Room 3 */}
        <div className='relative overflow-hidden group sm:w-[100%]'>
          <img src="/src/assets/room-36.jpg" alt="" className="transition-all duration-300 transform group-hover:scale-120 object-cover w-full h-full group-hover:filter group-hover:brightness-75" />
          <div className="absolute top-0 left-0 h-full w-[40%] bg-black bg-opacity-20 text-white p-4 flex flex-col pl-6 pt-14" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
            <h1 className='font-bold text-4xl mt-8'>COUPLE ROOM</h1>
            <h6 className='text-[#bfa76e]'>Start from $420 per day</h6>
            <p className="mt-6 ">Perfect for two, the couple room offers a romantic and peaceful setting. It includes a comfortable double bed, soft lighting, and stylish decor to create a cozy atmosphere. This room is great for couples looking to relax and enjoy quality time together.</p>
            <ul className="list-disc pl-5 mt-6">
              <li>Max: 4 Person(s)</li>
              <li>Size: 35 m2 / 376 ft2</li>
              <li>View: Ocean</li>
              <li>Bed: King-size or twin beds</li>
            </ul>
            <br />
            <button   onClick={() => navigate('/rooms/couple')}
 className="px-6 py-2 bg-[#8E7037] text-white hover:bg-white hover:text-[#8E7037] border-2 border-[#8E7037] w-max mt-4 ml-6">View Details</button>
          </div>
        </div>

        {/* Room 4 */}
        <div className='relative overflow-hidden group sm:w-[100%]'>
          <img src="/src/assets/room-37.jpg" alt="" className="transition-all duration-300 transform group-hover:scale-120 object-cover w-full h-full group-hover:filter group-hover:brightness-75" />
          <div className="absolute top-0 right-0 h-full w-[40%] bg-black bg-opacity-20 text-white p-4 flex flex-col pl-6 pt-14" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
            <h1 className='font-bold text-4xl'>STANDARD ROOM</h1>
            <h6 className='text-[#bfa76e] '>Start from $100 per day</h6>
            <p className="mt-6 ">Our standard room is a simple yet comfortable option for solo travelers or short stays. It includes a single or double bed, a clean bathroom, and all the basic amenities needed for a pleasant stay at an affordable price.</p>
            <ul className="list-disc pl-5 mt-6">
              <li>Max: 4 Person(s)</li>
              <li>Size: 35 m2 / 376 ft2</li>
              <li>View: Ocean</li>
              <li>Bed: King-size or twin beds</li>
            </ul>
            <br />
            <button   onClick={() => navigate('/rooms/standard')}

        className="px-6 py-2 bg-[#8E7037] text-white hover:bg-white hover:text-[#8E7037] border-2 border-[#8E7037] w-max mt-4 ml-6">View Details</button>
          </div>
        </div>
      </div>
    </>
  )
}
