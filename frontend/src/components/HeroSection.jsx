import React from 'react'

export default function HeroSection({ title, subtitle, backgroundImage }) {
  return (
    <section
      className="relative top-0 left-0 w-full h-[80vh] md:h-[40vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Centered Text */}
      <div className="relative text-white text-center mt-7">
        <h1
          className="text-5xl font-bold uppercase"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
        >
          {title}
        </h1>
        <p
          className="text-lg mt-2 whitespace-pre-line"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
        >
          {subtitle}
        </p>
      </div>
    </section>
  )
}
