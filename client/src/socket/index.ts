import io from "socket.io-client";

export const mapSocket = io("http://localhost:3001/map");


mapSocket.on("connect", () => {console.log('connect')})