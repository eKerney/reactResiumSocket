import { Color } from "cesium";
import { hot } from "react-hot-loader/root";
import * as Cesium from 'cesium';
//import React from "react";
import { Viewer, Entity, PointGraphics, EntityDescription, GeoJsonDataSource, Scene, Globe, Camera} from "resium";
import { Cartesian3, createWorldTerrain, onLoadAction } from "cesium";

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlMGY2Y2EwNy1lYjBjLTRlOTAtOTc4Yi01OGM4NTc5MTlhZWYiLCJpZCI6ODkzNTgsImlhdCI6MTY0OTcyNDM0OH0.d3owTfwWertUVKZyZ99sH-cWZJaPosgpJaotB5qmzJk';

const cameraInit = Cartesian3.fromDegrees(-83.05, 42.33, 2000);

function App() {
  const initialView = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
      <Entity
        polygon={{extrudedHeight: 1000}}
      >
      <GeoJsonDataSource data={"https://raw.githubusercontent.com/eKerney/reactMap-pointCloud/main/data/gpsSurfSamp2.json"} 
        onLoad={d => {
          console.log(d.entities.values[0].polygon);
          //d.entities.values.map(d => d.polygon.extrudedHeight = 100)
          d.entities.values.map(d => d.polygon.height = 100)
          
        }}
        // fill={Color.AQUA}
       
        
        
      />
      </Entity>
      <Scene backgroundColor={Color.CORNFLOWERBLUE} />
      <Globe />
      <Camera 
        position={cameraInit}

        />
    </Viewer>
  );
}

export default App;
