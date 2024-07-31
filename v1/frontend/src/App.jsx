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
    socket.on("receive_message",(message)=>{
      setMessageReceived(message);
    })
  },[socket])

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  return (
    <div className='m-20 p-6 flex flex-col bg-slate-500 rounded-2xl text-slate-700'>

      <div className='text-4xl font-bold'>Room:</div>
      <div className='flex justify-start mt-3 text-xl'>
        <div className='mr-3'>Room Name:</div>
        <input  className='bg-slate-700 rounded-md px-1 text-slate-400 focus:border-stone-500 w-1/4' 
                type="text" 
                value = {room}
                onChange={handleChange2}
        />
      </div>
      <button className='bg-slate-600 w-40 mt-2 text-md font-bold text-slate-900 rounded-md hover:bg-slate-400 hover:text-slate-700' onClick={joinRoom}> Join Room</button>

      <div className='text-4xl font-bold mt-8'>Message:</div>
      <div className='flex justify-start mt-3 text-xl'>
        <div className='mr-3'>Message Text:</div>
        <input  className='bg-slate-700 rounded-md px-1 text-slate-400 focus:border-stone-500 w-1/4' 
                type="text" 
                value = {message}
                onChange={handleChange}
        />
      </div>
      <button className='bg-slate-600 w-40 mt-2 text-md font-bold text-slate-900 rounded-md hover:bg-slate-400 hover:text-slate-700' onClick={sendMessage}>Send Message</button>

      <div className='mt-3 text-xl flex'>
        
        <div className='mr-2'>message received:</div> <div className='text-slate-900'>{messageReceived}</div>
      </div>
    </div>
  )
}

export default App
