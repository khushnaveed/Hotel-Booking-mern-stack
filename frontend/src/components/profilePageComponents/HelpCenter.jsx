import React, { useState } from "react";
import {
  Mail,
  Phone,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HelpCenter = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How do I modify my reservation?",
      answer:
        "You can modify your reservation up to 48 hours before check-in through your reservations page. Select the booking you wish to modify and click 'Edit Reservation'.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Our standard cancellation policy allows free cancellation up to 48 hours before check-in. Different properties may have varying policies, which will be clearly stated during booking.",
    },
    {
      question: "How do I update my payment information?",
      answer:
        "You can update your payment information in the Payments section of your profile. Click on 'Add New Payment Method' or edit existing ones as needed.",
    },
  ];

  const handleToggle = (index) => {
    // If the clicked question is already open, close it, otherwise open it
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div>
          <Mail className="h-6 w-6 text-[#8E7037] mb-2" />
          <h3 className="font-medium text-[#8E7037]">Email Support</h3>
          <p className="text-sm text-gray-600">grandroyal825@gmail.com</p>
        </div>

        <div>
          <Phone className="h-6 w-6 text-[#8E7037] mb-2" />
          <h3 className="font-medium text-[#8E7037]">Phone Support</h3>
          <p className="text-sm text-gray-600">+41 (0)61 5603-497</p>
        </div>

        <div>
          <MessageSquare className="h-6 w-6 text-[#8E7037] mb-2" />
          <h3 className="font-medium text-[#8E7037]">Live Chat</h3>
          <p className="text-sm text-gray-600">Available 24/7</p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-[#8E7037] mb-4">
          Frequently Asked Questions
        </h2>
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-4">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleToggle(index)}
            >
              <h3 className="font-medium text-[#8E7037] mb-2 flex-1">
                {faq.question}
              </h3>
              {expandedIndex === index ? (
                <ChevronUp className="h-5 w-5 text-[#8E7037]" />
              ) : (
                <ChevronDown className="h-5 w-5 text-[#8E7037]" />
              )}
            </div>
            {expandedIndex === index && (
              <p className="text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      <button
        className="mt-6 p-5 py-2 bg-[#8E7037] text-white transition-colors duration-200 hover:bg-white hover:text-[#8E7037] hover:border hover:border-[#8E7037]"
        onClick={() => navigate(`/contact`)}
      >
        Contact Support
      </button>
    </div>
  );
};

export default HelpCenter;
