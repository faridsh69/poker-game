import { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import tableImage from "./images/table.jpg";
export function App() {
  const [socket, setSocket] = useState(null);

  const [tables, setTables] = useState([]);
  const [table, setTable] = useState(null);

  const [username, setUsername] = useState("Farid");

  useEffect(() => {
    const socketInstance = socketIO("http://localhost:4000");
    setSocket(socketInstance);
    // socketInstance.on("connect", () => {
    //   console.log("Connected to server");
    // });

    socketInstance.on("server_tables", (tables) => {
      setTables(tables);
    });

    socketInstance.on("server_table", ({ table, message }) => {
      // Notify message
      setTable(table);
    });

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  const handleJoinTable = (tableId) => {
    socket.emit("client_join_table", { tableId, username });
  };

  const handleSitUser = (seatId) => {
    socket.emit("client_sit_user", { tableId: table.id, seatId, username });
  };

  return (
    <div className="app">
      <div className="tables">
        <b>Username</b>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        {tables.map((table) => {
          return (
            <div key={table.id} className="tables-table">
              <b>
                #{table.id} {table.title}
              </b>
              <p>{table.type}</p>
              <button onClick={() => handleJoinTable(table.id)}>
                JOIN TABLE
              </button>
            </div>
          );
        })}
      </div>
      {table && (
        <div className="table">
          <div className="table-header">
            <h1 className="table-h1">
              #{table.id} - {table.title}
            </h1>
            <div className="table-header-waitinglist">
              Waiting List:
              <ul>
                {table.waitingUsers.map((u) => {
                  return <li>{u.username}</li>;
                })}
              </ul>
            </div>
          </div>
          <img src={tableImage} alt="poker-table" className="table-mainimage" />
          {table.seats.map((s) => {
            return (
              <div key={s.id} className={`seat seat-${s.id}`}>
                {!s.user && (
                  <div
                    className="seat-user"
                    onClick={() => handleSitUser(s.id)}
                  >
                    Empty
                  </div>
                )}
                {s.user && (
                  <div className="seat-user">
                    <img src={s.user.avatar} alt={s.user.username} />
                    {s.user.username}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
