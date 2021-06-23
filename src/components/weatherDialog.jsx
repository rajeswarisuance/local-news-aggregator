import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import moment from "moment";
import "../styles/weather.css";
import { useRef } from "react";
import Humid from "../assets/humid.svg";
import Wind from "../assets/wind.svg";

export default function WeatherDialog(props) {
  const dialogRef = useRef(null);
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
        ref={dialogRef}
      >
        {/* <DialogTitle id="temperature-title">Temperature</DialogTitle> */}
        {/* <DialogContent className="dialog_box"> */}
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
            <div className="weather-sun">
              <span>Sunrise: {sunrise}</span>
              <br />
              <span>Sunset : {sunset}</span>
            </div>
            <div className="weather-info">
              <img src={Humid} alt="Humidity" />: {humidity}% <br />
              <img src={Wind} alt="Wind" />: {speed} km/hr
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
        ref={dialogRef}
      >
        <DialogTitle id="temperature-title">Loading..</DialogTitle>
        <DialogContent>{errorMessage}</DialogContent>
      </Dialog>
    );
  }
}
