import React from "react";

function PaymentCheckout() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Payment Methods</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Credit / Debit Card</h2>
          <form className="space-y-4">
            <input className="w-full border p-3 rounded-md" placeholder="Card Number" />
            <input className="w-full border p-3 rounded-md" placeholder="Cardholder Name" />
            <div className="flex gap-4">
              <input className="w-1/2 border p-3 rounded-md" placeholder="Expiry (MM/YY)" />
              <input className="w-1/2 border p-3 rounded-md" placeholder="CVV" />
            </div>
            <button className="bg-[#8E7037] text-white px-6 py-3 rounded-md hover:bg-[#a0844d] transition duration-300">
              Pay Now
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Other Payment Options</h2>
          <button className="w-full border p-3 rounded-md mb-4 hover:bg-gray-100">
            PayPal
          </button>
          <button className="w-full border p-3 rounded-md hover:bg-gray-100">
            Apple Pay / Google Pay
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentCheckout;
