import React from "react";
import { Utensils, Wifi, Car, Clock } from "lucide-react";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-8 shadow-md flex flex-col items-center text-center transition-transform hover:-translate-y-1">
      <div className="text-[#8E7037] mb-4">{icon}</div>
      <h3 className="font-playfair text-xl mb-3">{title}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
};

const HomePageServices = () => {
  const features = [
    {
      icon: <Utensils size={40} />,
      title: "Restaurant & Bar",
      description:
        "Enjoy exquisite dining with our world-class chefs and premium selection of wines and spirits.",
    },
    {
      icon: <Wifi size={40} />,
      title: "Free WiFi",
      description:
        "Stay connected with complimentary high-speed WiFi throughout our property.",
    },
    {
      icon: <Car size={40} />,
      title: "Parking & Transport",
      description:
        "Convenient parking facilities and transportation services to meet your travel needs.",
    },
    {
      icon: <Clock size={40} />,
      title: "24/7 Service",
      description:
        "Our dedicated staff is available around the clock to ensure your comfort and satisfaction.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-5xl">Discover Our Hotel & Services</h2>
          <p className="text-gray-500 m-4">
            Experience unparalleled luxury and comfort at SkyView Hotel. Our
            dedication to excellence ensures that every stay is memorable, with
            personalized service and attention to every detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePageServices;
