import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "../../context/socketProvider";
import ResponsiveAppBar from "../../Components/header/navbar";
import "./chat.scss";

const Chat = ({ user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const url = new URL(window.location.href);
  const chatId = url.pathname.split("/").pop();
  const socket = useSocket();
  const loggedRole = useSelector((state) => state.loggedUser.currentUser.role);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      // Send the message to the server
      socket.emit("message", message, chatId);
      console.log(`message: ${message} in room: ${chatId}`);
      setMessages((prevMessages) => [
        ...prevMessages,
        { send: true, message: message },
      ]);
      setMessage("");
    } else {
      alert("empty message");
    }
  };

  useEffect(() => {
    socket.on("received-message", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { send: false, message: message },
      ]);
    });
    return () => {
      socket.off("received-message");
    };
  }, []);

  return (
    <div>
      {loggedRole === "user" && <ResponsiveAppBar role={"user"} />}
      {loggedRole === "mentor" && <ResponsiveAppBar role={"mentor"} />}

      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, index) => {
            const out = !msg.send;
            return (
              <div key={index} className={`message${out ? " out" : " in"}`}>
                <strong>{msg.message}</strong>
              </div>
            );
          })}
        </div>
        <form onSubmit={sendMessage} className="message-form">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
