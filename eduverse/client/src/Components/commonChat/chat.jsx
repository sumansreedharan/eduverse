// import React, { useEffect, useState } from "react";
// import { useSocket } from "../../context/socketProvider";
// import "./chat.scss";

// const Chat = ({ user }) => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const url = new URL(window.location.href);
//   const chatId = url.pathname.split("/").pop();
//   const socket = useSocket();

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (message.trim() !== "") {
//         // Send the message to the server
//         socket.emit("message", message, chatId);
//         console.log(`message: ${message} in room: ${chatId}`);
//         setMessages([...messages, { send: true, message: message }]);
//         setMessage("");
//       } else {
//         alert("empty message");
//       }
//   };

//   useEffect(() => {
//     socket.on("received-message", (message) => {
//         console.log(`Received message: ${message}`);
//       setMessages([...messages,{ send: false, message: message },
//       ]);
//     });
//   }, []);

//   return (
//     <div className="chat-container">
//       <h1>hello</h1>
//       <div className="chat-messages">
//         {messages.map((msg, index) => {
//             const out = !msg.send
//           return (
//             <div key={index} className={`message${out?'out':'in'}`}>
//               <strong>{msg.message}</strong>
//             </div>
//           );
//         })}
//       </div>
//       <form onSubmit={sendMessage} className="message-form">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chat;

import React, { useEffect, useState } from "react";
import { useSocket } from "../../context/socketProvider";
import "./chat.scss";

const Chat = ({ user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const url = new URL(window.location.href);
  const chatId = url.pathname.split("/").pop();
  const socket = useSocket();

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
    return()=>{
        socket.off('received-message')
    }
  }, []);

  return (
    <div className="chat-container">
      <h1>hello</h1>
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
  );
};

export default Chat;
