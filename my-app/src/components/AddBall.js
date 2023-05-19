import React, { useState, memo } from "react";
import * as THREE from 'three';
import Ball from './Ball'
import "./AddBall.css"

function AddBall({allBalls, queryClient, generatedUrlsRef}) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);

  function handleXChange(event) {
    setX(parseFloat(event.target.value));
  }

  function handleYChange(event) {
    setY(parseFloat(event.target.value));
  }

  function handleZChange(event) {
    setZ(parseFloat(event.target.value));
  }

  async function handleAddBall(){

    const radius = 1.4

    const point = new THREE.Vector3(...[x, y, z])
    const newPosition = [x, y, z];
    
    const distances = allBalls.current.map(p => point.distanceTo(new THREE.Vector3(...p)));
    const closestIndex = distances.indexOf(Math.min(...distances));
    const closestDistance = distances[closestIndex];
    
    // Check if the closest ball is in front of the line
    if (closestDistance < radius) {
        console.log('Ball is in front of line, not creating new ball');
        return;
    }
    else {
        const {name, url} = await generateNewSound(newPosition, queryClient)
        // console.log(data)
        
        const sound = {
          name: name,
          url: url
        }

        // Add the new URL to the ref
        generatedUrlsRef.current.push(sound);
        queryClient.invalidateQueries('id', { refetchActive: true })
        // const aux = await insertDatabase(newPosition, name, url, queryClient)
    }
  }

  return (
    <>
        <div className="coordinates">
          <div className="inputs">
            <input type="number" id="x" name="x" step="any" value={x} onChange={handleXChange} required />

            <input type="number" id="y" name="y" step="any" value={y} onChange={handleYChange} required />

            <input type="number" id="z" name="z" step="any" value={z} onChange={handleZChange} required />
          </div>  
          <button className="buttonAdd" onClick={handleAddBall}>Add Ball</button>
        </div>
    </>
  );
}

export default memo(AddBall);

const generateNewSound = async (newPosition, queryClient) => {
  // Send data to the backend via POST
  try{
      const res = await fetch('https://thesis-production-0069.up.railway.app/addnew', {  // Enter your IP address here
          method: 'POST', 
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          mode: 'cors',
          body: JSON.stringify({
              x:newPosition[0],
              y:newPosition[1],
              z:newPosition[2]
          }),
      })
      const data = await res.json();
      const audioName = data.audio_name;
      //console.log(data)

      //Decode the Base64 encoded audio data back to a Blob
      const byteCharacters = atob(data.audio_data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const audioBlob = new Blob([byteArray], { type: "audio/wav" });

      const audioURL = URL.createObjectURL(audioBlob); // Convert the Blob to an Object URL       
      // queryClient.invalidateQueries('id', { refetchActive: true })
      return {
          name: audioName, url: audioURL
      }
  } catch (e) {
      return e;
  } 
};

const insertDatabase = async (newPosition, audioName, audioURL, queryClient) => {
  // Send data to the backend via POST
  try{
      const res = await fetch('https://thesis-production-0069.up.railway.app/addpath', {  // Enter your IP address here
          method: 'POST', 
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          mode: 'cors',
          body: JSON.stringify({
              x:newPosition[0],
              y:newPosition[1],
              z:newPosition[2],
              name:audioName,
              url:audioURL
          }),
      })
      const data = await res.json();
      //console.log(data)
      queryClient.invalidateQueries('id', { refetchActive: true })
      return data;
  } catch (e) {
      return e;
  } 
};
