export default function MenuList({
  items = [],
  loading,
  error,
  currencySymbol,
  activeMeal,
}) {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block h-8 w-8 animate-spin border-4 border-[#8E7037] border-r-transparent"></div>
        <p className="mt-2">Loading menu items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3  relative mb-4">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {error}</span>
        <p className="mt-2">Using sample menu data instead.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {items.length > 0 ? (
        items.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <img
              src={item.img || "/placeholder.svg?height=100&width=100"}
              alt={item.name}
              className="w-[100px] h-[100px] object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder.svg?height=100&width=100";
              }}
            />
            <div className="text-left">
              <h4 className="text-lg font-semibold">{item.name}</h4>
              <p className="font-bold text-[#8E7037]">
                {currencySymbol}
                {item.price}
              </p>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-2 text-center py-8">
          <p>No {activeMeal.toLowerCase()} items available at this time.</p>
        </div>
      )}
    </div>
  );
}
