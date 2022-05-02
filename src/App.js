//import { hot } from "react-hot-loader/root";
import { useEffect, useState, useRef} from "react";
import { Viewer, Entity, PointGraphics, EntityDescription, GeoJsonDataSource, Scene, Globe, Camera} from "resium";
import { Cartesian3, Color } from "cesium";
import axios from 'axios';
import { SocketProvider } from "./SocketProvider";
import { SocketPositions } from "./SocketPositions";
import ControlPanel from './control-panel';
import LayerControl from "./layer-control";

//Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlMGY2Y2EwNy1lYjBjLTRlOTAtOTc4Yi01OGM4NTc5MTlhZWYiLCJpZCI6ODkzNTgsImlhdCI6MTY0OTcyNDM0OH0.d3owTfwWertUVKZyZ99sH-cWZJaPosgpJaotB5qmzJk';

const cameraInit = Cartesian3.fromDegrees(-83.08, 42.31, 6000);

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
           

            {/* <ControlPanel  /> */}
            <LayerControl />

      {isLoaded ? <SocketProvider auth={getAuth}>
      <SocketPositions></SocketPositions>
      <Scene backgroundColor={Color.CORNFLOWERBLUE} />
      <Globe />
      <Camera 
        position={cameraInit}
        />
    
    
      </SocketProvider> : <div>STILL WAITING...</div>}
    </Viewer> 
  
  );
}

export default App;