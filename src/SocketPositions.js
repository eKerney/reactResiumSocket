import { useCallback, useEffect, useState } from "react";
import { Entity } from "resium";
import { useSocket } from "./useSocket.js";
import { Cartesian3 } from "cesium";


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
      'description':(`id: ${attributes.assetSourceId}`),
      'position': Cartesian3.fromDegrees(geometry.x, geometry.y, geometry.z),
      'point':'pixelSize: 1000000',
      'geometry': geometry
    };
    
    //console.log(CesiumEntity);
    setSocketData(CesiumEntity);
    //submitHandler(CesiumEntity);
    //console.log(positions);
    setPositions(d => [...d, CesiumEntity]);
    //setPositions(positions => positions.concat(CesiumEntity));
    //setPositions(emptyArray => [...emptyArray, CesiumEntity]);
    console.log(CesiumEntity.geometry);
    //console.log(positions.length);
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
          name={d.name}
          description={d.description}
          position={Cartesian3.fromDegrees(((d.geometry.x/100)-82.34), ((d.geometry.y/100)+41.890), (d.geometry.z*.01))}
          point={{pixelSize: 10}}
          />
        )
      }) 
      }  
    </>
  );
};

