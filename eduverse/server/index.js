const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const allRoutes = require("./Routes/allRoute");
const adminRoute = require("./Routes/adminRoute");
const userRoute = require("./Routes/userRoute");
const mentorRoute = require("./Routes/mentorRoute");
const path = require("path");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", allRoutes);
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/mentor", mentorRoute);

mongoose.connect(process.env.MONGO_URL);
const server = app.listen(3001, () => {
  console.log("server on port 3001");
});

const io = require("socket.io")(server, {
  pingTimeOut: 60000,
  cors: true,
});
// setSocket(server)

io.on("connection", (socket) => {
  console.log("connected to socket", socket.id);
  socket.on("setup", (userData) => {
    console.log(`user ${userData.name} connected`);
    socket.join(userData._id);
    socket.emit("chat connected");
  });
  socket.on("join-chat", (roomId, user, mentor) => {
    socket.join(roomId);
    if (mentor && user) {
      socket.in(mentor).emit("user-requested", user, roomId);
    }
    io.to(roomId).emit("chat-connected");
  });
  socket.on("message", (message, chatId) => {
    socket.in(chatId).emit("received-message", message); // Emit the 'message' event to the room
    console.log(message,"recieved");
  });
});
