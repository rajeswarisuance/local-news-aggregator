import "./App.css";
import React from "react";
import { getWeather, getNews, getIcon } from "./api";
import NewsComponent from "./components/news";
import Weather from "./components/weather";
import Language from "./components/language";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: { label: "English", value: "en" }
    };
  }

  handleCallBack = language => {
    this.setState({ language });
  };
  render() {
    return (
      <div className="App">
        <div className="nav_bar">
          <div className="header">Public Press</div>
          <div className="rightTab">
            <div className="weather">
              <Weather />
            </div>
            <div className="language">
              <Language
                message="Data from Parent"
                dataCallback={this.handleCallBack}
              />
            </div>
          </div>
        </div>
        <div className="newstab">
          <NewsComponent language={this.state.language} />
        </div>
      </div>
    );
  }
}
