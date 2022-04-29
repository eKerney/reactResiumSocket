import { useCallback, useEffect, useState, useRef } from "react";
import { Entity, BillboardGraphics, Viewer } from "resium";
import { useSocket } from "./useSocket.js";
import { Cartesian3, Color, DistanceDisplayCondition } from "cesium";

export const SocketPositions = () => {
  
  const socket = useSocket();
  const [positions, setPositions] = useState([]);
  const [socketData, setSocketData] = useState(null);
  const [entityList, setEntityList] = useState([]);
  const ref = useRef(null);


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
      'geometry': geometry,
      'timestamp': attributes.timestamp
    };
    setSocketData(CesiumEntity);
    // use only current positions or continue to add positions
    setPositions(d => [...d, CesiumEntity]);
    //setPositions(d => [CesiumEntity]);
    //console.log(CesiumEntity);
    // working removing old entities
    setEntityList(d => [...d, (`${CesiumEntity.name}-${CesiumEntity.timestamp}`)]);
    entityList.forEach(d => console.log(`entityList: ${d}`))

    //const oldEntity = Viewer.Entity.getByID(`${ref.current.cesiumElement._name}-${ref.current.cesiumElement._timestamp}`); 
    //console.log(ref.current.cesiumElement._id);
    //console.log(`oldEntity: ${oldEntity}`);
  
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
            id={`${d.name}-${d.timestamp}`}
            ref={ref} 
            key={`${d.name}-${d.timestamp}`} 
            name={d.name}
            description={d.description}
            position={Cartesian3.fromDegrees(((d.geometry.x/70)-82.02), ((d.geometry.y/70)+41.71), (d.geometry.z*.01))}>
            <BillboardGraphics image={require("/home/pi/dev/node/react/resiumClone/reactResium/src/uav4.png")} scale={0.20}  />
          </Entity> 
        )
      }) 
      }
      {/* {console.log(entityList)}   */}
    </>
  );
};