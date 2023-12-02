const express = require("express");
const app = express();
const PORT = 4000;
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io"); // Add this
const { TABLES } = require("./constants");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`connection socket.id ${socket.id}`);

  socket.on("join_room", ({ tableId, username }) => {
    console.log(`join_room tableId ${tableId} username ${username}`);
    socket.join(tableId);

    const table = TABLES.find((t) => t.id === tableId);

    io.to(tableId).emit("receive_table_data", {
      message: `${username} has joined the chat room`,
      table,
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
