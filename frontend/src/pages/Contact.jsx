import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import emailjs from "emailjs-com";
import HeroSection from "../components/HeroSection";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setIsSending(true);
    setStatusMessage("Sending...");

    const serviceID = "service_j2sur5t";
    const templateID = "template_3nt27xs";
    const userID = "7s3fyFXl9tvcHb_P8";

    emailjs
      .send(
        serviceID,
        templateID,
        formData,
        userID
      )
      .then(
        (result) => {
          setStatusMessage("Message sent successfully!");
          setFormData({ name: "", email: "", subject: "", message: "" });
          setIsSending(false);
        },
        (error) => {
          setStatusMessage("Failed to send message. Please try again.");
          setIsSending(false);
          console.error(error.text);
        }
      );
  };

  return (
    <>
      <HeroSection
        title="Contact Us"
        subtitle="We’re here to help. Reach out with any questions or inquiries."
        backgroundImage="/heroImage.jpg"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 flex flex-col lg:flex-row justify-between space-y-12 lg:space-y-0 lg:space-x-8">
        <div className="flex-1">
          <h2 className="text-2xl mb-4 text-gray-800 font-bold">Get In Touch</h2>
          <p className="text-justify text-gray-600">
            We’d love to hear from you! Whether you have questions about our
            menu, want to book a table, or need assistance with a special
            request, our team is here to help. Feel free to reach out via phone,
            email, or by visiting us in person. Your feedback is important to
            us, and we always strive to provide the best dining experience. We
            look forward to serving you!
          </p>
          <div className="mt-8 space-y-2">
            <p className="flex items-center text-[13px]">
              <FaMapMarkerAlt className="text-[#bfa76e] mr-2" /> Bahnhofstrasse
              10, 8001 Zürich, Switzerland
            </p>
            <p className="flex items-center text-[13px]">
              <FaPhone className="text-[#bfa76e] mr-2" /> +41 44 123 45 67
            </p>
            <p className="flex items-center text-[13px]">
              <FaEnvelope className="text-[#bfa76e] mr-2" /> info@restaurant.ch
            </p>
          </div>
        </div>

        <div className="max-w-2xl w-full mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-[#8E7037]"
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-[#8E7037]"
              />
            </div>

            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-[#8E7037]"
            />

            <textarea
              id="message"
              name="message"
              placeholder="Write what do you want"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className="w-full px-3 py-2 border border-[#8E7037]"
            ></textarea>

            <button
              type="submit"
              className="px-8 py-2 bg-[#8E7037] text-white hover:bg-white hover:text-[#8E7037] border border-[#8E7037]"
            >
              {isSending ? "Sending..." : "Send"}
            </button>
          </form>
          {statusMessage && <p>{statusMessage}</p>}
        </div>
      </div>

      <div className="w-full mt-12">
        <div className="w-full h-80">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2760.9615597877293!2d8.537040176848566!3d47.376886671168796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a116c5b0f15%3A0xf8c845cfb3c691b5!2sBahnhofstrasse%2010%2C%208001%20Z%C3%BCrich%2C%20Switzerland!5e0!3m2!1sen!2sch!4v1680000000000!5m2!1sen!2sch"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
}
