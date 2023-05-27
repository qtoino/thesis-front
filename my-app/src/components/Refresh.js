import React from "react";
import { ReactComponent as RemoveIcon } from '../assets/delete.svg';
import "./Refresh.css";
import { useAnimations } from '@react-three/drei';
import { useCallback } from 'react';

function Refresh({ setIsLoading, queryClient, isLoading}) {

    const iconStyle = {
        width: '20px',
        height: '20px',
      };
    
    const handleRefresh = useCallback(async () => {
        if (isLoading) {
            console.log("wait for the generated audio")
            return;
        }

        const status = await deleteGeneratedSounds();
        if (status === 'success'){
            queryClient.invalidateQueries('id', { refetchActive: true });
            setIsLoading(true)
        }
    }, [isLoading]);

    return (

        <button className="refresh-button" onClick={handleRefresh}>
            <RemoveIcon style={iconStyle} />
        </button>
    );
}

export default Refresh;

const deleteGeneratedSounds = async () => {
    
    try {
      const res = await fetch('https://thesis-production-0069.up.railway.app/delete-generated-sounds', {
        method: 'GET',
        mode: 'cors',
      });
  
      const data = await res.json();
  
      if (data.status !== 'success') {
        console.error('Error deleting generated sounds:', data.message);
      }
      return data.status
    } catch (error) {
      console.error('Error deleting generated sounds:', error);
    }
  }

  