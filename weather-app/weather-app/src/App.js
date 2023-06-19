import React, {useState} from 'react'
import './App.css'

function App(){

  const apiKey = '4a702de4de9a70fe39282f17755a0d6f'
  const [weatherData, setWeatherData] = useState([{}])
  const [city, setCity] = useState("")

  const getWeather = (event) => {
    if(event.key === "Enter"){
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`).then(
        response => response.json()
      ).then(
        data => {
          setWeatherData(data)
          setCity("")
        }
      )
    }
  }

  return(
    
    <div className='container'>
      <input 
      className='input' 
      placeholder='Enter City....'
      onChange={e => setCity(e.target.value)}
      value={city}
      onKeyDown={getWeather}
      />

      {typeof weatherData.main === 'undefined' ? (
        <div>
          <p>Welcome to Weather app.!! Enter in a city to get the weather details.</p>
        </div>
      ):(
        <div className='weather-data'>
          <p className='city'>{weatherData.name}</p>
          <p className='temp'>{Math.round(weatherData.main.temp)}<sup>o</sup>F</p>
          <p className='weather'>{weatherData.weather[0].main}</p>
        </div>
      )}

      {weatherData.cod === "404" ? (
        <p>Ooops..City not found..</p>
      ):(
        <>
        </>
      )}

    </div>
  )
}

export default App