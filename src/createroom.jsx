import React, { useState } from 'react';
import { getDatabase, ref, set, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import { Link, useNavigate } from 'react-router-dom';
import ChatPage from './chatroom';
import './createroom.css'
const firebaseConfig = {
  apiKey: "AIzaSyBaUVMp53AyYCAbaFuO2jNEAn7ba5V0Rco",
  authDomain: "newproject-a9f9b.firebaseapp.com",
  projectId: "newproject-a9f9b",
  storageBucket: "newproject-a9f9b.appspot.com",
  messagingSenderId: "713852852186",
  appId: "1:713852852186:web:06c6d4a3da6bb3dd9312e3",
  measurementId: "G-21KFG873H8",
  databaseURL: "https://newproject-a9f9b-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function writeUserData(roomName, roomId) {
  set(ref(db, `room/${roomId}`), {
    roomName: roomName,
    roomId: roomId,
  });
}

function CreateRoom() {
  const [roomName, setRoomName] = useState('');
  const [roomId, setRoomId] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setRoomName(e.target.value);
  };

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (roomName.trim() === '') {
      setError('Please enter a room name.');
      return;
    }

    setError('');

    const generatedRoomId = generateRandomNumber();
    setRoomId(generatedRoomId);
    writeUserData(roomName, generatedRoomId);
  };

  const handleEnterRoom = () => {
    navigate('/enter-room');
  };

  return (
    <div className="createroom">
      <h1 className='Createroomh1'>GET ROOM ID FROM HERE</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Room Name: 
          <input type="text" value={roomName} onChange={handleInputChange} />
        </label>
        <button className='button' type="submit">Get Room ID</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {roomId !== null && (
        <div className="room-info">
          <p className="roomIdParagraph">Room ID: {roomId}</p>
        </div>
      )}
      {roomId !== null && (
        <button className="enter-room-button" onClick={handleEnterRoom}>Enter Room</button>
      )}
    </div>
  );
}

export default CreateRoom;
