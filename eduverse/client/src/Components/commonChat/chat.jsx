
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useSocket } from "../../context/socketProvider";
// import ResponsiveAppBar from "../../Components/header/navbar";
// import axios from "../../Config/axios";
// import "./chat.scss";

// const Chat = ({ user }) => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const url = new URL(window.location.href);
//   const chatId = url.pathname.split("/").pop();
//   console.log(chatId,"cccccccc");
//   const socket = useSocket();
//   const loggedRole = useSelector((state) => state.loggedUser.currentUser.role);

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (message.trim() !== "") {
//       try {
//         // Send the message to the server and store it in the database
//         await axios.post("/user/sendMessage", { message, chatId });
//         socket.emit("message", message, chatId);
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { send: true, message: message },
//         ]);
//         setMessage("");
//       } catch (error) {
//         console.error("Error sending message:", error);
//       }
//     } else {
//       alert("empty message");
//     }
//   };

//   useEffect(() => {
//     // Fetch chat messages from the server when the component mounts
//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get(`/user/getMessage/${chatId}`);
//         setMessages(response.data);
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };

//     fetchMessages(); // Call the function to fetch chat messages

//     socket.on("received-message", (message) => {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { send: false, message: message },
//       ]);
//     });

//     return () => {
//       socket.off("received-message");
//     };
    
//   }, [chatId, socket]);

//   return (
//     <div>
//       {loggedRole === "user" && <ResponsiveAppBar role={"user"} />}
//       {loggedRole === "mentor" && <ResponsiveAppBar role={"mentor"} />}

//       <div className="chat-container">
//         <div className="chat-messages">
//           {messages.map((msg, index) => {
//             const out = !msg.send;
//             return (
//               <div key={index} className={`message${out ? " out" : " in"}`}>
//                 <strong>{msg.message}</strong>
//               </div>
//             );
//           })}
//         </div>
//         <form onSubmit={sendMessage} className="message-form">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type your message..."
//           />
//           <button type="submit">Send</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Chat;


import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "../../context/socketProvider";
import ResponsiveAppBar from "../../Components/header/navbar";
import axios from "../../Config/axios";
import "./chat.scss";

const Chat = ({ user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const url = new URL(window.location.href);
  const chatId = url.pathname.split("/").pop();
  console.log(chatId,"xxxxxxxxx");
  const socket = useSocket();
  const loggedRole = useSelector((state) => state.loggedUser.currentUser.role);
  const currentUserId = useSelector((state) => state.loggedUser.currentUser._id);

  const getCurrentTime = () => {
    const now = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return now.toLocaleDateString(undefined, options);
  };

  // const sendMessage = async (e) => {
  //   e.preventDefault();
  //   if (message.trim() !== "") {
  //     try {
  //       // Send the message to the server and store it in the database
  //       await axios.post("/user/sendMessage", { message, chatId });
  //       socket.emit("message", message, chatId);
  //       const currentTime = getCurrentTime();
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         { send: true, message: message, timestamp: currentTime },
  //       ]);
  //       setMessage("");
  //     } catch (error) {
  //       console.error("Error sending message:", error);
  //     }
  //   } else {
  //     alert("empty message");
  //   }
  // };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      try {
        // Assuming you have senderUserId available in your component state
        const senderUserId = currentUserId; // Replace with actual sender user ID
  
        // Send the message to the server and store it in the database
        await axios.post("/user/sendMessage", { message, chatId, senderUserId });
        socket.emit("message", message, chatId);
        const currentTime = getCurrentTime();
        setMessages((prevMessages) => [
          ...prevMessages,
          { send: true, message: message, timestamp: currentTime },
        ]);
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      alert("empty message");
    }
  };
  

  useEffect(() => {
    // Fetch chat messages from the server when the component mounts
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/user/getMessage/${chatId}`);
        // Ensure that the timestamps are stored in the desired format
        console.log(response.data,"message ethiiii");
        const formattedMessages = response.data.map((msg) => ({
          ...msg,
          timestamp: getCurrentTime(),
        }));
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages(); // Call the function to fetch chat messages

    socket.on("received-message", (message) => {
      const currentTime = getCurrentTime();
      setMessages((prevMessages) => [
        ...prevMessages,
        { send: false, message: message, timestamp: currentTime },
      ]);
    });

    return () => {
      socket.off("received-message");
    };
  }, [chatId, socket]);

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
                <p className="message-time">{msg.timestamp}</p>
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
