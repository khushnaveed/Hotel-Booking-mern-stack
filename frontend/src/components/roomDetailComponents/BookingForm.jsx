import { useCurrency } from "../../context/CurrencyContext";


export default function BookingForm({
    bookingData,
    setBookingData,
    roomData,
    handleBookingClick,
    currency,
    currencySymbols,
}) {
    const { conversionRates } = useCurrency();
    const convertedPrice = roomData?.defaultPrice
        ? (roomData.defaultPrice * conversionRates[currency]).toFixed(2)
        : "0.00";
    return (

        <div className="bg-gray-100 p-4 sm:p-6 shadow-lg h-fit w-full">
            <h5 className="text-xl font-semibold mb-4">
                ROOM PRICE{" "}
                <strong className="text-[#8E7037]">
                    {currencySymbols[currency]} {convertedPrice}/day

                </strong>
            </h5>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {["arrive", "departure"].map((field) => (
                    <div key={field}>
                        <label>{field === "arrive" ? "CHECK IN" : "CHECK OUT"}</label>
                        <input
                            type="date"
                            name={field}
                            value={bookingData[field]}
                            onChange={(e) => setBookingData({ ...bookingData, [field]: e.target.value })}
                            className="w-full p-2 bg-white"
                        />
                    </div>
                ))}
                <div>
                    <label>ADULT</label>
                    <input
                        type="number"
                        name="adult"
                        min="1"
                        value={bookingData.adult}
                        onChange={(e) => setBookingData({ ...bookingData, adult: e.target.value })}
                        className="w-full p-2 bg-white"
                    />
                </div>
                <div>
                    <label>CHILD</label>
                    <input
                        type="number"
                        name="child"
                        min="0"
                        value={bookingData.child}
                        onChange={(e) => setBookingData({ ...bookingData, child: e.target.value })}
                        className="w-full p-2 bg-white"
                    />
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        className="w-full p-3 bg-[#8E7037] text-white cursor-pointer hover:bg-white hover:text-[#8E7037] hover:border hover:border-[#8E7037]"
                        onClick={handleBookingClick}
                    >
                        Book Now
                    </button>
                </div>
            </form>
        </div>
    );
}
