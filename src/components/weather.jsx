import React, { Component } from "react";
import { getWeather } from "../api";
import moment from "moment";
import "./weather.css";
class Weather extends Component {
  state = {
    lat: undefined,
    lon: undefined,
    city: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    icon: undefined,
    sunrise: undefined,
    sunset: undefined,
    errorMessage: undefined
  };
  getPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
  componentDidMount() {
    this.getPosition()
      .then(position => {
        getWeather(position.coords.latitude, position.coords.longitude).then(
          data => {
            this.setState({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
              city: data.name,
              temperatureC: Math.round(data.main.temp),
              temperatureF: Math.round(data.main.temp * 1.8 + 32),
              icon: data.weather[0].icon,
              sunrise: moment.unix(data.sys.sunrise).format("hh:mm a"),
              sunset: moment.unix(data.sys.sunset).format("hh:mm a")
            });
          }
        );
      })
      .catch(err => {
        this.setState({ errorMessage: err.message });
      });

    this.timer = setInterval(
      () => getWeather(this.state.lat, this.state.lon),
      60000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const {
      city,
      temperatureC,
      temperatureF,
      icon,
      sunrise,
      sunset
    } = this.state;
    if (city) {
      return (
        <div className="weather-box">
          <div className="weather-item">
            {temperatureC} &deg;C <span className="slash">/</span>{" "}
            {temperatureF} &deg;F
          </div>
          <div className="weather-item">
            <span>sunrise: {sunrise}</span>
          </div>
          <div className="weather-item">
            <span>sunset: {sunset}</span>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default Weather;
