import React, { useContext, memo } from 'react'
import { Context } from '../hooks/useStore'
import Track from './Track'

const TrackList = ({ currentStepID, soundFiles, fftNode}) => {
    
    const { sequence: { trackList, noteCount } } = useContext(Context)
    const content = trackList.map((track, trackID) => {
        const {onNotes, soundFile } = track
        let soundFilePath = soundFiles[soundFile]
        
        let title = soundFilePath
        if (soundFilePath.startsWith("GS_")) {
            // Split soundFilePath at ".wav"
            let parts = soundFilePath.split(".wav");

            // Assign the first part to title
            title = parts[0];

            // Combine the second part with ".wav" to get the updated soundFilePath
            soundFilePath = parts[1];
        }
        else{
            title = title.split("/").pop().split(".")[0]
        }

        title = `${trackID + 1}. ${title}`;

        return (
            <Track
                key={trackID}
                trackID={+trackID}
                currentStepID={currentStepID}
                title={title}
                noteCount={noteCount}
                onNotes={onNotes}
                soundFilePath={soundFilePath}
                fftNode={fftNode}
            />
        )
    })

    return (
        <div className="track-list">
            {content}
        </div>
    )
}

export default memo(TrackList)

