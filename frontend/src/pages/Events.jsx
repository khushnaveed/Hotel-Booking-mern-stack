import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BlogCard({ date, title, image, excerpt, showCountdown }) {
  const [day, month] = date.split(" ");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!showCountdown) return;

    const targetDate = new Date("2025-12-31T23:59:59"); // Change to your event date
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [showCountdown]);

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Image with Countdown */}
      <div className="relative w-full lg:w-2/5 group">
        <img src={image} alt={title} className="w-full h-auto rounded-md transition-transform duration-300 group-hover:scale-102" />
        <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold">
          <div>{day}</div>
          <div>{month}</div>
        </div>

        {/* Conditional Countdown */}
        {showCountdown && (
          <div className="absolute bottom-0 left-0 w-full bg-yellow-900/90 text-white px-4 py-2 flex justify-around text-center text-[10px] md:text-xs font-semibold uppercase tracking-wider">
            <div>
              <p className="text-base md:text-xl">{timeLeft.days}</p>
              <p>Days</p>
            </div>
            <div>
              <p className="text-base md:text-xl">{timeLeft.hours}</p>
              <p>Hours</p>
            </div>
            <div>
              <p className="text-base md:text-xl">{timeLeft.minutes}</p>
              <p>Minutes</p>
            </div>
            <div>
              <p className="text-base md:text-xl">{timeLeft.seconds}</p>
              <p>Seconds</p>
            </div>
          </div>
        )}
      </div>

      {/* Text Content */}
      <div className="lg:w-3/5">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700 mb-2">{excerpt}</p>
        <p className="text-xs text-gray-500">
          Posted by <span className="font-bold">Jeanette Owens</span> - Travel
        </p>
      </div>
    </div>
  );
}

