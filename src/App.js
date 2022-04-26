//import { Color } from "cesium";
//import { hot } from "react-hot-loader/root";
//import * as Cesium from 'cesium';
import { useEffect, useState, useRef} from "react";
import { Viewer, Entity, PointGraphics, EntityDescription, GeoJsonDataSource, Scene, Globe, Camera} from "resium";
import { Cartesian3, Color } from "cesium";
// import LivePositions from './live-positions';
// import OpenSocket from "./open-socket";
// import PositionProvider from "./positions";
import axios from 'axios';
import { SocketProvider } from "./SocketProvider";
import { SocketPositions } from "./SocketPositions";
import ControlPanel from './control-panel';


//Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlMGY2Y2EwNy1lYjBjLTRlOTAtOTc4Yi01OGM4NTc5MTlhZWYiLCJpZCI6ODkzNTgsImlhdCI6MTY0OTcyNDM0OH0.d3owTfwWertUVKZyZ99sH-cWZJaPosgpJaotB5qmzJk';

const cameraInit = Cartesian3.fromDegrees(-83.08, 42.31, 6000);

function App() {  
  const pdopColor = {
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
          {/* <GeoJsonDataSource data={"https://raw.githubusercontent.com/eKerney/reactResium/main/src/data/agl_100_h3_11_worst.geojson"} 
            onLoad={d => {d.entities.values.map(d => {
              console.log(d._properties._dop_worst._value);
              d.polygon.height = 1000;
              d.polygon.extrudedHeight = 1200;
              d.polygon.material = pdopColor[d._properties._dop_worst._value].withAlpha(0.8);
            })
            }}
            stroke={Color.DARKCYAN}
          /> */}
         
         {/* <GeoJsonDataSource data={"https://raw.githubusercontent.com/eKerney/reactResium/main/src/data/agl_005_h3_11_worst.geojson"} 
            onLoad={d => {d.entities.values.map(d => {
              console.log(d._properties._dop_worst._value);
              d.polygon.height = 600;
              d.polygon.material = d._properties._dop_worst._value < 4 ? pdopColor[d._properties._dop_worst._value].withAlpha(0.0) :
                                  pdopColor[d._properties._dop_worst._value].withAlpha(0.4);
              d.polygon.extrudedHeight = 800;
            })
            }}
            stroke={Color.GRAY.withAlpha(0.0)}
          /> */}
          {/* <GeoJsonDataSource data={"https://raw.githubusercontent.com/eKerney/reactResium/main/src/data/agl_003_h3_11_worst.geojson"} 
            onLoad={d => {d.entities.values.map(d => {
              
              d.polygon.height = 100;
              d.polygon.material = d._properties._dop_worst._value < 4 ? pdopColor[d._properties._dop_worst._value].withAlpha(0.0) :
                                  pdopColor[d._properties._dop_worst._value].withAlpha(0.4);
              d.polygon.extrudedHeight = 400;
            })
            }}
            stroke={Color.GRAY.withAlpha(0.0)}
          /> */}
            <GeoJsonDataSource data={"https://services5.arcgis.com/UDWrEU6HdWNYIRIV/ArcGIS/rest/services/buildingsClippedDet/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=-83.11%2C+42.23%2C+-83.04%2C+42.34&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token="} 
            onLoad={d => {d.entities.values.map(d => {
              //console.log(d._properties._dop_worst._value);
              d.polygon.material = Color.BLUEVIOLET.withAlpha(0.3);
              d.polygon.extrudedHeight = (d._properties.median_hgt * 2);
            })
            }}
            stroke={Color.AQUA.withAlpha(0.4)}
          />

            <ControlPanel  />

      {isLoaded ? <SocketProvider auth={getAuth}>
        {/* <LivePositions auth={getAuth}/> */}
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