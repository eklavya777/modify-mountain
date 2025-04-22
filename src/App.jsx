import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import Home from './home';
import CreateRoom from "./createroom";
import JoinRoom from "./enterRoomid";
import ChatPage from "./chatroom";
import './App.css';

function App() {

  return (
   
    <Routes>
       <Route path="/"  element={<Home/>} />
       <Route path="/create-room" element={<CreateRoom />} />
       <Route path="/enter-room" element={<JoinRoom />} />
       <Route path="/chatroom" element={<ChatPage/>} />
       <Route path="/chatroom/:roomName" element={<ChatPage/>} />
    </Routes>
  
  )
}

export default App