export default function Events() {
  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative top-0 left-0 w-full h-[80vh] md:h-[40vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/src/assets/heroImage.jpg')" }}>
        <div className="absolute inset-0  bg-opacity-40"></div>
        <div className="relative text-white text-center">
          <h1
            className="text-5xl font-bold uppercase"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
            Events
          </h1>
          <p
            className="text-lg mt-2"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
            Lorem Ipsum is simply dummy text of the printing
          </p>
        </div>
      </section>

      {/* MAIN BLOG CONTENT */}
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDEBAR */}
        <aside className="lg:col-span-1 space-y-8">
          <section>
            <h2 className="font-bold text-lg mb-4">CATEGORIES</h2>
            <ul className="space-y-2 text-gray-700">
              <li>Food & Drink (4)</li>
              <li>Rendering (2)</li>
              <li>Travel (7)</li>
              <li>Uncategorized (1)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-4">UPCOMING EVENTS</h2>
            <ul className="space-y-4">
              <li className="border-l-4 border-black pl-4">
                <p className="text-sm font-bold">23 JAN</p>
                <p className="text-sm">SINGLE EVENT ROOM</p>
              </li>
              <li className="border-l-4 border-black pl-4">
                <p className="text-sm font-bold">18 JAN</p>
                <p className="text-sm">EVENT WEDDING 1</p>
              </li>
              <li className="border-l-4 border-black pl-4">
                <p className="text-sm font-bold">07 JAN</p>
                <p className="text-sm">EVENT WEDDING 2</p>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-4">DEAL</h2>
            <div className="relative [&_img]:rounded-none group">
              <img
                src="/src/assets/EventsLuxuryRoom.jpg"
                alt="Luxury Room"
                className="rounded-md w-full object-cover transition-transform duration-300 group-hover:scale-102"
              />
              <div className="absolute bottom-2 left-2 bg-white px-3 py-1 font-bold  hover:bg-[#6f5525]">
                {/* Wrap the button text in Link */}
                <Link
                  to="/rooms/luxury-suite"
                  className="block  text-black hover:text-white text-center py-2 px-4 rounded-lg  transition duration-300">
                  LUXURY ROOM
                  <br />
                  $220
                </Link>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-4">RECENT POSTS</h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <img
                  src="/src/assets/EventsSurfing.jpg"
                  alt="Relaxing & Travel"
                  className="w-12 h-12 object-cover "
                />
                <span>RELAXING & TRAVEL IN OUR HOTEL</span>
              </li>
              <li className="flex items-center gap-3">
                <img
                  src="/src/assets/EventsWedding.jpg"
                  alt="Wedding"
                  className="w-12 h-12 object-cover "
                />
                <span>ONE NIGHT WEDDING WITH JESSICA & ROBET</span>
              </li>
              <li className="flex items-center gap-3">
                <img
                  src="/src/assets/EventsFishing.jpg"
                  alt="Fishing"
                  className="w-12 h-12 object-cover "
                />
                <span>FISHING WITH LOTUS HOTEL</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-4">TAGS</h2>
            <div className="flex flex-wrap gap-2">
              {["Hotel", "Room", "Service", "Design", "Luxury", "Wedding"].map(
                (tag, i) => (
                  <span
                    key={i}
                    className="border border-gray-300 px-2 py-1 text-sm">
                    {tag}
                  </span>
                )
              )}
            </div>
          </section>

          <section>
            <h2 className="font-bold text-lg mb-4">SOCIALS</h2>
            <div className="flex space-x-4">
              <div className="w-6 h-6 bg-gray-300 rounded-full" />
              <div className="w-6 h-6 bg-gray-300 rounded-full" />
              <div className="w-6 h-6 bg-gray-300 rounded-full" />
            </div>
          </section>
        </aside>

        {/* BLOG LIST */}
        <main className="lg:col-span-3 space-y-12 [&_img]:rounded-none">
          <BlogCard
            date="23 JAN"
            title="SURFING"
            image="/src/assets/EventsSurfing.jpg"
            excerpt=" Dive into an unforgettable adventure with our exclusive Surfing experience. Whether you're a seasoned pro or a beginner eager to catch your first wave, we provide the perfect setting for surf enthusiasts of all levels. With expert instructors and pristine, crystal-clear waters, you’ll experience the thrill of the ocean like never before. Feel the rush as you ride the waves, soaking in the sun and the stunning surroundings. This is your ultimate surfing escape, where adventure and relaxation blend perfectly."
            showCountdown // 👈 only here
          />
          <BlogCard
            date="18 JAN"
            title="EXCLUSIVE HELICOPTER CHARTER"
            image="https://www.sme.org/globalassets/sme.org/technologies/articles/2018/10---october/airbus_exph-768x555.jpg"
            excerpt="Elevate your journey with our Exclusive Helicopter Charter service, offering unparalleled luxury and convenience. Skip the crowded airports and experience the thrill of flying above the city in complete comfort. Whether you're heading to a business meeting, a special event, or taking in breathtaking aerial views, our private helicopter service ensures you travel in style and exclusivity. With personalized itineraries and first-class service, this is an experience designed for those who value both time and luxury."
          />
          <BlogCard
            date="16 JAN"
            title="ONE NIGHT WEDDING WITH JESSICA & ROBET"
            image="/src/assets/EventsWedding.jpg"
            excerpt=" Step into a magical fairytale with the One Night Wedding of Jessica & Robet, an enchanting celebration of love and commitment. Held in the heart of our elegant venue, the event was a perfect blend of romance and sophistication. From the heartfelt vows exchanged under the stars to the dazzling reception surrounded by friends and family, every moment was filled with joy. It was an evening to remember, where timeless love and unforgettable memories were made, forever etched in the hearts of all who attended."
          />
          <BlogCard
            date="06 JAN"
            title="LUXURY YACHT EXPERIENCE "
            image="https://www.charterworld.com/images/headers-6/charter-yacht-11-11-at-night.jpg"
            excerpt=" Experience the ultimate in luxury with our Luxury Yacht Experience, where elegance meets the open sea. Step aboard a world-class yacht and embark on a voyage through crystal-clear waters, enjoying the perfect blend of comfort and adventure. Whether you're cruising along the coastline, basking in the sun on the deck, or enjoying a gourmet meal prepared by a private chef, every detail of this journey is tailored to your desires. Set sail on a once-in-a-lifetime experience that offers exclusivity, relaxation, and unparalleled views."
          />
        </main>
      </div>
    </>
  );
}
