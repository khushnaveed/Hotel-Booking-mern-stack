import { createContext, useContext, useState } from "react";

const RoomDetailContext = createContext();

export const RoomDetailProvider = ({ children }) => {
    const [roomData, setRoomData] = useState(null);
    const [bookingData, setBookingData] = useState({
        arrive: "",
        departure: "",
        adult: 1,
        child: 0,
    });

    return (
        <RoomDetailContext.Provider value={{ roomData, setRoomData, bookingData, setBookingData }}>
            {children}
        </RoomDetailContext.Provider>
    );
};

export const useRoomDetail = () => useContext(RoomDetailContext);
