import React from "react";

const mockReservations = [
  {
    id: "res-001",
    property: "Ocean View Resort",
    checkIn: "2024-08-15",
    checkOut: "2024-08-20",
    guests: 2,
    status: "confirmed",
    totalAmount: 1250.0,
  },
  {
    id: "res-002",
    property: "Mountain Retreat Cabin",
    checkIn: "2024-09-24",
    checkOut: "2024-09-27",
    guests: 4,
    status: "pending",
    totalAmount: 780.0,
  },
];

const ReservationHistory = () => {
  return (
    <div className="bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
      {mockReservations.length > 0 ? (
        <div className="space-y-4">
          {mockReservations.map((reservation) => (
            <div
              key={reservation.id}
              className="border  border-[#8E7037] p-5 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-800">
                  {reservation.property}
                </h3>
                <span
                  className={`text-xs px-3 py-1 font-medium ${
                    reservation.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {reservation.status.charAt(0).toUpperCase() +
                    reservation.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Check-in</p>
                  <p className="font-medium text-gray-700">
                    {new Date(reservation.checkIn).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Check-out</p>
                  <p className="font-medium text-gray-700">
                    {new Date(reservation.checkOut).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Guests</p>
                  <p className="font-medium text-gray-700">
                    {reservation.guests}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Total</p>
                  <p className="font-semibold text-[#8E7037]">
                    ${reservation.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex space-x-4">
                <button className="text-sm text-[#8E7037] hover:underline">
                  View Details
                </button>
                {reservation.status === "pending" && (
                  <button className="text-sm text-red-600 hover:underline">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <p className="mb-2">You don't have any reservations yet.</p>
          <button className="text-sm text-[#8E7037] hover:underline">
            Book your first stay
          </button>
        </div>
      )}

      <button className="mt-6 p-5 py-2 bg-[#8E7037] text-white flex items-center justify-center  border border-[#8E7037]  hover:bg-white hover:text-[#8E7037] transition-colors duration-200">
        View All Reservations
      </button>
    </div>
  );
};

export default ReservationHistory;
