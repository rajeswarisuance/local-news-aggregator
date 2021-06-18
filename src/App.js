import "./App.css";
import React from "react";
import { getWeather, getNews } from "./api";
import NewsComponent from "./components/news";
import Weather from "./components/weather";

export default class App extends React.Component {
  componentDidMount() {
    this.getPosition().then(position => {
      getWeather(
        position.coords.latitude,
        position.coords.longitude
      ).then(data => console.log(data));
    });
    getNews("google", "en").then(data => console.log(data));
  }
  getPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
  render() {
    return (
      <div className="App">
        <div className="nav_bar">
          <div className="header">Public Press</div>
          <div className="weather">
            <Weather />
          </div>
        </div>
        <div className="newstab">
          <NewsComponent />
        </div>
      </div>
    );
  }
}
