import { useState } from 'react'
import './App.css'
import io from 'socket.io-client' 
import { useEffect } from 'react';

function App() {
  const socket = io.connect("http://localhost:3001");
  const [message,setMessage] = useState("Message...");
  const [messageReceived,setMessageReceived] = useState("");
  const [room, setRoom] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value); // Update the state with the new value of the input field
  };

  const handleChange2 = (event) => {
    setRoom(event.target.value); // Update the state with the new value of the input field
  };

  const sendMessage = () =>{
    socket.emit("send_message",{
      message:message,
      room:room,
    });
  }

  useEffect(()=>{
    socket.on("receive_message",(data)=>{
      setMessageReceived(data.message);
    })
  },[socket])

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  return (
    <div>
      <input  type="text" 
              value = {room}
              onChange={handleChange2}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input  type="text" 
              value = {message}
              onChange={handleChange}
      />
      <div onClick={sendMessage}>button</div>
      <div>
        message received:{messageReceived}
      </div>
    </div>
  )
}

export default App
