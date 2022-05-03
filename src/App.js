//import { hot } from "react-hot-loader/root";
import { useEffect, useState, useRef} from "react";
import { Viewer, Scene, Globe, Camera, CameraLookAt, CameraFlyTo} from "resium";
import { Cartesian3, Color, Math, HeadingPitchRange } from "cesium";
import axios from 'axios';
import { SocketProvider } from "./SocketProvider";
import { SocketPositions } from "./SocketPositions";
import React from "react";

import LayerControl from "./layer-control";

//Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlMGY2Y2EwNy1lYjBjLTRlOTAtOTc4Yi01OGM4NTc5MTlhZWYiLCJpZCI6ODkzNTgsImlhdCI6MTY0OTcyNDM0OH0.d3owTfwWertUVKZyZ99sH-cWZJaPosgpJaotB5qmzJk';

const cameraStart = Cartesian3.fromDegrees(-83.08, 40.31, 60000);
const cameraInit = Cartesian3.fromDegrees(-83.18, 42.35, 2000);
const heading = Math.toRadians(100.0);
const pitch = Math.toRadians(-20.0); 
const range = 5000.0;
const headPitchRange = new HeadingPitchRange(heading, pitch, range);

function App() {  
  const pdopColor = {
    1:Color.GREEN, 2:Color.CHARTREUSE, 3:Color.GREENYELLOW, 4:Color.YELLOW, 5:Color.GOLD, 6:Color.ORANGERED
  };
  const buildColor = {
    1:Color.GREEN, 2:Color.CHARTREUSE, 3:Color.GREENYELLOW, 4:Color.YELLOW, 5:Color.GOLD, 6:Color.ORANGERED
  };

  const [getAuth, setAuth] = useState(null);
  const ref = useRef(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  

  useEffect(() => {
    const config = {
      method: 'get',
      url: 'https://airhub-api-dev.airspacelink.com/laanc/v1/ticket',
      headers: { 
           }
    };
    const fetchData = async () => {
      const result = await axios(config);
      console.log(`result.data.data: ${result.data.data}`);
      setAuth(result.data.data);
      setIsLoaded(true);
    };
    fetchData();
  }, [])      
     
  return (
    
    <Viewer full
        ref={ref}
        baseLayerPicker={true}
        infoBox={true}
        homeButton={false}
        timeline={false}
        scene3DOnly={true}
        shadows={true}
        fullscreenButton={false}
        animation={false}  
    >
      <Camera position={cameraStart}>
        <LayerControl />

        {isLoaded ? <SocketProvider auth={getAuth}>
        <SocketPositions></SocketPositions>
        <Scene backgroundColor={Color.CORNFLOWERBLUE} />
        <Globe />
        </SocketProvider> : <div>STILL WAITING...</div>}
      {/* </CameraLookAt> */}
      {/* <CameraLookAt target={cameraInit} offset={headPitchRange}/> */}
      </Camera>
      <CameraFlyTo destination={cameraInit} orientation={headPitchRange}/>
    </Viewer> 
  
  );
}

export default App;