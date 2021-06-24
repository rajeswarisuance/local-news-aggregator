import React, { Component } from "react";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";
import { Button } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import * as data from "../language";
import "../styles/language.css";

const languages = data.languages;

class Language extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = {
      open: false,
      lang: { label: "English", value: "en" }
    };
    this.dataCallback = this.props;
  }

  handleButtonClick = () => {
    this.setState(state => {
      return {
        open: !state.open
      };
    });
  };
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  handleClickOutside = event => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        open: false
      });
    }
  };
  render() {
    return (
      <div className="menu-container" ref={this.container}>
        <Button
          variant="contained"
          onClick={this.handleButtonClick}
          className="menu-trigger"
        >
          <LanguageOutlinedIcon />
          <span>{this.state.lang.label}</span>
          <ArrowDropDownIcon />
        </Button>

        {this.state.open && (
          <div className="menu active">
            <ul>
              {languages.map(lang => (
                <li
                  key={lang.value}
                  onClick={() => {
                    this.setState({ lang });
                    this.props.dataCallback(lang);
                  }}
                >
                  {lang.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Language;
