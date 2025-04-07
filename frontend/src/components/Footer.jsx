import React, { useState } from 'react';
import { Phone, Mail,MapPin, Clock, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <>
      {/* Footer */}
      <footer className="bg-[#232323] text-white">
        {/* Main Footer */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Section */}
            <div>
              <h3 className="text-xl font-bold mb-4">About Skyline</h3>
              <p className="text-gray-300 mb-4">
                Experience luxury and comfort at its finest. Our hotel offers world-class amenities and exceptional service to make your stay memorable.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-[#8E7037] transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="hover:text-[#8E7037] transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="hover:text-[#8E7037] transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="hover:text-[#8E7037] transition-colors">
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="mt-1" size={20} />
                  <p className="text-gray-300">Address</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={20} />
                  <p className="text-gray-300">1-548-854-8898</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={20} />
                  <p className="text-gray-300">hello@logo.com</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock size={20} />
                  <p className="text-gray-300">
                    Check-in: 3:00 PM<br />
                    Check-out: 12:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/rooms" className="text-gray-300 hover:text-[#8E7037] transition-colors">Our Rooms</a>
                </li>
                <li>
                  <a href="/restaurant" className="text-gray-300 hover:text-[#8E7037] transition-colors">Restaurant</a>
                </li>
                <li>
                  <a href="/gallery" className="text-gray-300 hover:text-[#8E7037] transition-colors">Gallery</a>
                </li>
                <li>
                  <a href="/about" className="text-gray-300 hover:text-[#8E7037] transition-colors">About Us</a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-300 hover:text-[#8E7037] transition-colors">Contact</a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <p className="text-gray-300 mb-4">Subscribe to our newsletter for special offers and updates.</p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded bg-[#3e3e3e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="w-full bg-[#8E7037] text-white px-4 py-2 rounded font-semibold hover:bg-[#3e3e3e] transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[#8E7037]">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-[#8E7037] text-sm">
                © {new Date().getFullYear()} Skyline Hotel. All rights reserved.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-gray-300 hover:text-[#8E7037] text-sm">Privacy Policy</a>
                <a href="#" className="text-gray-300 hover:text-[#8E7037] text-sm">Terms & Conditions</a>
                <a href="#" className="text-gray-300 hover:text-[#8E7037] text-sm">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
