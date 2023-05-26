import React, { useEffect, useContext, memo, useRef } from 'react';
import { sequenceList } from '../constants/config';
import { Context } from '../hooks/useStore';
import RecordButton from './RecodButton';
import './Toolbar.css';

const ToolBar = ({
  setStartTime,
  setPastLapse,
  setBPM,
  isSequencePlaying,
  startTime,
  BPM,

}) => {
  const { sequence: { id: selectedSequenceID }, selectSequence } = useContext(Context);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function handleKeyDown(event) {
    switch (event.code) {
      case 'KeyQ':
        stopPlayback();
        break;
      case 'KeyE':
        togglePlayback();
        break;
      default:
        break;
    }
  }

  function togglePlayback() {
    if (isSequencePlaying) {
      setPastLapse(l => l + performance.now() - startTime);
      setStartTime(null);
    } else {
      setStartTime(performance.now());
    }
  }

  function stopPlayback() {
    setPastLapse(0);
    setStartTime(null);
  }

  function updateBPM(e) {
    setBPM(e.target.value);
  }

  return (

    <div className="super-parent">
      <p>Rhythmic presets:</p>
      <select
        className="form_element select_sequence"
        value={selectedSequenceID}
        onChange={e => selectSequence(+e.target.value)}
        aria-label="Select sequence"
      >
        {sequenceList.map(seq => (
          <option key={seq.id} value={seq.id}>
            {seq.title}
          </option>
        ))}
      </select>
      <nav className="toolbar">
        <button className="form_element2 button_stop" onClick={stopPlayback} aria-label="Stop">
          <svg width="14" height="14" viewBox="0 0 14 14">
            <rect className="button_icon_path" x="2" y="2" width="10" height="10" />
          </svg>
        </button>
        <button className="form_element2 button_play_pause" onClick={togglePlayback} aria-label="Play / Pause">
          <svg width="14" height="14" viewBox="8 8 20 20">
            {isSequencePlaying && (
              <path
                className="button_icon_path"
                id="pause-icon"
                data-state="playing"
                d="M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26"
              />
            )}
            {!isSequencePlaying && (
              <path
                className="button_icon_path"
                id="play-icon"
                data-state="paused"
                d="M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28"
              />
            )}
          </svg>
        </button>
      </nav>
      <input className="form_element input_bpm" id="bpm" type="text" value={BPM} onChange={updateBPM} />
      <label className="label_bpm" htmlFor="bpm">
        BPM
      </label>
    </div>
  );
  
};

export default memo(ToolBar);
