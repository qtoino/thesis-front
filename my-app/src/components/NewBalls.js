import React from "react";
import { ReactComponent as RefreshIcon } from '../assets/refresh.svg';
import "./NewBalls.css";
import { useAnimations } from '@react-three/drei';
import { useCallback } from 'react';

function NewBalls({ setIsLoading, queryClient, isLoading}) {

    const iconStyle = {
        width: '20px',
        height: '20px',
      };
    
    const handleNewBalls = useCallback(async () => {
        if (isLoading) {
            console.log("wait for the generated audio")
            return;
        }

        const status = await randomSounds();
        queryClient.invalidateQueries('id', { refetchActive: true });
        setIsLoading(true)
    }, [isLoading]);

    return (
        <button className="newBall-button" onClick={handleNewBalls}>
            <RefreshIcon style={iconStyle} />
        </button>
    );
}

export default NewBalls;

const randomSounds = async () => {
    
    try {
      const res = await fetch('https://thesis-production-0069.up.railway.app/random-sounds', {
        method: 'GET',
        mode: 'cors',
      });
  
      const data = await res.json();
  
      if (data.status !== 'success') {
        console.error('Getting new sounds:', data.status);
      }
      return data.status
    } catch (error) {
      console.error('Getting new sounds:', error);
    }
  }