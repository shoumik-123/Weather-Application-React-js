import './App.css';
import { Search, MapPin, Wind } from 'react-feather';
import getWeather from './api/api';
import { useState } from 'react';
import dateFormat from 'dateformat';

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const getWeatherbyCity = async () => {
    const weatherData = await getWeather(city);
    setWeather(weatherData);
    setCity("");
  }


  console.log(weather);
  const renderDate = () => {
    let now = new Date();
    return dateFormat(now, "dddd, mmmm dS, h:MM TT");
  }

  //
  const [unit, setUnit] = useState('C');

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

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="input-wrapper">
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)}
          placeholder='Enter City Name' />
        <button onClick={() => getWeatherbyCity()}>
          <Search></Search>
        </button>
      </div>

      {weather && weather.weather &&
        <div className="content">

          <div className="location d-flex">
            <MapPin></MapPin>
            <h2>{weather.name} <span>({weather.sys.country})</span></h2>
          </div>
          <p className="datetext">{renderDate()}</p>

          <div className="weatherdesc d-flex flex-c">
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
            <h3>{weather.weather[0].description}</h3>
            <h3>Humidity :{weather.main.humidity}</h3>
          </div>

          
            <div className="tempstats d-flex flex-c">
              <h1>{renderTemperature(weather.main.temp)} <span>&deg;{unit}</span></h1>
              <h3>Feels Like {renderTemperature(weather.main.feels_like)} <span>&deg;{unit}</span></h3>
              <button className='convertemp' onClick={toggleUnit}>convert Temp</button>
            </div>

          <div className="windstats d-flex">
            <Wind></Wind>
            <h3>Wind is {Math.round(weather.wind.speed * 0.514 * 100) / 100} m/s in {weather.wind.deg}&deg;</h3>
          </div>

        </div>
      }

      {!weather.weather && <div className="content">
        <h4>No Data found !</h4>
      </div>}

      {/* <p>{JSON.stringify(weather)}</p> */}

    </div>
  );
}

export default App;
