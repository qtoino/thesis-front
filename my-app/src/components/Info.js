import React, { useState } from "react";
import { ReactComponent as Question } from '../assets/question.svg';
import { ReactComponent as Left } from '../assets/left.svg';
import { ReactComponent as Right } from '../assets/right.svg';
import { ReactComponent as Wheel } from '../assets/wheel.svg';
import { ReactComponent as AButton } from '../assets/a.svg';
import { ReactComponent as SButton } from '../assets/s.svg';
import { ReactComponent as DButton } from '../assets/d.svg';
import { ReactComponent as QButton } from '../assets/q.svg';
import { ReactComponent as WButton } from '../assets/w.svg';
import { ReactComponent as EButton } from '../assets/e.svg';
import { ReactComponent as AUp } from '../assets/arrowup.svg';
import { ReactComponent as ADown } from '../assets/down.svg';
import { ReactComponent as ARight } from '../assets/aright.svg';
import { ReactComponent as ALeft } from '../assets/arrowleft.svg';
import downImage from '../assets/down.gif';
import upImage from '../assets/up.gif';
import righImage from '../assets/righ.gif';
import leftImage from '../assets/left.gif';
import DImage from '../assets/D.gif';
import AImage from '../assets/A.gif';
import WImage from '../assets/W.gif';
import SImage from '../assets/S.gif';
import Zoom from '../assets/zoom.gif';
import MRigh from '../assets/rightmouse.gif';
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

            
            <div className="topic">
              <img src="./images/logo_original1.png" alt="SampleXplorer Logo" style={{display: "inline", width: "180px", height: "100px"}}/>
              <h1>SampleXplorer</h1> 
            </div>
            <div className="topic">
              <p>Welcome to SampleXplorer, our experimental platform designed for <b>playing</b> and <b>sharing</b> sounds! This user-friendly platform allows everyone, from casual users to professional artists, to explore, choose and generate sound samples for their music in a visually engaging environment. The generated sounds are shared in the platform with all the other users online.</p>
              <p>&#9940; Because the website uses a lot of audio files, it advised to have a GPU. If the "Loading audio files" message takes more than 30 seconds to disappear, try refreshing the page. In the beggining it might be a little slower or even brake but in anycase, just reload the page. To get a better experience, we advise you to use <b>Chrome</b> web browser. &#9940;</p>
              <p>&#9940; <b>READ THIS MANUAL CAREFULLY AND PLEASE ANSWER THE EVALUATION FORM BELOW.</b> &#9940;</p>
            </div>
            <div className="topic">
              <h2>Sample Packs</h2>
              <p>Currently, our platform hosts a <b>deep learning model</b> that was trained on two sample packs: Vengeance Essential House Vol. 1 and Vengeance Analog Drums Vol. 1.</p>
              <div style={{display: "flex", justifyContent: "space-evenly"}}>
                <img src="./images/Vengeance-Essential-House-Vol.1.png" style={{width: "45%", height: "auto"}}/>
                <img src="./images/vengeance-analog-drums.jpeg" style={{width: "45%", height: "auto"}}/>
              </div>
            </div>
            <h1>Manual</h1>
            <div className="topic">
              <div className="topic-wrapper">
                <h2>Interaction with Balls</h2>
                <p>
                    <Left className="topic-svg"/>
                    Left click: Allows you to <b>play</b> the sound. You can also send the sound to one of the tracks at the bottom of the interface by <b>clicking</b> one of its corresponding number <b>[1][2][3][4]</b>. When you click the number of the track, it does not change the name right away, but the sound is there. &#128540;</p>
                <div style={{display: "flex", justifyContent: "space-evenly"}}>
                  <img src="./images/playermenu.png" style={{width: "45%", height: "auto"}}/>
                </div>
                <p>
                    <Right className="topic-svg"/>
                    Right click: Allows you to add or remove a sound from your <b>favorites</b> list, <b>delete</b> the ball from the interface, or <b>download</b> the sound.</p>     
                <div style={{display: "flex", justifyContent: "space-evenly"}}>
                  <img src="./images/contectmenu.png" style={{width: "70%", height: "auto"}}/>
                </div>
              </div>
            </div>
            <div className="topic">
              <h2>BIL (Big Interpolation Line)</h2>
              <p>When two balls are selected, an interpolation line is formed between them. By <b>clicking on the line</b>, you can generate a new ball/sound <b>mixing</b> the two selected sounds. Don't worry if don't see the new sound right away, either it's being generated or it's just behind BIL. Try to rotate the camera to see if it's there. &#128513; </p>
              <div style={{display: "flex", justifyContent: "space-evenly"}}>
                  <img src="./images/bil.png" style={{width: "75%", height: "auto"}}/>
              </div>
            </div>
            <div className="topic">
              <h2>Camera Controls</h2>
              <div className="topic-wrapper">
                <p>The camera controls are simple but you need to get used to them so try to mess with them in the beggining.</p>
                <div className="grid-container2">
                <div className="grid-item">
                    <Left className="topic-svg"/> 
                    <br></br>
                    <br></br> 
                    <img className="biggif" src={AImage} alt="AI" />
                    <br></br>
                    <br></br>
                  </div>
                  <div className="grid-item">
                    <Wheel className="topic-svg"/>
                    <br></br>
                    <br></br>
                    <img className="biggif" src={Zoom} alt="ZOOM" />
                    <br></br>
                    <br></br>
                  </div>
                  <div className="grid-item">
                    <Right className="topic-svg"/>
                    <br></br>
                    <br></br>
                    <img className="biggif" src={MRigh} alt="MRIGHT" />
                    <br></br>
                    <br></br>
                  </div>
                </div>
                <p>
                    <Left className="topic-svg"/> 
                    Left click and drag: <b>Rotate</b> the camera around the target point.</p>
                <p>
                    <Wheel className="topic-svg"/>
                    Scroll the wheel: <b>Zoom</b> in and out.</p>              
                <p>
                    <Right className="topic-svg"/>
                    Right click and drag: <b>Pan</b> the camera in the plane perpendicular to its direction.</p>    
                <h2>Other Camera Controls</h2>
                <div className="topic-wrapper">
                  <p>There are additional camera controls available on the top-right corner of the screen such as:</p>
                  <ul className="list">
                    <li className="list-item"><b>moveTo</b>: Changes the focal point;</li>
                    <li className="list-item"><b>setPosition</b>: Adjusts the camera's position;</li>
                    <li className="list-item"><b>saveState</b>: Saves your current view;</li>
                    <li className="list-item"><b>reset</b>: Returns to the saved view.</li>
                  </ul>
                </div>

                <div style={{display: "flex", justifyContent: "space-evenly"}}>
                  <img src="./images/cameractl.png" style={{width: "40%", height: "auto"}}/>
                </div>              
                
              </div>
            </div>
            <div className="topic">
              <h2>Functional Buttons</h2>
              <p>On the bottom-left of the canvas, the <b>Categories Search Bar</b> displays the balls based on the respective category selected.</p>
              <div style={{display: "flex", justifyContent: "space-evenly"}}>
                  <img src="./images/filter1.png" style={{width: "35%", height: "auto"}}/>
              </div>
              <br></br>
              <br></br>
              <p>On the bottom-right of the canvas, the <b>Add Ball</b> button enables users to place a new ball at near the desired position. Because we use a Deep Learning algorithm, the ball is not generated in the exact position that you input.</p>
              <div style={{display: "flex", justifyContent: "space-evenly"}}>
                  <img src="./images/addball.png" style={{width: "55%", height: "auto"}}/>
              </div>
              <br></br>
              <br></br>
            </div>
            <div className="topic">
              <h2>Step Sequencer</h2>
              <p>Located at the bottom section of the interface, is the step sequencer. 
              You can costumize the rhythmic pattern as you wish by clicking the rectangles and the volume of the track by moving the slider next to it. The sequencer includes controls to play/stop the sequence, adjust the BPM, and load preset rhythms. You can hear the sounds that you selected previously in the 1-4 ball options.</p>
              <p>On the bottom-right is the <b>Theme</b>, <b>Grid</b> and <b>Instructions</b> buttons that are responsible for toggling the background color, toggling the auxiliary grid and opening the current instructions panel.</p>
              <p>There is also the <blue>blue</blue> button and <red>red</red> buttons that <blue>refresh</blue> the balls that are displayed on the screen and <red>delete</red> all the generated balls respectively.</p> 
              <div style={{display: "flex", justifyContent: "space-evenly"}}>
                  <img src="./images/sequencer.png" style={{width: "100%", height: "auto"}}/>
              </div>
            </div>
            <h2>Key shortcuts</h2>
            <div className="grid-container">
            <div className="grid-item">
                <QButton className="icon" />
                <button className="form_element2 button_stop1" aria-label="Stop">
                  <svg width="14" height="14" viewBox="0 0 14 14">
                    <rect className="button_icon_path" x="2" y="2" width="10" height="10" />
                  </svg>
                </button>
                <br></br>
                <br></br>
              </div>
              <div className="grid-item">
                <WButton className="icon" />
                <img className="gif" src={WImage} alt="W" />
                <br></br>
                <br></br>
              </div>
              <div className="grid-item">
                <EButton className="icon" />
                <button className="form_element2 button_play1" aria-label="Play">
                  <svg width="14" height="14" viewBox="0 0 14 14">
                    <rect className="button_icon_path" x="2" y="2" width="10" height="10" />
                  </svg>
                </button>
                <br></br>
                <br></br>
              </div>
              <div className="grid-item">
                
                <br></br>
                <br></br>
              </div>
              <div className="grid-item">
                <AUp className="icon" />
                <img className="gif" src={upImage} alt="Up" />
                <br></br>
                <br></br>
              </div>
              <div className="grid-item">
                
                <br></br>
                <br></br>
              </div>
              <div className="grid-item">
                <AButton className="icon" />
                <img className="gif" src={AImage} alt="A" />
                <br></br>
                <br></br>
              </div>
              <div className="grid-item">
                <SButton className="icon" />
                <img className="gif" src={SImage} alt="S" />
                <br></br>
                <br></br>
              </div>
              <div className="grid-item">
                <DButton className="icon" />
                <img className="gif" src={DImage} alt="D" />
                <br></br>
                <br></br>
              </div>
              
              <div className="grid-item">
                <ALeft className="icon" />
                <img className="gif" src={leftImage} alt="Left" />
                <br></br>
                <br></br>
              </div>
              <div className="grid-item">
                <ADown  className="icon" />
                <img className="gif" src={downImage} alt="Down" />
                <br></br>
                <br></br>
              </div>
              <div className="grid-item">
                <ARight  className="icon" />
                <img className="gif" src={righImage} alt="r" />
                <br></br>
                <br></br>
              </div>

            </div>

            <div className="topic">
              <h2>-------TRY THESE TASKS:--------</h2>
              <p><b>1st task:</b> Use the Categories dropdown menu to pick at least 2 different categories of sounds.</p>
              <p><b>2th task:</b> Generate a new sound with BIL.</p>
              <p><b>3rd task:</b> Generate a new sound with Add Ball Button.</p>
              <p><b>4th task:</b> Try a different rhythmic pattern.</p>
              <p><b>5th task:</b> Add at least 2 different ball sounds to the step sequencer.</p>
              <p><b>After completing all the 5 main tasks, please answer <a href="https://form.jotform.com/frs98/samplexplorer">this questionaire</a>.</b></p>
              <h2>-----------------------------------</h2>
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