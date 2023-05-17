import React, { useState } from "react";
import { ReactComponent as Question } from '../assets/question.svg';
import { ReactComponent as Left } from '../assets/left.svg';
import { ReactComponent as Right } from '../assets/right.svg';
import { ReactComponent as Wheel } from '../assets/wheel.svg';
import "./Info.css";

function Info() {
  const [showInfo, setShowInfo] = useState(true);

  const iconStyle = {
    width: '30px',
    height: '30px',
  };

  const handleInfoClick = () => {
    setShowInfo(true);
  };

  const handleCloseClick = () => {
    setShowInfo(false);
  };

  return (
    <div className="info-container">
      <button className="info-button" onClick={handleInfoClick}>
        <Question style={iconStyle}/>
      </button>
      {showInfo && (
        <div className="info-window">
          <div className="info-content">
            <h1>Sample Explorer</h1>
            <div className="topic">
              <p>Welcome to sample explorer, our experimental platform designed for interacting with sample packs! This user-friendly platform allows everyone, from casual users to professional artists, to explore and choose samples for their music in a visually engaging environment. This guide will help you understand the various features and functionalities available within the platform.</p>
            </div>
            <div className="topic">
              <h2>-------IMPORTANT: TASKS-------</h2>
              <p><b>First task:</b> Explore the sample pack with the filters option picking a sound of 3 different classes.</p>
              <p><b>Second task:</b> Costumize your rhythm pattern as you like with at least 2 different sounds from the original ones.</p>
              <p><b>Third task:</b> Generate a new sound with the interpolation line from 2 sounds of different categories.</p>
              <p><b>After completing all the 3 main tasks, you can answer <a href="https://form.jotform.com/frs98/samplexplorer">this questionaire</a></b></p>
              <h2>-----------------------------------</h2>
            </div>
            <div className="topic">
              <h2>Sample Packs</h2>
              <p>Currently, our platform supports exploration of two sample packs: Vengeance Essential House Vol. 1 and Vengeance Analog Drums Vol. 1, which are utilized by the deep learning algorithms operating in the background.</p>
            </div>
            <div className="topic">
              <div className="topic-wrapper">
                <h2>Interaction with Balls</h2>
                <p>
                    <Left className="topic-svg"/>
                    Player Menu: Allows you to play the sound, send it to one of the tracks at the bottom of the interface, or access other options.</p>
                <p>
                    <Right className="topic-svg"/>
                    Context Menu: Allows you to add or remove a sound from your favorites list, delete the ball from the view, or download the sound.</p>              
              </div>
            </div>
            <div className="topic">
              <h2>Interpolation Line</h2>
              <p>When two balls are selected, an interpolation line is formed between them. By clicking on the line, you can generate an interpolation between the two selected sounds, providing you with a new level of creative freedom when searching through sample packs.</p>
            </div>
            <div className="topic">
              <h2>Interaction with Balls</h2>
              <div className="topic-wrapper">
                <p>
                    <Left className="topic-svg"/> 
                    Rotate: Left-click and drag the mouse to rotate the camera around the target point.</p>
                <p>
                    <Wheel className="topic-svg"/>
                    Zoom: Scroll the mouse wheel to zoom in and out.</p>              
                <p>
                    <Right className="topic-svg"/>
                    Pan: Press and hold the right mouse button while dragging the mouse to pan the camera in the plane perpendicular to its direction.</p>              
                <p>There are additional camera controls available on the top-right corner of the screen such as moveTo: Changes the focal point; setPosition: Adjusts the camera's position; saveState: Saves your preferred view; reset: Returns to the saved view.</p>
              </div>
            </div>
            <div className="topic">
              <h2>Functional Buttons</h2>
              <p>On the bottom-left of the canvas, the Add Ball button enables users to place a new ball at the desired position.</p>
              <p>On the bottom-right of the canvas, the Filter button displays the balls based on the respective category selected.</p>
              <p>On the top-right of the screen, the Theme and Instructions buttons that are responsible for toggling the background color and opening the current instructions panel.</p>
            </div>
            <div className="topic">
              <h2>Step Sequencer</h2>
              <p>Located at the bottom section of the interface, the step sequencer allows you to activate or deactivate individual buttons to play the corresponding sound. The sequencer includes controls to play/stop the sequence, adjust the BPM, and load preset rhythms. Additionally, the platform displays a real-time spectrogram of the audio being played.</p>
            </div>
            <p>We hope you enjoy exploring and interacting with our platform. Happy sampling!</p>
            <button
              className="form_element button_close"
              onClick={handleCloseClick}
            >
              Let's play
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Info;