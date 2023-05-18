import React, {useState} from "react";
import { ReactComponent as FilterIcon } from "../assets/magnifying-glass.svg";
import { ReactComponent as XIcon } from "../assets/x.svg";
import "./FilterButton.css";

function FilterButton({ onClick, clearFilters, classes }) {

    const [query, setQuery] = useState('');

    const class_color_map = {
        snares: "#ff355e",
        claps: "#fd5b78",
        clicks: "#ff6037",
        hihat: "#ff9966",
        perc: "#ff9933",
        percussive: "#ffcc33",
        crash: "#ffff66",
        kick: "#ccff00",
        rides: "#66ff66",
        shaker: "#aaf0d1",
        synth: "#16d0cb",
        tom: "#50bfe6",
        bongo: "#9c27b0",
        tribal: "#ee34d2",
        fx: "#ff00cc",
        others: "gray",
        generated: "red",
        favorites: "favorites"
    };
    

    const handleCategoryClick = (category) => {
        
        onClick(class_color_map[category]);
    };

    const handleClear = () => {
        clearFilters()
    };
    
  return (

    <div className="filter">
      <div className="filter-container">
        <select
          defaultValue=""
          onChange={(e) => handleCategoryClick(e.target.value)}
          className="filter-input"
        >
          <option value="" disabled hidden>
            Select a category...
          </option>
          {classes.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button className="buttonClear" onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
}

export default FilterButton;