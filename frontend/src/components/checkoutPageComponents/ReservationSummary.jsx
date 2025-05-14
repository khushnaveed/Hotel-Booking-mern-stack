import React, { useEffect } from "react";
import { useCart } from "../../context/CartContext.jsx";
import { useCurrency } from "../../context/CurrencyContext.jsx";
import { XCircle, Users, Calendar, Ticket, Plus, Minus } from "lucide-react";

const ReservationSummary = ({ setPriceDetails, isConfirmationStep }) => {
  const { cartItems, setCartItems, removeFromCart, updateItemQuantity } =
    useCart();
  const { currency, conversionRates, prevCurreny, setPrevCurrency } =
    useCurrency();

  const currencySymbols = { USD: "$", EUR: "€", GBP: "£" };
  const conversionRate = parseFloat(conversionRates?.[currency]) || 1;

  const updateTotalPrice = (item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 0;
    item.totalPrice = price * quantity * conversionRate;
    return item.totalPrice;
  };

  useEffect(() => {
    const exchangeRates = {
      USD: { USD: 1, EUR: 0.93, GBP: 0.8 },
      EUR: { USD: 1.08, EUR: 1, GBP: 0.86 },
      GBP: { USD: 1.25, EUR: 1.16, GBP: 1 },
    };

    setCartItems(
      cartItems.map((item) => ({
        ...item,
        totalPrice: item.totalPrice * exchangeRates[prevCurreny][currency],
      }))
    );
    setPrevCurrency(currency);
  }, [currency]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.totalPrice * item.quantity,
    0
  );

  const taxes = subtotal * 0.1;
  const total = subtotal + taxes;

  useEffect(() => {
    setPriceDetails({ subtotal, taxes, total });
  }, [cartItems, subtotal, taxes, total, setPriceDetails]);

  const handleRemoveItem = (slug) => removeFromCart(slug);

  const handleChangeQuantity = (slug, newQuantity) => {
    const updatedItem = cartItems.find((item) => item.slug === slug);
    updatedItem.quantity = newQuantity;
    updateTotalPrice(updatedItem);
    updateItemQuantity(slug, newQuantity);
  };

  return (
    <div className="bg-white shadow-lg p-6 space-y-6 border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        Reservation Summary
      </h3>

      {cartItems.map((item) => (
        <div
          key={item.slug}
          className="flex gap-4 items-start border-b pb-5 relative"
        >
          <img
            src={item.images || "https://via.placeholder.com/80"}
            alt={item.slug}
            className="w-20 h-20 object-cover shadow"
          />

          <div className="text-sm flex-1 space-y-1">
            <p className="font-semibold mr-15 capitalize text-gray-800 text-base">
              {item.slug.replace(/-/g, " ")}
            </p>

            {item.arrivalDate && item.departureDate ? (
              <>
                <p className="flex items-center gap-1 text-gray-500">
                  <Calendar size={16} className="text-[#8E7037]" />
                  {item.arrivalDate} to {item.departureDate}
                </p>
                <p className="flex items-center gap-1 text-gray-500">
                  <Users size={16} className="text-[#8E7037]" />
                  {item.numAdults} Adults, {item.numChildren} Children
                </p>
              </>
            ) : (
              <p className="flex items-center gap-1 text-gray-500">
                <Ticket size={16} className="text-[#8E7037]" />
                Total Tickets: {item.quantity}
              </p>
            )}
            {!isConfirmationStep &&
              !item.arrivalDate &&
              !item.departureDate && (
                <div className="mt-4">
                  {/* This container ensures the "Total Tickets" text and buttons are in the same block */}
                  <div className="space-y-2">
                    {/* Quantity buttons on the next line */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          handleChangeQuantity(item.slug, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Decrease ticket count"
                      >
                        <Minus size={18} className="text-gray-700" />
                      </button>

                      <span className="font-medium text-gray-900">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          handleChangeQuantity(item.slug, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                        aria-label="Increase ticket count"
                      >
                        <Plus size={18} className="text-gray-700" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

            <p className="text-[#8E7037] font-semibold text-sm">
              {currencySymbols[currency]}
              {item.totalPrice ? item.totalPrice.toFixed(2) : "0.00"}
            </p>
          </div>

          {!isConfirmationStep && (
            <button
              onClick={() => handleRemoveItem(item.slug)}
              className="absolute top-2 right-2 text-[#8E7037] hover:text-white hover:bg-[#8E7037] hover:border hover: border-[#8E7037] rounded-full"
              aria-label="Remove item"
            >
              <XCircle size={20} />
            </button>
          )}
        </div>
      ))}

      <div className="space-y-1 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>
            {currencySymbols[currency]}
            {subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Taxes (10%)</span>
          <span>
            {currencySymbols[currency]}
            {taxes.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="border-t pt-4 flex justify-between text-lg font-bold">
        <span>Total</span>
        <span className="text-[#8E7037]">
          {currencySymbols[currency]}
          {total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default ReservationSummary;
