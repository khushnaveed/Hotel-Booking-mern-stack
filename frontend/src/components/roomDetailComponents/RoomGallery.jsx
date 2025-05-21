import React from "react";

export default function RoomGallery({ images, currentImageIndex, setCurrentImageIndex }) {
    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <div>
            <div className="relative">
                <img
                    src={images[currentImageIndex]}
                    alt="Room"

                    className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover"
                />
                <button onClick={prevImage} className="absolute top-1/2 left-2 transform -translate-y-1/2 p-1 rounded-full shadow">⬅</button>
                <button onClick={nextImage} className="absolute top-1/2 right-2 transform -translate-y-1/2 p-1 rounded-full shadow">➡</button>
            </div>
            <div className="flex mt-4 space-x-2 overflow-x-auto scrollbar-hide">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`thumb-${index}`}
                        className={`w-20 h-16 object-cover cursor-pointer border ${index === currentImageIndex ? "border-[#8E7037]" : "border-gray-300"}`}
                        onClick={() => setCurrentImageIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}
