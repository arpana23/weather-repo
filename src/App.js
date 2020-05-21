import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

const Api = {
  key: "7ae7cbd5a269f5d1b7e018f124b268b6",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});   //for empty object

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${Api.base}weather?q=${query}&units=metric&APPID=${Api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January","Febrary","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? ((weather.main.temp > 29) ? 'app warm' : 'app norm') : 'app') : 'app'}>
      <main>
        <h1>WEATHER APP</h1>
        <div className="search-box">
          <input type="text" 
          className="search-bar" 
          placeholder="Search Weather..." 
          onChange={e => setQuery(e.target.value)} 
          value={query} 
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}&#x2103;
              </div>
        <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ): ('')}
        
      </main>
    </div>
  );
}

export default App;
