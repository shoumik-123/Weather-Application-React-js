import './App.css';
import { Search, MapPin, Wind } from 'react-feather';
import getWeather from './api/api';
import {useEffect, useState} from 'react';
import dateFormat from 'dateformat';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [city, setCity] = useState("Dhaka");
  const [weather, setWeather] = useState({});
  const [unit, setUnit] = useState('C');
  const [fetchWeather, setFetchWeather] = useState(true);

  const getWeatherbyCity = async () => {
    try {
      const weatherData = await getWeather(city);
      if (weatherData){
        setWeather(weatherData);
      }
      else {
        setWeather({})
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (fetchWeather && city.trim() !== "") {
      getWeatherbyCity(city);
      setFetchWeather(false);
    }
  }, [fetchWeather, city]);


  const renderDate = () => {
    let now = new Date();
    return dateFormat(now, "dddd, mmmm dS, h:MM TT");
  };

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  const convertToFahrenheit = (temp) => {
    return (temp * 9) / 5 + 32;
  };

  const renderTemperature = (temp) => {
    if (unit === 'C') {
      return temp;
    } else {
      return convertToFahrenheit(temp).toFixed(2);
    }
  };

  // const getCurrentLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           setCity({
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude
  //           });
  //           getWeatherbyCity(ciy);
  //         },
  //         (error) => {
  //           toast.error('Error getting location: ' + error.message);
  //         }
  //     );
  //   } else {
  //     toast.error('Geolocation is not supported by this browser.');
  //   }
  // };


  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    if (city.trim() !== "") {
      setFetchWeather(true);
    }
  };

  return (
      <div className="app">
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            toastClassName="bounce-toast"
        />
        <h1>Weather App</h1>
        <form onSubmit={handleSearch}>
          <div className="input-wrapper">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder='Enter Location'
            />
            {city && (
                <button className="clear-button" onClick={() => setCity("")}>
                  Clear
                </button>
            )}
            <button type="submit">
              <Search/>
            </button>
          </div>
        </form>

        {weather && weather.weather && (
            <div className="content">
              <div className="location d-flex">
                <MapPin/>
                <h2>{weather.name} <span>({weather.sys.country})</span></h2>
              </div>
              <p className="datetext">{renderDate()}</p>

              <div className="weatherdesc d-flex flex-c">
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt=""
                />
                <h3>{weather.weather[0].description}</h3>
                <h3>Humidity: {weather.main.humidity}</h3>
              </div>

              <div className="tempstats d-flex flex-c">
                <h1>
                  {renderTemperature(weather.main.temp)} <span>&deg;{unit}</span>
                </h1>
                <h3>
                  Feels Like {renderTemperature(weather.main.feels_like)}{' '}
                  <span>&deg;{unit}</span>
                </h3>
                <button className='convertemp' onClick={toggleUnit}>
                  convert Temp
                </button>
              </div>

              <div className="windstats d-flex">
                <Wind/>
                <h3>
                  Wind is {Math.round(weather.wind.speed * 0.514 * 100) / 100} m/s
                  in {weather.wind.deg}&deg;
                </h3>
              </div>
            </div>
        )}

        {!weather.weather && (
            <div className="content">
              {/*<button className="currentLocationBtn" onClick={getCurrentLocation}>*/}
              {/*  Current Location*/}
              {/*</button>*/}
              <h4>Please give your location.</h4>
            </div>
        )}
      </div>
  );
}

export default App;
