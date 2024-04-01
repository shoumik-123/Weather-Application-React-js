const apiKey = '5f19ccf22cef17e5009e608b470a8f8b';

const getWeather = async (city) => {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);

    if (!response.ok) {
        throw new Error('Location not found. Please enter a valid city name.');
    }

    return response.json();
}

export default getWeather;
