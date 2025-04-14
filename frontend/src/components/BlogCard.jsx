import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function BlogCard({ date, title, image, excerpt, showCountdown, slug }) {
  const [day, month] = date.split(" "); // Assume date format is "Day Month"
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!showCountdown) return;

    const targetDate = new Date("2025-12-31T23:59:59"); // Example target date
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
        <img
          src={image}
          alt={title}
          className="w-full h-auto rounded-md transition-transform duration-300 group-hover:scale-102"
        />
        <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold">
          <div>{day}</div>
          <div>{month}</div>
        </div>

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
      {/* Make sure only one Link component is wrapping the text content */}
      <Link
        to={`/events/${slug}`}
        className="lg:w-3/5 group cursor-pointer no-underline text-inherit"
      >
        <h3 className="text-xl font-bold mb-2 group-hover:underline">{title}</h3>
        <p className="text-gray-700 mb-2">{excerpt}</p>
        <span className="text-blue-500">Read More</span>
      </Link>
    </div>
  );
}

export default BlogCard;
