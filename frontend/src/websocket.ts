import { io } from "socket.io-client";

export const getSocket = (namespace: "home" | "game") =>
  io(`http://localhost:3001/${namespace}`);
