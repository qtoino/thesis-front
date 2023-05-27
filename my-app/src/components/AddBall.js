import React, { useCallback, useState, memo } from "react";
import * as THREE from 'three';
import Ball from './Ball'
import "./AddBall.css"

function AddBall({allBalls, queryClient, generatedUrlsRef, isLoading, setIsLoading, setBallInfront}) {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0, z: 0 });

  const handleInputChange = (event) => {
    setCoordinates({ ...coordinates, [event.target.name]: parseFloat(event.target.value) });
  };

  const handleAddBall = useCallback(async () => {
    if (isLoading) {
      console.log("wait for the generated audio")
      return;
    }
    
    const radius = 1.4
    const { x, y, z } = coordinates;
    const point = new THREE.Vector3(x, y, z)
    
    const distances = allBalls.current.map(p => point.distanceTo(new THREE.Vector3(...p)));
    const closestIndex = distances.indexOf(Math.min(...distances));
    const closestDistance = distances[closestIndex];
    
    if (closestDistance < radius) {
        console.log('Ball is in front of line, not creating new ball');
        setBallInfront(true)
        return;
    } else {
        try {
            const {name, url} = await generateNewSound([x, y, z], queryClient, setIsLoading);
            
            const sound = {
              name,
              url
            }

            generatedUrlsRef.current.push(sound);
            queryClient.invalidateQueries('id', { refetchActive: true });
            // const aux = await insertDatabase([x, y, z], name, url, queryClient);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
  }, [coordinates, isLoading]);

  return (
    <>
        <div className="coordinates">
          <div className="inputs">
            {['x', 'y', 'z'].map((coord) => (
                <input 
                    key={coord}
                    type="number"
                    id={coord}
                    name={coord}
                    step="any"
                    value={coordinates[coord]}
                    onChange={handleInputChange}
                    required
                />
            ))}
          </div>  
          <button className="buttonAdd" onClick={handleAddBall}>Add Ball</button>
        </div>
    </>
  );
}


export default memo(AddBall);

const generateNewSound = async (newPosition, queryClient, setIsLoading) => {
  // Send data to the backend via POST
  setIsLoading(true)
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
