import { useCallback, useEffect, useState } from "react";
import { Entity } from "resium";
import { useSocket } from "./useSocket.js";
import { Cartesian3 } from "cesium";

Cartesian3.fromDegrees(-83.08, 42.31, 6000);

export const SocketPositions = () => {
  const socket = useSocket();
  const [socketData, setSocketData] = useState(null);
  const onMessage = useCallback((message) => {
    const data = JSON.parse(message.data);
    const {attributes, geometry} = data
    const CesiumEntity = {
      'name':attributes.assetSourceId,
      'description':attributes,
      'position': Cartesian3.fromDegrees(geometry.x, geometry.y, geometry.z),
      'point':'pixelSize: 1000000',
      'geometry': geometry
    };
    console.log(geometry);
    console.log(CesiumEntity);
    setSocketData(CesiumEntity);
  }, []);

  useEffect(() => {
    socket.addEventListener("message", onMessage);

    return () => {
      socket.removeEventListener("message", onMessage);
    };
  }, [socket, onMessage]);

  return (
    <>
    { socketData && (
      <Entity 
      name={socketData.name}
      description={socketData.description}
      position={Cartesian3.fromDegrees(socketData.geometry.x, socketData.geometry.y, socketData.geometry.z)}
      point={{pixelSize: 10}}
      />
    )}  
    </>
  );
};

