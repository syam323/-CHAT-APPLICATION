const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("newuser", (username) => {
    socket.username = username;
    console.log(`${username} joined the chat`);
    socket.broadcast.emit("update", `${username} joined the chat`);
  });

  socket.on("chat", (message) => {
    const username = socket.username || "Anonymous";
    io.emit("chat", { username, message });
  });

  socket.on("exituser", () => {
    if (socket.username) {
      socket.broadcast.emit("update", `${socket.username} left the chat`);
    }
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      socket.broadcast.emit("update", `${socket.username} left the chat`);
      console.log(`${socket.username} disconnected`);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
