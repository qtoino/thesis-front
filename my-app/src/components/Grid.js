import React from 'react';
import "./Grid.css";

function ToggleGrid({ toggleGrid }) {
  const toggleButtonStyle = {
    position: 'fixed',
    bottom: '3px',
    right: '30px',
    transform: 'translate(-50%, -50%)',
    zIndex: 999,
  };



  return (
    <label className="switch" style={toggleButtonStyle}>
        <input type="checkbox" onChange={toggleGrid} />
        <span className="slider round"></span>
    </label>


  );
}

export default ToggleGrid;
