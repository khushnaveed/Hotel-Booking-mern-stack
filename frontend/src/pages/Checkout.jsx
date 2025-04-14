import React from 'react';

export default function Checkout() {
    return (
        <div
            className="h-screen w-full bg-cover bg-center flex items-center justify-center px-4"
            style={{
                backgroundImage:
                    "url('https://img.freepik.com/premium-photo/abstract-blur-defocused-hotel-lobby-interior-background-vintage-filter_875825-64135.jpg')",
            }}
        >
            <div className="p-6 rounded-xl shadow-lg max-w-xl text-center">
                <div className="relative text-white text-center">
                    <h1 className="text-5xl font-bold uppercase"
                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>ROYAL GRAND</h1>
                    <h4 className="text-xl font-bold uppercase"
                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>Checkout</h4>
                    <p>booking information:

                    </p>
                    <h3>checkin date:</h3>
                    <h3>checkout date:</h3>
                    <p>total price:</p>

                </div>
            </div>
        </div>
    );
}


