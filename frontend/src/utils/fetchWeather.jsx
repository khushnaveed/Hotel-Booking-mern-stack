const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

export async function fetchWeather(city = "Basel") {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

    );

    if (!response.ok) {
        throw new Error("Failed to fetch weather data");

    }

    return response.json();
}
