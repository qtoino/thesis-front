import React from "react";
import { ReactComponent as Sun } from '../assets/sun.svg';
import { ReactComponent as Moon } from '../assets/moon.svg';
import "./ThemeButton.css";

function ThemeButton({ isDarkMode, setIsDarkMode }) {

    const iconStyle = {
        width: '20px',
        height: '20px',
      };

    const handleClick = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <button className="theme-button" onClick={handleClick}>
            {isDarkMode ? <Sun style={iconStyle} /> : <Moon style={iconStyle} />}
        </button>
    );
}

export default ThemeButton;