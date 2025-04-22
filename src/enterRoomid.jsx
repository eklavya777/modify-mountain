import React, { useState } from 'react';
import { getDatabase, ref, get, set, child, push } from "firebase/database";
import { initializeApp } from "firebase/app";
import { useNavigate } from 'react-router-dom';
import './enterid.css';


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

function JoinRoom() {
  const [yourName, setYourName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleYourNameChange = (e) => {
    setYourName(e.target.value);
  };

  const handleRoomIdChange = (e) => {
    setRoomId(e.target.value);
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
  
    if (yourName.trim() === '' || roomId.trim() === '') {
      setError('Please enter your name and room ID.');
      return;
    }
  
    setError('');
  
    const roomRef = ref(db, `room/${roomId}`);
    try {
      const snapshot = await get(roomRef);
  
      if (snapshot.exists()) {
        const roomData = snapshot.val();
        const roomName = roomData.roomName;
        navigate('/chatroom', { state: { yourName , roomId, roomName } });
       
      } else {
        alert('not exists');
      }
    } catch (error) {
      console.error('Error reading data', error);
    }
  };
  

  return (
    <div className="enterid">
        <h1>Join Room</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Your Name:
            <input type="text" value={yourName} onChange={handleYourNameChange} />
          </label>
          <br />
          <label className='roomid'>
            Room ID:
            <input type="text" value={roomId} onChange={handleRoomIdChange} />
          </label>
          <br />
          <button className='button' type="submit">Join Room</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default JoinRoom;



