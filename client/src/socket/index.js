import io from "socket.io-client";
const serverEndpoint = "http://localhost:5000"

const socket = io(serverEndpoint,{
    transports: ["websocket"]
});

socket.on("connect", () => console.log("Connected!"));

socket.on("disconnect", (reason) => {
    console.warn("Disconnected:", reason);
});

socket.on("connect_error", (err) => {
    console.error("Connection error:", err.message);
});

export { socket };