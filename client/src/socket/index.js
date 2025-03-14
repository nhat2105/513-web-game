import io from "socket.io-client";

const serverEndpoint = "http://localhost:5000";
let socket = null;

const initializeSocket = () => {
    if (!socket) {
        const token = localStorage.getItem("token");

        socket = io(serverEndpoint, {
            auth: {
                token: token ? token : null,
            },
        });

        socket.on("connect", () => console.log("Connected!"));
        socket.on("disconnect", (reason) => {
            console.warn("Disconnected:", reason);
        });
        socket.on("connect_error", (err) => {
            console.error("Connection error:", err.message);
        });
    }
    return socket;
};

export { initializeSocket };
