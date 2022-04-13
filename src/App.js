import { Color } from "cesium";
import { hot } from "react-hot-loader/root";
import * as Cesium from 'cesium';
//import React from "react";
import { Viewer, Entity, PointGraphics, EntityDescription, GeoJsonDataSource, Scene, Globe, Camera} from "resium";
import { Cartesian3, createWorldTerrain, onLoadAction } from "cesium";

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlMGY2Y2EwNy1lYjBjLTRlOTAtOTc4Yi01OGM4NTc5MTlhZWYiLCJpZCI6ODkzNTgsImlhdCI6MTY0OTcyNDM0OH0.d3owTfwWertUVKZyZ99sH-cWZJaPosgpJaotB5qmzJk';

const cameraInit = Cartesian3.fromDegrees(-83.08, 42.31, 6000);

function App() {
  const initialView = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  const pdopColor = {
    1:Color.CHARTREUSE, 2:Color.AQUAMARINE, 3:Color.AZURE, 4:Color.YELLOW, 5:Color.ORANGERED, 6:Color.RED
  };

  return (
    <Viewer full
        baseLayerPicker={true}
        infoBox={true}
        homeButton={false}
        timeline={false}
        scene3DOnly={true}
        shadows={true}
        fullscreenButton={false}
        animation={false}  
    >
      <GeoJsonDataSource data={"https://raw.githubusercontent.com/eKerney/reactResium/main/src/data/agl_100_h3_11_worst.geojson"} 
        onLoad={d => {d.entities.values.map(d => {
          console.log(d._properties._dop_worst._value);
          d.polygon.height = 1000;
          d.polygon.material = pdopColor[d._properties._dop_worst._value].withAlpha(0.8);
        })
        }}
        stroke={Color.DARKCYAN}
      />
      <GeoJsonDataSource data={"https://raw.githubusercontent.com/eKerney/reactResium/main/src/data/agl_005_h3_11_worst.geojson"} 
        onLoad={d => {d.entities.values.map(d => {
          console.log(d._properties._dop_worst._value);
          d.polygon.height = 500;
          d.polygon.material = pdopColor[d._properties._dop_worst._value].withAlpha(0.8); 
        })
        }}
        //fill={Color.CADETBLUE.withAlpha(0.8)}
        stroke={Color.AQUA}
      />
      <GeoJsonDataSource data={"https://raw.githubusercontent.com/eKerney/reactResium/main/src/data/agl_003_h3_11_worst.geojson"} 
         onLoad={d => {d.entities.values.map(d => {
          console.log(d._properties._dop_worst._value);
          d.polygon.height = 100;
          d.polygon.material = pdopColor[d._properties._dop_worst._value].withAlpha(0.9); 
        })
        }}
        //fill={Color.LIGHTBLUE.withAlpha(0.8)}
        stroke={Color.AQUA}
      />
    
      <Scene backgroundColor={Color.CORNFLOWERBLUE} />
      <Globe />
      <Camera 
        position={cameraInit}

        />
    </Viewer>
  );
}

export default App;
