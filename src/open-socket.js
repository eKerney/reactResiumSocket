import { create } from '@mui/material/styles/createTransitions';
import React, { useState, useEffect, createContext } from 'react';
import { render } from 'react-dom';
import useWebSocket from 'react-use-websocket';


function OpenSocket(props) {
    
  const SOCKET_URL_ONE = 'STOP WEB SOCKET';
  const SOCKET_URL_TWO = 'wss://airhub-ws-dev.airspacelink.com/positions';
  const READY_STATE_OPEN = 1;
  //console.log(props.auth);
  const [currentSocketUrl, setCurrentSocketUrl] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(
    currentSocketUrl,
    {
      share: true,
      shouldReconnect: () => false,
    }
  );
  useEffect(() => {
    lastMessage && setMessageHistory(lastMessage.data);
  }, [lastMessage]);
  const readyStateString = {
    0: 'CONNECTING',
    1: 'OPEN',
    2: 'CLOSING',
    3: 'CLOSED',
  }[readyState];

//Generates the click handler, which returns a promise that resovles to the provided url.
const generateAsyncUrlGetter =
  (url, token, timeout = 2000) =>
  () => {
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`${url}?token=${token}`);
      }, timeout);
    });
  };

  

  return (
    <div>
      <div>
        
      </div>
      START SOCKET CONNECTION
      <br />
      <button
        onClick={() =>
          setCurrentSocketUrl(generateAsyncUrlGetter(SOCKET_URL_ONE))
        }
        disabled={currentSocketUrl === SOCKET_URL_ONE}
      >
        {SOCKET_URL_ONE}
      </button>
      <button
        onClick={() =>
          setCurrentSocketUrl(generateAsyncUrlGetter(SOCKET_URL_TWO, props.auth))
        }
        disabled={currentSocketUrl === SOCKET_URL_TWO}
      >
        {SOCKET_URL_TWO}
      </button>
      <br />
      ReadyState: {readyStateString}
      <br />
      MessageHistory: {messageHistory}
    </div>
  );

};
export default OpenSocket;
