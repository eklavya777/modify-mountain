import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'

const Home = () => {
    return (
      <div className='homeDiv'>
        <h1 className='h1'>Welcome to MountainEchoes</h1>
        <Link to="/create-room">
          <button className='button'>Create Room</button>
        </Link>
        <Link to="/enter-room">
          <button className='button'>Enter Room ID</button>
        </Link>
      </div>
    );
  };

export default Home;
