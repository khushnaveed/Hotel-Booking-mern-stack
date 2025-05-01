import React from "react";

const mockPaymentMethods = [
  {
    id: "pm-001",
    type: "credit",
    brand: "Visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2025,
    isDefault: true,
  },
  {
    id: "pm-002",
    type: "credit",
    brand: "Mastercard",
    last4: "5555",
    expMonth: 8,
    expYear: 2024,
    isDefault: false,
  },
];

const PaymentMethod = () => {
  return (
    <div className="bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
      {mockPaymentMethods.length > 0 ? (
        <div className="space-y-4">
          {mockPaymentMethods.map((payment) => (
            <div
              key={payment.id}
              className={`p-5 border transition-all duration-200 relative ${
                payment.isDefault
                  ? "bg-[#f7f3ec] border-[#8E7037]"
                  : "hover:bg-gray-50 border-gray-200"
              }`}
            >
              {payment.isDefault && (
                <span className="absolute top-3 right-3 text-xs bg-[#8E7037] text-white px-2 py-0.5 ">
                  Default
                </span>
              )}

              <div className="flex items-center">
                <div
                  className={`w-12 h-8 flex items-center justify-center text-white text-sm font-bold ${
                    payment.brand === "Visa"
                      ? "bg-blue-600"
                      : payment.brand === "Mastercard"
                      ? "bg-red-500"
                      : "bg-gray-600"
                  }`}
                >
                  {payment.brand === "Visa"
                    ? "VISA"
                    : payment.brand === "Mastercard"
                    ? "MC"
                    : "CARD"}
                </div>

                <div className="ml-4">
                  <p className="text-base font-medium text-gray-800">
                    {payment.brand} •••• {payment.last4}
                  </p>
                  <p className="text-sm text-gray-500">
                    Expires {payment.expMonth.toString().padStart(2, "0")}/
                    {payment.expYear}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex space-x-4 text-sm">
                {!payment.isDefault && (
                  <button className="text-[#8E7037] hover:underline">
                    Set as Default
                  </button>
                )}
                <button className="text-red-600 hover:underline">Remove</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <p>No payment methods added yet.</p>
        </div>
      )}

      <button className="mt-6 p-5 py-2 bg-[#8E7037] text-white flex items-center justify-center  border border-[#8E7037]  hover:bg-white hover:text-[#8E7037] transition-colors duration-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Add New Payment Method
      </button>
    </div>
  );
};

export default PaymentMethod;
