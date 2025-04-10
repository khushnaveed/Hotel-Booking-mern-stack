import React from 'react';
import { Star } from 'lucide-react';

const Testimonial = ({ name, location, comment, rating, image }) => {
  return (
    <div className="bg-white p-8 shadow-md">
      <div className="flex items-center mb-4">
        <img src={image} alt={name} className="w-14 h-14 rounded-full object-cover mr-4" />
        <div>
          <h4 className="font-medium text-hotel-dark">{name}</h4>
          <p className="text-sm text-hotel-gray">{location}</p>
        </div>
      </div>
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star 
            key={index} 
            size={16}
            className={index < rating ? "text-[#8E7037] fill-[#8E7037]" : "text-gray-300"} 
          />
        ))}
      </div>
      <p className="text-gray-500 text-sm italic">"{comment}"</p>
    </div>
  );
};

const HomePageTestimonials = () => {
  const testimonials = [
    {
      name: "Emily Johnson",
      location: "New York, USA",
      comment: "Our stay at SkyView was exceptional. The staff went above and beyond to make our anniversary special. The room was luxurious and the views were breathtaking.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
    },
    {
      name: "David Chen",
      location: "Toronto, Canada",
      comment: "Perfect for business travel. The rooms are spacious and well-equipped, and the WiFi is reliable. The breakfast selection is impressive and the location is convenient.",
      rating: 4,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80"
    },
    {
      name: "Maria Rodriguez",
      location: "Madrid, Spain",
      comment: "We had a wonderful family vacation at SkyView. The rooms were comfortable, the pool was perfect for the kids, and the restaurant offered excellent options for everyone.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-5xl">What Our Guests Say</h2>
          <p className="text-gray-500  m-4">
            Discover what makes SkyView special through the experiences of our valued guests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              name={testimonial.name}
              location={testimonial.location}
              comment={testimonial.comment}
              rating={testimonial.rating}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePageTestimonials;