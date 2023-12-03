const express = require("express");
const app = express();
const PORT = 4000;
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io"); // Add this
const { TABLES } = require("./constants");
const { renderJoinTable, renderSitUser } = require("./helpers");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:2000",
    methods: ["GET", "POST"],
  },
});

let tablesState = TABLES;

io.on("connection", (socket) => {
  console.log(`connection socket.id ${socket.id}`);

  io.emit("server_tables", tablesState);

  socket.on("client_join_table", ({ tableId, username }) => {
    socket.join(tableId);
    tablesState = renderJoinTable(tablesState, tableId, username);

    io.to(tableId).emit("server_table", {
      message: `${username} has joined table #${tableId}`,
      table: tablesState.find((t) => t.id === tableId),
    });
  });

  socket.on("client_sit_user", ({ tableId, seatId, username }) => {
    tablesState = renderSitUser(tablesState, tableId, seatId, username);

    io.to(tableId).emit("server_table", {
      message: `${username} has been sit`,
      table: tablesState.find((t) => t.id === tableId),
    });
  });
});

app.get("/api2", (req, res) => {
  res.json({
    message: "Hello world2",
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
