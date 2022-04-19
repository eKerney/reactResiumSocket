import * as React from 'react';
import {useState, useEffect} from 'react';
import { Entity } from 'resium';
import OpenSocket from './open-socket';


function LivePositions(props) {

  const [position, setPosition] = useState(null);
  const [newPosition, setNewPosition] = useState(false);
  useEffect(() => {
    console.log(`PLACEHOLDER`);
    return (
      <Entity
    
      />
    )  
  })


  // useEffect(() => {
  //     console.log(`props = ${props.auth}`);
  //     //const ticket = 'af26f9ea-1c83-40d7-9a69-a381ffe15d6e';
  //     console.log('STARTING USEFFECT');

  //     const url = 'wss://airhub-ws-dev.airspacelink.com/positions';
  //     var schema = window.location.protocol === 'http:' ? 'ws' : 'wss';
  //     const connection = new WebSocket(`${url}?token=${props.auth}`);
  //     connection.onclose = (event) => {
  //         console.log(`Unable to connect to websocket: ${event.code}`);    
  //     }
  //     connection.onmessage = ({data}) => {
  //       console.log('IN CONNECTION.ONMESSAGE');
  //       setNewPosition(true);
  //       console.log(`START position: ${position} - newPosition: ${newPosition}`);
  //       let p = JSON.parse(data);
  //       console.log(p.attributes.assetSourceId);
  //       //setNewPosition(true);
  //       setPosition('SOMETHING IN POSITION');
  //       console.log(`DATA: ${p.attributes.assetSourceId}`);
  //       console.log(`NED position: ${position} - newPosition: ${newPosition}`);
  //     }
  //     console.log(`END USEEFFECT`);

  //   }, [position])
    
  // return (
  //   <Entity
  
  //   />
  // )  

}
export default LivePositions;
