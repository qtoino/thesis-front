import React, {memo, useState, useRef} from 'react';
import { Line, Mesh, Circle } from '@react-three/drei';
import * as THREE from 'three';
import Ball from './Ball'
import useSound from '../hooks/useTone'

const InterpolationLine = ({ ballsSelected, allBalls, queryClient, generatedUrlsRef, isLoading, setIsLoading}) => {
    
    const radius = 1.4

    async function onClick (event) {

        // Block the function if isLoading is true
        if (isLoading) {
            console.log("wait for the generated audio")
            return;
        }
        
        const clickedPosition = [event.point.x, event.point.y, event.point.z];

        const distances = allBalls.current.map(p => event.point.distanceTo(new THREE.Vector3(...p)));
        const closestIndex = distances.indexOf(Math.min(...distances));
        const closestDistance = distances[closestIndex];
        
        
        // Check if the closest ball is in front of the line
        if (closestDistance < radius) {
            console.log('Ball is in front of line, not creating new ball');
            return;
        }
        else {
            //console.log(clickedPosition)
            //console.log(ballsSelected)
            const {name, url} = await generateNewSound(clickedPosition, ballsSelected, queryClient, setIsLoading)
            
            const sound = {
                name: name,
                url: url
            }

            // Add the new URL to the ref
            generatedUrlsRef.current.push(sound);
            queryClient.invalidateQueries('id', { refetchActive: true })
            console.log(generatedUrlsRef.current)
            // const aux = await insertDatabase(clickedPosition, name, url, queryClient)
        }
    }
    
    
  return (
    <>
        {ballsSelected.length >= 2 && <Line
            points={ballsSelected.map(p => new THREE.Vector3(...p))}
            color="burlywood"
            lineWidth={195}
            onClick={onClick}
            transparent={true}
        />}
    </>
  );
};

export default memo(InterpolationLine);

const generateNewSound = async (clickedPosition, ballsSelected, queryClient, setIsLoading) => {
    // Send data to the backend via POST
    setIsLoading(true);
    try{
        const res = await fetch('https://thesis-production-0069.up.railway.app/interpole', {  // Enter your IP address here
            method: 'POST', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({
                x:clickedPosition[0],
                y:clickedPosition[1],
                z:clickedPosition[2],
                ball1_x:ballsSelected[0][0],
                ball1_y:ballsSelected[0][1],
                ball1_z:ballsSelected[0][2],
                ball2_x:ballsSelected[1][0],
                ball2_y:ballsSelected[1][1], 
                ball2_z:ballsSelected[1][2]
            }),
        })
        // const data = await res.blob();
        const data = await res.json();
        //console.log(data)
        const audioName = data.audio_name;
        //console.log(data)
  
        // Decode the Base64 encoded audio data back to a Blob
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
        console.log(e)
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