import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import moment from "moment";
import "../styles/weather.css";
// import { useRef, forwardRef } from "react";
import Humid from "../assets/humid.svg";
import Wind from "../assets/wind.svg";
import Sunset from "../assets/sunset.svg";
import Sunrise from "../assets/sunrise.svg";

function WeatherDialog(props, ref) {
  const { onClose, open, temperature, errorMessage } = props;
  const handleClose = () => {
    onClose();
  };
  if (temperature) {
    const { temp, feels_like, humidity } = temperature.main;
    var { main, description, icon } = temperature.weather[0];
    const { speed } = temperature.wind;
    const tempF = Math.round(temp * 1.8 + 32);
    const sunrise = moment.unix(temperature.sys.sunrise).format("hh:mm a");
    const sunset = moment.unix(temperature.sys.sunset).format("hh:mm a");
    const weatherArray = ["Rain", "Thunderstorm", "Drizzle"];
    var isRainBackground;
    weatherArray.includes(main)
      ? (isRainBackground = true)
      : (isRainBackground = false);

    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="temperature-title"
        open={open}
        ref={ref}
      >
        <DialogContent className={isRainBackground ? "rain_bg" : "clouds_bg"}>
          <div className="weather-main">
            <div>
              <p className="temperature">
                {Math.round(temp)}°C / {tempF}°F
              </p>
              <span className="feels_like">
                Feels like {Math.round(feels_like)} °C
              </span>
            </div>
            <div className="weather-icon">
              <img
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="weather icon"
              />
              <span className="caption">
                <b>{description}</b>
              </span>
            </div>
          </div>
          <div className="weather-other">
            <div className="weather-info">
              <div className="icon-details">
                <img src={Sunrise} alt="Sunrise" />: &nbsp;
                <span>{sunrise} &nbsp;</span>
              </div>
              <div className="icon-details">
                <img src={Sunset} alt="Sunset" />: &nbsp;
                <span>{sunset} &nbsp;</span>
              </div>
            </div>
            <div className="weather-info">
              <div className="icon-details">
                <img src={Humid} alt="Humidity" />: &nbsp;
                <span>{humidity} % &nbsp;</span>
              </div>
              <div className="icon-details">
                <img src={Wind} alt="Wind" />: &nbsp;
                <span>{Math.round(speed)}kmph</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="temperature-title"
        open={open}
        ref={ref}
      >
        <DialogTitle id="temperature-title">Loading..</DialogTitle>
        <DialogContent>{errorMessage}</DialogContent>
      </Dialog>
    );
  }
}
const forwardedInput = React.forwardRef(WeatherDialog);
export default forwardedInput;
