import React, { Component } from "react";
import { getWeather } from "../api";
import moment from "moment";
import "../styles/weather.css";
import { Button } from "@material-ui/core";
import CloudIcon from "@material-ui/icons/Cloud";
import WeatherDialog from "./weatherDialog";
class Weather extends Component {
  state = {
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureData: undefined,
    open: false
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
              temperatureC: Math.round(data.main.temp),
              temperatureData: data
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
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = value => {
    this.setState({ open: false });
  };
  render() {
    const { temperatureC } = this.state;
    return (
      <div>
        <Button variant="contained" onClick={this.handleClickOpen}>
          <CloudIcon />
          <span style={{ fontWeight: 700, margin: "0 10px" }}>
            {temperatureC}&deg;C
          </span>
        </Button>
        <WeatherDialog
          open={this.state.open}
          onClose={this.handleClose}
          temperature={this.state.temperatureData}
        />
      </div>
    );
  }
}

export default Weather;
