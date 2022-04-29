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
                  'x-api-key': 'a031edbdf36d4d26aba4767ae74439e5', 
                  'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ild3dDk2SlJDTE9ER1pEeEpiRVVxdSJ9.eyJpc3MiOiJodHRwczovL2FpcnNwYWNlbGluay1kZXYudXMuYXV0aDAuY29tLyIsInN1YiI6Ild4RldmbndneTB4aWVYZFd3czZPcU1pZlYxbkU5RWs2QGNsaWVudHMiLCJhdWQiOiJodHRwczovL2FwaW0tZW5nLWRldi1jdXMuYXp1cmUtYXBpLm5ldCIsImlhdCI6MTY0ODc3MTY2MCwiZXhwIjoxNjUxMzYzNjYwLCJhenAiOiJXeEZXZm53Z3kweGllWGRXd3M2T3FNaWZWMW5FOUVrNiIsInNjb3BlIjoiYWlyaHViLWFwaS9hZHZpc29yeS5yZWFkIGFpcmh1Yi1hcGkvdG9rZW4uY3JlYXRlIGFpcmh1Yi1hcGkvcm91dGUuY3JlYXRlIGFpcmh1Yi1hcGkvaGF6YXIucmVhZCBhaXJodWItYXBpL2F2aWF0aW9uLnJlYWQgYWlyaHViLWFwaS9vcGVyYXRpb24uY3JlYXRlIGFpcmh1Yi1hcGkvbGFhbmMub3BlcmF0b3IgYWlyaHViLW1uZ210LWFwaS91c2VyLnVwZGF0ZSBhaXJodWItbW5nbXQtYXBpL3VzZXIucmVhZCBhaXJodWItbW5nbXQtYXBpL3VzZXIubWFuYWdlIGFpcmh1Yi1hcGkvZmxpZ2h0LnJlYWQgYWlyaHViLWFwaS9hZG1pbi5yZWFkIGFpcmh1Yi1hcGkvYWR2aXNvcnkuY3JlYXRlIGFpcmh1Yi1hcGkvYWR2aXNvcnkudXBkYXRlIGFpcmh1Yi1hcGkvYWR2aXNvcnkuZGVsZXRlIGFpcmh1Yi1hcGkvc3VyZmFjZS5nZW5lcmF0ZSBhaXJodWItYXBpL21ldGFkYXRhLnJlYWQgYWlyaHViLWFwaS9zdWl0YWJpbGl0eS5nZW5lcmF0ZSBhaXJodWItYXBpL3V0bS5ub3RpZnkgYWlyaHViLWFwaS9pbnRlcm5hbC50ZXN0IGFpcmh1Yi1hcGkvZWxldmF0aW9uLnJlYWQgYWlyaHViLWFwaS90aWNrZXQuY3JlYXRlIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwicGVybWlzc2lvbnMiOlsiYWlyaHViLWFwaS9hZHZpc29yeS5yZWFkIiwiYWlyaHViLWFwaS90b2tlbi5jcmVhdGUiLCJhaXJodWItYXBpL3JvdXRlLmNyZWF0ZSIsImFpcmh1Yi1hcGkvaGF6YXIucmVhZCIsImFpcmh1Yi1hcGkvYXZpYXRpb24ucmVhZCIsImFpcmh1Yi1hcGkvb3BlcmF0aW9uLmNyZWF0ZSIsImFpcmh1Yi1hcGkvbGFhbmMub3BlcmF0b3IiLCJhaXJodWItbW5nbXQtYXBpL3VzZXIudXBkYXRlIiwiYWlyaHViLW1uZ210LWFwaS91c2VyLnJlYWQiLCJhaXJodWItbW5nbXQtYXBpL3VzZXIubWFuYWdlIiwiYWlyaHViLWFwaS9mbGlnaHQucmVhZCIsImFpcmh1Yi1hcGkvYWRtaW4ucmVhZCIsImFpcmh1Yi1hcGkvYWR2aXNvcnkuY3JlYXRlIiwiYWlyaHViLWFwaS9hZHZpc29yeS51cGRhdGUiLCJhaXJodWItYXBpL2Fkdmlzb3J5LmRlbGV0ZSIsImFpcmh1Yi1hcGkvc3VyZmFjZS5nZW5lcmF0ZSIsImFpcmh1Yi1hcGkvbWV0YWRhdGEucmVhZCIsImFpcmh1Yi1hcGkvc3VpdGFiaWxpdHkuZ2VuZXJhdGUiLCJhaXJodWItYXBpL3V0bS5ub3RpZnkiLCJhaXJodWItYXBpL2ludGVybmFsLnRlc3QiLCJhaXJodWItYXBpL2VsZXZhdGlvbi5yZWFkIiwiYWlyaHViLWFwaS90aWNrZXQuY3JlYXRlIl19.KMRxUJA3V6xAM71x_VDZrE5S__kO47HafQuyhcntASowzU13o3lY49vY5EVTxciC2sIOIb5WQtjASZhPWs9JxWBQUTSs_LbsHZ2M0o3xxSUnoAsjHWNoKLy_RXZ25EQnHuEbBR-HecmZZnoDpcaUKk8bbFWS4QC1d4O9dLR_fenzKx_hcDoFebTVzGl6gR6LhIyae-E3BaL72pZKkzWEBaLEVJmlrcRVEcq8PqjWH1b-AlBBHMBHoC2cSiT-bswoC0eZFqr4wifGayl6hRfg5r-kQNCso7usQgcY2phu_Updt6i0QTRnoeSmwTqIJ6b_6J4vIIfEL9Rr-u7HdM9aUw'
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