import { useEffect, useState } from "react";
import socketIO from "socket.io-client";

export function App() {
  const [table, setTable] = useState(null);
  const [connection, setConnection] = useState(false);
  const [socket, setSocket] = useState(null);

  const username = "Farid";

  useEffect(() => {
    const socketInstance = socketIO("http://localhost:4000");

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      setConnection(true);
      console.log("Connected to server");
    });

    socketInstance.on("receive_table_data", (data) => {
      console.log(data);
    });

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  const joinRoom = (tableId) => {
    socket.emit("join_room", { tableId, username });
    setTable(tableId);
  };

  return (
    <div>
      is socket connected: {connection ? "connected" : "failed"}
      <br />
      table: {table}
      <br />
      <button onClick={() => joinRoom(1)}>join table 1</button>
      <button onClick={() => joinRoom(2)}>join table 2</button>
    </div>
  );
}
