import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const RoomAvailabilityCalendar = ({ slug }) => {
    const [unavailableDates, setUnavailableDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseUrl =
    import.meta.env.MODE === "development" ? "http://localhost:5005" : "";

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const { data } = await axios.get(baseUrl + `/room/${slug}`);
                const bookings = data.data.bookings;

                const bookedDates = bookings
                    .map(booking => {
                        const dateRange = [];
                        const current = new Date(booking.checkIn);
                        const end = new Date(booking.checkOut);

                        while (current <= end) {
                            dateRange.push(new Date(current));
                            current.setDate(current.getDate() + 1);
                        }
                        return dateRange;
                    })
                    .flat();

                setUnavailableDates(bookedDates);
                setLoading(false);
            } catch (err) {
                setError('Error fetching room details');
                setLoading(false);
            }
        };

        fetchRoomDetails();
    }, [slug]);

    const tileClassName = ({ date }) => {
        const formattedDate = date.toISOString().split('T')[0];
        return unavailableDates.some(d => d.toISOString().split('T')[0] === formattedDate)
            ? 'unavailable'
            : null;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h3>Room Availability</h3>
            <Calendar tileClassName={tileClassName} />
        </div>
    );
};

export default RoomAvailabilityCalendar;
