import { create } from '@mui/material/styles/createTransitions';
import React, { useState, useEffect, createContext, useCallback } from 'react';
import { render } from 'react-dom';
import useWebSocket from 'react-use-websocket';

export const PositionContext = createContext({
  location: ''
}) 

function PositionProvider(props) {
    
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
  const generateAsyncUrlGetter = useCallback(async (url, token, timeout = 2000) => {
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`${url}?token=${token}`);
      }, timeout);
    });
    
  }, [lastMessage]);

  useEffect(() => {
    console.log(props.auth);
    const urlState = setCurrentSocketUrl(generateAsyncUrlGetter(SOCKET_URL_TWO, props.auth));
  }, [readyState]);  

  const context = {
  };


  return <PositionContext.Provider></PositionContext.Provider>

};
export default PositionProvider;
