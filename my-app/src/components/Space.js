import * as THREE from 'three'
import React, {useState, useEffect, useRef, memo} from 'react'
import { useFrame, Canvas } from '@react-three/fiber'
import { OrbitControls, Stats, CameraControls, GridHelper} from '@react-three/drei';
import { Html } from '@react-three/drei';
import { useQuery, useQueryClient } from 'react-query';
import { useControls, button, buttonGroup, folder } from 'leva'
import Ball from './Ball'
import InterpolationLine from './InterpolationLine'
import AddBall from './AddBall'
import FilterButton from './FilterButton'
import ThemeButton from './ThemeButton'
import Info from './Info'
import Grid from './Grid'

const { DEG2RAD } = THREE.MathUtils

const Space = ({soundFiles, setSoundFiles, queryClient}) => {
    console.log("and again")
    const cameraControlsRef = useRef()

    const [gridVisible, setGridVisible] = useState(false);

    const toggleGrid = () => {
      setGridVisible(!gridVisible);
    };

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [balls, setBalls] = useState(null)
    const mapBalls = useRef()
    
    const [ballsSelected, setballsSelected] = useState([])
    
    const allBalls = useRef([])

    const generatedUrlsRef = useRef([]);
    
    const classes = useRef(["favorites"])

    const [isLoading, setIsLoading] = useState(true);

    const {data, status} = useQuery('id', loadSoundFiles)


    useEffect(() => {
      // Add event listeners to the document to listen for keydown events
      document.addEventListener('keydown', handleKeyDown);
      
      // Clean up the event listener when the component unmounts
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    
  
    function handleKeyDown(event) {
      // Check the key code of the pressed key
      switch (event.code) {
        case 'ArrowRight':
          cameraControlsRef.current?.truck(5, 0, true); // Move right
          break;
        case 'ArrowUp':
          cameraControlsRef.current?.truck(0, -5, true); // Move up
          break;
        case 'ArrowDown':
          cameraControlsRef.current?.truck(0, 5, true); // Move down
          break;
        case 'ArrowLeft':
          cameraControlsRef.current?.truck(-5, 0, true); // Move left
          break;
        case 'KeyA':
          cameraControlsRef.current?.rotate(-5 * DEG2RAD, 0, true); // Rotate left
          break;
        case 'KeyD':
          cameraControlsRef.current?.rotate(5 * DEG2RAD, 0, true); // Rotate right
          break;
        case 'KeyW':
          cameraControlsRef.current?.rotate(0, -5 * DEG2RAD, true); // Rotate up
          break;
        case 'KeyS':
          cameraControlsRef.current?.rotate(0, 5 * DEG2RAD, true); // Rotate down
          break;
        case 'KeyS':
          cameraControlsRef.current?.rotate(0, 5 * DEG2RAD, true); // Rotate down
          break;
        case 'KeyS':
          cameraControlsRef.current?.rotate(0, 5 * DEG2RAD, true); // Rotate down
          break;
        // Add more cases for other keys if needed
        default:
          break;
      }
    }

    

    useEffect(() => {
      (async function() {
        if (status === 'loading'){
          console.log("Loading")
        }
        else if (status === 'error'){
          console.log("error")
        }
        else{
          console.log("reloaded")
          
          let mappedBalls = [];
          
          for (const object of data.audio_data) {
            if (!object.x) {
              continue; // skip if x is not defined
            }
            
            allBalls.current = [...allBalls.current, [object.x, object.y, object.z]] // add the position array to allBalls
    
            // push the color to the classes array only if it hasn't been added already
            if (!classes.current.includes(object.class)) {
              classes.current = [...classes.current, object.class];
            }
    
            let path2audio;
            
            if (object.name.startsWith('GS')) {
              // console.log(object.name)
              const sound = generatedUrlsRef.current.find(sound => sound.name === object.name);
              
              if (sound){
                path2audio = sound.url
              }
              else{
                const {name, url} = await getURLleft(object.name)
                // Add the new URL to the ref
                const sound_aux = {
                  name: name,
                  url: url
                }
                // console.log(sound_aux)
                generatedUrlsRef.current.push(sound_aux);
                path2audio = url
              }
            } else {
              path2audio = object.path
            }
    
            const ball = <Ball position={[object.x, object.y, object.z]} color={object.color} sound={object.name} path={path2audio} favorite={object.favorite} soundFiles={soundFiles} setSoundFiles={setSoundFiles} key={object.id} queryClient={queryClient} onClick={handleClick}/>;
            
            mappedBalls.push(ball);
          }
          
          setBalls(mappedBalls);
          mapBalls.current = mappedBalls;
          setIsLoading(false)
        }
      })(); // immediately invoke async function
    }, [data, status, getURLleft]);
    
    async function handleFilter(color) {
      
      if(color === "favorites"){
        const favBalls = await loadFavSoundFiles()
        // console.log(favBalls.audio_data[0][0])
        const filteredBalls = mapBalls.current.filter(ball => favBalls.audio_data.some(audio => audio[0] === ball.props.sound));

      
        setBalls(filteredBalls);
      }
      else{
        const filteredBalls = mapBalls.current.filter(ball => ball.props.color === color)
        setBalls(filteredBalls);
      }
    }

    function handleClearFilters() {
      // console.log(mapBalls)
      setBalls(mapBalls.current)
    }

    function invalidateQuery() {
      queryClient.invalidateQueries('id', { refetchActive: true })
    }

    function handleClick(state, position) {

      if(!state){
        if(allBalls.current.some(ball => ball[0] === position[0] && ball[1] === position[1] && ball[2] === position[2])){
          setballsSelected((prevState) => {
            const updatedState = prevState.length >= 2 ? prevState.slice(1) : prevState;
            return [...updatedState, position];
          });
        }
      }
      else{
        setballsSelected((prevState) =>
          prevState.filter((pos) =>
            pos[0] !== position[0] || pos[1] !== position[1] || pos[2] !== position[2]
          )
        )
      } 
    }

    const { } = useControls({
      thetaGrp: buttonGroup({
        label: 'rotate theta',
        opts: {
          '+45º': () => cameraControlsRef.current?.rotate(45 * DEG2RAD, 0, true),
          '-45º': () => cameraControlsRef.current?.rotate(-45 * DEG2RAD, 0, true),
        }
      }),
      phiGrp: buttonGroup({
        label: 'rotate phi',
        opts: {
          '+45º': () => cameraControlsRef.current?.rotate(0, 45 * DEG2RAD, true),
          '-45º': () => cameraControlsRef.current?.rotate(0, -45 * DEG2RAD, true)
        }
      }),
      truckGrp: buttonGroup({
        label: 'translate',
        opts: {
          'RIGHT': () => cameraControlsRef.current?.truck(5, 0, true),
          'UP': () => cameraControlsRef.current?.truck(0, -5, true),
          'DOWN': () => cameraControlsRef.current?.truck(0, 5, true),
          'LEFT': () => cameraControlsRef.current?.truck(-5, 0, true)
        }
      }),
      dollyGrp: buttonGroup({
        label: 'zoom',
        opts: {
          'in': () => cameraControlsRef.current?.dolly(1.2, true),
          'our': () => cameraControlsRef.current?.dolly(-1.2, true)
        }
      }),
      moveTo: folder(
        {
          vec1: { value: [0, 0, 0], label: 'vec' },
          'moveTo(…vec)': button((get) => cameraControlsRef.current?.moveTo(...get('moveTo.vec1'), true))
        },
        { collapsed: true }
      ),
      setPosition: folder(
        {
          vec2: { value: [3, 3, 3], label: 'vec' },
          'setPosition(…vec)': button((get) => cameraControlsRef.current?.setPosition(...get('setPosition.vec2'), true))
        },
        { collapsed: true }
      ),
      saveState: button(() => cameraControlsRef.current?.saveState()),
      reset: button(() => cameraControlsRef.current?.reset(true)),
    })
    const labelStyle = {
      color: 'black',
      marginRight: '50%',
      fontSize: '24px',
      lineHeight: '2px',
    };
    
    return (
      <>
      <Canvas camera={{ position: [250, 0, 0] }} style={{ background: isDarkMode ? 'black' : 'white' }}>
        <ambientLight intensity={0.8} />
        <directionalLight />
        <pointLight position={[20, 20, 20]} />
        <OrbitControls />
        <CameraControls
          ref={cameraControlsRef}
        />
        {balls}
        <InterpolationLine ballsSelected={ballsSelected} allBalls={allBalls} queryClient={queryClient} generatedUrlsRef={generatedUrlsRef} isLoading={isLoading} setIsLoading={setIsLoading}/>
        <Stats />
        {gridVisible && (
          <>
            <gridHelper args={[300, 300, 0x37e147, 'teal']} rotation-x={Math.PI / 2} />
            <gridHelper args={[300, 300, 0x37e147, 'teal']} rotation-z={Math.PI / 2} />
            <gridHelper args={[300, 300, 0x37e147, 'teal']}/>
          </>)}
      </Canvas>
      <AddBall allBalls={allBalls} queryClient={queryClient} generatedUrlsRef={generatedUrlsRef} isLoading={isLoading} setIsLoading={setIsLoading}/>
      <FilterButton onClick={handleFilter} clearFilters={handleClearFilters} classes={classes.current}/>
      <ThemeButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Grid toggleGrid={toggleGrid}/>
      {/* <NewBalls getNewBalls={invalidateQuery}/> */}
      <Info/>
      {isLoading && (
      <div 
        style={{
          position: 'fixed', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          zIndex: 100, 
          background: 'rgba(0, 0, 0, 0.8)', 
          color: 'white', 
          padding: '20px', 
          borderRadius: '10px'
        }}
      >
        Loading wav files...
      </div>
      )}

      </>
    )
}

export default Space

const loadSoundFiles = async () => {
  // Send data to the backend via POST
  const res = await fetch('https://thesis-production-0069.up.railway.app/all-audio-files', {  // Enter your IP address here
      method: 'GET', 
      mode: 'cors',
  })
  return res.json()
};

const loadFavSoundFiles = async () => {
  // Send data to the backend via POST
  const res = await fetch('https://thesis-production-0069.up.railway.app/favorite-audio-files', {  // Enter your IP address here
      method: 'GET', 
      mode: 'cors',
  })
  const data =  await res.json()
  return data
};

function NewBalls({ getNewBalls }) {
  return (
    <button onClick={getNewBalls}>
      Get New Balls
    </button>
  );
}

const getURLleft = async (soundname) => {
  // Send data to the backend via POST
  try{
      const res = await fetch('https://thesis-production-0069.up.railway.app/getURL', {  // Enter your IP address here
          method: 'POST', 
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          mode: 'cors',
          body: JSON.stringify({
              sound:soundname,
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