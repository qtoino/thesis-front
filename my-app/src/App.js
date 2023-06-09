import React, { useState, useEffect, useRef, useContext } from 'react'
import { useQuery, useQueryClient } from 'react-query';
import ToolBar from './components/Toolbar'
import TrackList from './components/TrackList'
import PlayHead from './components/PlayHead'
import Spectrogram from './components/Spectrogram'
import { Provider } from './hooks/useStore'
import useTimer from './hooks/useTimer'
import useStyles from './hooks/useStyles'
import {FftContext} from './context/fftContext'
import './App.css';

import Space from './components/Space'

function App() {

  const baseBPMPerOneSecond = 60
  const stepsPerBar = 16
  const beatsPerBar = 4
  const barsPerSequence = 1
  const totalSteps = stepsPerBar * barsPerSequence
  const totalBeats = beatsPerBar * barsPerSequence

  const [BPM, setBPM] = useState(128)
  const [startTime, setStartTime] = useState(null)
  const [pastLapsedTime, setPastLapse] = useState(0)
  const [currentStepID, setCurrentStep] = useState(null)
  const [getNotesAreaWidthInPixels] = useStyles(totalSteps)
  const [showTrack, setShowTrack] = useState(true);

  const notesAreaWidthInPixels = getNotesAreaWidthInPixels(totalSteps)
  const timePerSequence = baseBPMPerOneSecond / BPM * 1000 * totalBeats
  const timePerStep = timePerSequence / totalSteps
  const isSequencePlaying = startTime !== null
  const playerTime = useTimer(isSequencePlaying)
  const lapsedTime = isSequencePlaying ? Math.max(0, playerTime - startTime) : 0
  const totalLapsedTime = pastLapsedTime + lapsedTime

  // useEffect(() => {
  //   grabGeneratedSounds();
  // }, []);

  const [soundFiles, setSoundFiles] = useState({
    '1': './audio/kick.wav',
    '2': './audio/snare.wav',
    '3': './audio/hh_open.wav',
    '4': './audio/hh_closed.wav'
  });

  const fftNode = useContext(FftContext)

  const queryClient = useQueryClient()
    //read from database
  // const {data, status} = useQuery('id', loadSoundFiles)
  
  useEffect(() => {
      if (isSequencePlaying) {
          setCurrentStep(Math.floor(totalLapsedTime / timePerStep) % totalSteps)
      } else {
          setCurrentStep(null)
      }
  }, [isSequencePlaying, timePerStep, totalLapsedTime, totalSteps])

  const toolBarProps = {
      setStartTime,
      setPastLapse,
      setBPM,
      isSequencePlaying,
      startTime,
      BPM
  }

  const playHeadProps = {
      notesAreaWidthInPixels,
      timePerSequence,
      totalLapsedTime
  }

  const trackListProps = {
      currentStepID,
      soundFiles,
      fftNode
  }

  const spaceProps = {
      soundFiles,
      setSoundFiles,
      // status,
      // data,
      queryClient
  }

  return (
    
    <FftContext.Provider value={fftNode}>
      <Provider>
          <div id = "wrapper">
            <div className="space">
                <Space {...spaceProps} />
            </div>
            <main className="app track">
                <div className="color-subtitle-container">
                  <div className="color-subtitle">
                    <div className="color-column">
                      <p><b>Categories:</b></p>
                      <p><span className="purple">#9c27b0</span> bongo</p>
                      <p><span className="pink">#fd5b78</span> claps</p>
                      <p><span className="orange">#ff6037</span> clicks</p>
                      <p><span className="yellow">#ffff66</span> crash</p>
                      <p><span className="pink-purple">#ff00cc</span> fx</p>
                      <p><span className="red">#ff0000</span> generated</p>
                      <p><span className="light-orange">#ff9966</span> hihat</p>
                      <p><span className="lime-green">#ccff00</span> kick</p>
                      </div>
                    <div className="color-column">
                      <p><span className="gray">#808080</span> others</p>
                      <p><span className="dark-orange">#ff9933</span> perc</p>
                      <p><span className="light-orange">#ffcc33</span> percussive</p>
                      <p><span className="light-green">#66ff66</span> rides</p>
                      <p><span className="light-blue">#aaf0d1</span> shaker</p>
                      <p><span className="pinkish-red">#ff355e</span> snares</p>
                      <p><span className="cyan">#16d0cb</span> synth</p>
                      <p><span className="light-blue">#50bfe6</span> tom</p>
                      <p><span className="pinkish-purple">#ee34d2</span> tribal</p>
                    </div>
                  </div>
                 </div> 
                <div className="app_content">
                    <PlayHead {...playHeadProps} />
                    <TrackList {...trackListProps} />
                    
                </div>
                <div className="app_controls">
                    <ToolBar {...toolBarProps} />
                </div>
                
                
                    
            </main >
          </div>
      </Provider>
    </FftContext.Provider>
  )
}

export default App

// const loadSoundFiles = async () => {
//   // Send data to the backend via POST
//   const res = await fetch('https://thesis-production-0069.up.railway.app/all-audio-files', {  // Enter your IP address here
//       method: 'GET', 
//       mode: 'cors',
//   })
//   return res.json()
// };
  
async function deleteGeneratedSounds() {
    try {
      const res = await fetch('https://thesis-production-0069.up.railway.app/delete-generated-sounds', {
        method: 'GET',
        mode: 'cors',
      });
  
      const data = await res.json();
  
      if (data.status !== 'success') {
        console.error('Error deleting generated sounds:', data.message);
      }
    } catch (error) {
      console.error('Error deleting generated sounds:', error);
    }
  }

  

  async function grabGeneratedSounds() {
    try {
      const res = await fetch('https://thesis-production-0069.up.railway.app/grab-generated-sounds', {
        method: 'GET',
        mode: 'cors',
      });
  
      const data = await res.json();
  
      if (data.status !== 'success') {
        console.error('Error deleting generated sounds:', data.message);
      }
    } catch (error) {
      console.error('Error deleting generated sounds:', error);
    }
  }