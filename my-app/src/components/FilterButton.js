import React, {useState} from "react";
import { ReactComponent as FilterIcon } from "../assets/magnifying-glass.svg";
import { ReactComponent as XIcon } from "../assets/x.svg";
import "./FilterButton.css";

function FilterButton({ onClick, clearFilters, classes }) {

    const [query, setQuery] = useState('');
    const [showCategories, setShowCategories] = useState(false);

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

    const handleInputChange = (event) => {
        setQuery(event.target.value);
        setShowCategories(true);
    };

    const handleButtonClick = () => {
        onClick(query);
        setShowCategories(false);
    };

    const handleCategoryClick = (category) => {
        onClick(class_color_map[category]);
        setShowCategories(false);
    };

    const handleCloseClick = () => {
        setShowCategories(false);
    };

    const handleClear = () => {
        clearFilters()
        setShowCategories(false);
    };
    
  return (

    <div className="filter">
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search categories..."
          value={query}
          onChange={handleInputChange}
          className="filter-input"
        />
        <button className="filterButton" onClick={handleButtonClick}>
            <FilterIcon className="filter-icon" />
        </button>
        <button className="buttonClear" onClick={handleClear}>Clear</button>
      </div>
      {showCategories && (
      <div className="filter-menu">
        <div className="filter-menu-header">
            <span>Categories</span>
            <button className="closeButton" onClick={handleCloseClick}>
                <XIcon className="close-icon" />
            </button>
        </div>
        {classes
            .filter((category) =>
            category.toLowerCase().includes(query.toLowerCase())
            )
            .map((category) => (
            <div
                key={category}
                className="filter-category"
                onClick={() => handleCategoryClick(category)}
            >
                {category}
            </div>
            ))}
            {classes.filter((category) => category.toLowerCase().includes(query.toLowerCase())).length === 0 && (
            <div className="no-category-message">No category available</div>
            )}
        </div>
       )}
    </div>
  );
}

export default FilterButton;