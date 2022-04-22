import { useCallback, useEffect, useState } from "react";
import { Entity, BillboardGraphics } from "resium";
import { useSocket } from "./useSocket.js";
import { Cartesian3, Color, DistanceDisplayCondition } from "cesium";



export const SocketPositions = () => {
  let emptyArray = [];
  const [positions, setPositions] = useState([]);
  const socket = useSocket();
  const [socketData, setSocketData] = useState(null);

  const onMessage = useCallback((message) => {
    const data = JSON.parse(message.data);
    const {attributes, geometry} = data
    const CesiumEntity = {
      'name':attributes.assetSourceId,
      'description':(`<h2>id: ${attributes.assetSourceId}</h2>
                      positionId: <b>${attributes.positionId}</b></br>
                      assetType: ${attributes.assetType}</br>
                      timestamp: ${attributes.timestamp}</br>
                      speed: ${attributes.speed}</br>      
                      `),
      'position': Cartesian3.fromDegrees(geometry.x, geometry.y, geometry.z),
      'point':'pixelSize: 1000000',
      'geometry': geometry
    };
    setSocketData(CesiumEntity);
    // use only current positions or continue to add positions
    setPositions(d => [...d, CesiumEntity]);
    //setPositions(d => [CesiumEntity]);
    console.log(CesiumEntity);
  
  }, []);

  useEffect(() => {
    socket.addEventListener("message", onMessage);

    return () => {
      socket.removeEventListener("message", onMessage);
    };
  }, [socket, onMessage]);

  return ( 
    <>
      { socketData && 
        positions.map((d, i) => {  
        return ( 
          <Entity  
            key={`${d.description}-${d.name}`} 
            name={d.name}
            description={d.description}
            position={Cartesian3.fromDegrees(((d.geometry.x/70)-82.02), ((d.geometry.y/70)+41.71), (d.geometry.z*.01))}>
            <BillboardGraphics image={require("/home/pi/dev/node/react/resiumClone/reactResium/src/uav4.png")} scale={0.20}  />
          </Entity>
          
          
          // <Entity
          // key={`${d.timestamp}-${d.name}`} 
          // name={d.name}
          // description={d.description}
          // position={Cartesian3.fromDegrees(((d.geometry.x/100)-82.34), ((d.geometry.y/100)+41.890), (d.geometry.z*.01))}>
          // {/* <ModelGraphics key={d.timestamp} uri='src/Cesium_Air.glb' minimumPixelSize={128} maximumScale={20000}  /> */}
          // <ModelGraphics />
          // </Entity>
          
          // <Entity 
          // name={d.name}
          // description={d.description}
          // position={Cartesian3.fromDegrees(((d.geometry.x/100)-82.34), ((d.geometry.y/100)+41.890), (d.geometry.z*.01))}
          // point={{pixelSize: 10}}
          // />
        )
      }) 
      }  
    </>
  );
};

