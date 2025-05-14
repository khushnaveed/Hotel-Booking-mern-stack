import { useState } from "react";
import emailjs from "emailjs-com";

export default function ReservationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const errors = {};

    if (!form.name.value) errors.name = "Name is required.";
    if (!form.email.value) errors.email = "Email is required.";
    if (!form.phone.value) errors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(form.phone.value))
      errors.phone = "Please enter a valid 10-digit phone number.";
    if (!form.date.value) errors.date = "Date is required.";
    if (!form.guests.value) errors.guests = "Number of guests is required.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const templateParams = {
      name: form.name.value,
      email: form.email.value,
      phone: `${form.countryCode.value}${form.phone.value}`,
      date: form.date.value,
      guests: form.guests.value,
      message: form.message.value,
    };

    emailjs
      .send(
        "service_grgwfqx",
        "template_4dimzkl",
        templateParams,
        "Q0RGdIfcq2A_dJRBm"
      )
      .then(() => {
        setIsSubmitted(true);
        setFormErrors({});
        form.reset();
        setTimeout(() => setIsSubmitted(false), 4000);
      })
      .catch(console.error);
  };

  return (
    <div className="bg-black/80 backdrop-blur-md mt-10 py-12">
      <div className="max-w-screen-md mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-white mb-8">
          Reservation
        </h2>

        {isSubmitted ? (
          <div className="bg-green-200 text-black-800 p-4 text-center">
            Thank you for selecting Royal Grand Dining! Our team will be in
            touch shortly.
          </div>
        ) : (
          <form
            className="bg-white p-6  shadow space-y-4"
            onSubmit={handleFormSubmit}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="border border-[#8E7037] p-2  w-full"
                />
                {formErrors.name && (
                  <span className="text-red-500 text-sm">
                    {formErrors.name}
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="border border-[#8E7037] p-2  w-full"
                />
                {formErrors.email && (
                  <span className="text-red-500 text-sm">
                    {formErrors.email}
                  </span>
                )}
              </div>
              <div className="flex space-x-2 relative">
                <select
                  name="countryCode"
                  className="border border-[#8E7037] p-2  w-1/3"
                  defaultValue="+1"
                >
                  {[
                    { code: "+1", name: "USA" },
                    { code: "+252", name: "Somalia" },
                    { code: "+98", name: "Iran" },
                    { code: "+92", name: "Pakistan" },
                    { code: "+93", name: "Afghanistan" },
                  ]
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.code}
                      </option>
                    ))}
                </select>
                <input
                  name="phone"
                  type="text"
                  placeholder="Phone"
                  className="border border-[#8E7037] p-2  w-full"
                />
              </div>
              {formErrors.phone && (
                <span className="text-red-500 text-sm">{formErrors.phone}</span>
              )}
              <div className="relative">
                <input
                  name="date"
                  type="date"
                  className="border border-[#8E7037] p-2  w-full"
                />
                {formErrors.date && (
                  <span className="text-red-500 text-sm">
                    {formErrors.date}
                  </span>
                )}
              </div>

              <select
                name="guests"
                className="border border-[#8E7037] p-2  w-full"
              >
                <option value="">Number of Guests</option>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              {formErrors.guests && (
                <span className="text-red-500 text-sm">
                  {formErrors.guests}
                </span>
              )}
            </div>
            <textarea
              name="message"
              placeholder="Message"
              className="border border-[#8E7037] p-2  w-full"
              rows="4"
            ></textarea>
            <button
              type="submit"
              className="px-6 py-3 mt-5 bg-[#8E7037] text-white border border-[#8E7037]  hover:bg-white hover:text-[#8E7037] transition-colors duration-200"
            >
              Book Table
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
