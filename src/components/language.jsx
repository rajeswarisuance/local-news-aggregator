import React, { useState, useRef } from "react";
import { useDetectOutside } from "./useDetectOutside";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";
import { Button } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import * as data from "../language";
import "../styles/language.css";

const languages = data.languages;

export default function Language(props) {
  const dropdownRef = useRef(null);
  const [val, setValue] = useState("English");
  const [isActive, setIsActive] = useDetectOutside(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  const { dataCallback } = props;
  return (
    <div className="menu-container">
      <Button variant="contained" onClick={onClick} className="menu-trigger">
        <LanguageOutlinedIcon />
        <span>{val}</span>
        <ArrowDropDownIcon />
      </Button>
      <div
        ref={dropdownRef}
        className={`menu ${isActive ? "active" : "inactive"}`}
      >
        <ul>
          {languages.map(lang => (
            <li
              key={lang.value}
              onClick={() => {
                setValue(lang.label);
                dataCallback(lang);
              }}
            >
              {lang.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
