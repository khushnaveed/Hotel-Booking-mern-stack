import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";

import emailjs from "emailjs-com";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }



    emailjs
      .send(
        "service_j2sur5t",
        "template_gd6efhj",
        {
          email: email,
        },
        "7s3fyFXl9tvcHb_P8"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setStatus("success");
          setMessage("Thank you for subscribing to our newsletter!");
          setEmail("");
        },
        (err) => {
          console.error("FAILED...", err);
          setStatus("error");
          setMessage("Something went wrong. Please try again later.");
        }
      );
  };

  return (
    <>
      <footer className="bg-[#232323] text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                About Royal Grand Hotel
              </h3>
              <p className="text-gray-300 mb-4">
                Experience luxury and comfort at its finest. Our hotel offers
                world-class amenities and exceptional service to make your stay
                memorable.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/royalgrandhotel" target="_blank" rel="noopener noreferrer" className="hover:text-[#8E7037] transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="https://twitter.com/royalgrandhotel" target="_blank" rel="noopener noreferrer" className="hover:text-[#8E7037] transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="https://www.instagram.com/royalgrandhotel" target="_blank" rel="noopener noreferrer" className="hover:text-[#8E7037] transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="https://www.youtube.com/@royalgrandhotel" target="_blank" rel="noopener noreferrer" className="hover:text-[#8E7037] transition-colors">
                  <Youtube size={20} />
                </a>
              </div>
            </div>



            <div>
              <h3 className="text-xl font-bold mb-4">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="mt-1" size={20} />
                  <p className="text-gray-300">Hirschgässlein 15
                    6073 Basel, Switzerland </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={20} />
                  <p className="text-gray-300">+41 (0)61 5603-497
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={20} />
                  <p className="text-gray-300">grandroyal825@gmail.com </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock size={20} />
                  <p className="text-gray-300">
                    Check-in: 3:00 PM
                    <br />
                    Check-out: 12:00 PM
                  </p>
                </div>
              </div>
            </div>


            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/rooms"
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-gray-300 hover:text-[#8E7037] transition-colors"
                  >
                    Our Rooms
                  </Link>
                </li>
                <li>
                  <Link
                    to="/restaurant"
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-gray-300 hover:text-[#8E7037] transition-colors"
                  >
                    Restaurant
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gallery"
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-gray-300 hover:text-[#8E7037] transition-colors"
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-gray-300 hover:text-[#8E7037] transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-gray-300 hover:text-[#8E7037] transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>


            <div>
              <h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <p className="text-gray-300 mb-4">
                Subscribe to our newsletter for special offers and updates.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-2 bg-[#3e3e3e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="w-full bg-[#8E7037] text-white px-4 py-2 font-semibold hover:bg-[#3e3e3e] transition-colors"
                >
                  Subscribe
                </button>
              </form>

              {status === "success" && (
                <p className="mt-2 text-[#8E7037] text-sm">{message}</p>
              )}
              {status === "error" && (
                <p className="mt-2 text-red-400 text-sm">{message}</p>
              )}
            </div>
          </div>
        </div>


        <div className="border-t border-[#8E7037]">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-[#8E7037] text-sm">
                © {new Date().getFullYear()} Royal Grand Hotel. All rights
                reserved.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a
                  href="https://cordova.co/pages/privacy-policy?gad_source=1&gclid=Cj0KCQjwqv2_BhC0ARIsAFb5Ac9VcMu-FdbKVhevx7-TddpVjsBRLe8ScIUcv_SS-1HG87HoWl7U864aAu67EALw_wcB"
                  className="text-gray-300 hover:text-[#8E7037] text-sm"
                >
                  Privacy Policy
                </a>
                <a
                  href="https://www.termsfeed.com/blog/sample-terms-and-conditions-template/"
                  className="text-gray-300 hover:text-[#8E7037] text-sm"
                >
                  Terms & Conditions
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-[#8E7037] text-sm"
                >
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
