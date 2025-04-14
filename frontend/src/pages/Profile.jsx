import React from 'react';

const Profile = () => {
  // Replace with actual data from Shameem's user data
  const user = {
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    roomType: '',
    amenities: ['Free Wi-Fi', 'Breakfast Included', 'Pool Access', 'Spa Services'],
    hotelImage: 'https://img.freepik.com/premium-photo/luxury-hotel-entrance-with-water-fountain_1287986-20413.jpg', 
  };

  return (
    <div className="relative w-full h-screen">
      <img
        src={user.hotelImage}
        alt="Royal Grand Hotel"
        className="w-full h-full object-cover opacity-60" // opacity for background
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 max-w-lg w-full text-left bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">User Profile</h1>
        
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
          <p className="text-gray-600"><strong>Name:</strong> {user.name}</p>
          <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
          <p className="text-gray-600"><strong>Phone:</strong> {user.phone}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Booking Information</h2>
          <p className="text-gray-600"><strong>Check-In:</strong> {user.checkIn}</p>
          <p className="text-gray-600"><strong>Check-Out:</strong> {user.checkOut}</p>
          <p className="text-gray-600"><strong>Room Type:</strong> {user.roomType}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Amenities</h2>
          <ul className="list-disc list-inside text-gray-600">
            {user.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;