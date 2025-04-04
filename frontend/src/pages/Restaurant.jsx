
import { restaurantData } from "../assets/restaurantData";

export default function Restaurant() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Restaurant</h1>
        <p className="text-gray-600">Welcome to our restaurant</p>
      </div>

      {/* Loop through all menu items */}
      <div className="w-full max-w-screen-lg space-y-12">
        {restaurantData.map((group, i) => (
          <div key={i} className="flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-semibold mt-6 mb-1">{group.title}</h2>
            <p className="text-gray-500 mb-8">{group.time}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
              {group.items.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:opacity-90"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-gray-600 text-sm mb-2">{item.desc}</p>
                    <p className="font-bold">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}







