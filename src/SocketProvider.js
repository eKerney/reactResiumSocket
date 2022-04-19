// import { useEffect, useState, createContext, ReactChild } from "react";
// const ws = (auth) => new WebSocket(`${'wss://airhub-ws-dev.airspacelink.com/positions'}?token=${auth}`);
// export const SocketContext = createContext(ws);
// export const SocketProvider = (props) => (
//   <SocketContext.Provider value={ws(props.auth)}>{props.children}</SocketContext.Provider>
// );


import { useEffect, useState, createContext, ReactChild } from "react";

//const ws = new WebSocket("wss://demo.piesocket.com/v3/channel_1?api_key=oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm&notify_self");
const ws = (auth) => new WebSocket(`${'wss://airhub-ws-dev.airspacelink.com/positions'}?token=${auth}`);

export const SocketContext = createContext(ws);

// interface ISocketProvider {
//   children: ReactChild;
// }

export const SocketProvider = (props) => (
  <SocketContext.Provider value={ws(props.auth)}>{props.children}</SocketContext.Provider>
);
