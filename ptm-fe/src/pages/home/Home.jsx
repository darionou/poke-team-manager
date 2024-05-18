import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import tournamentImage from '../../assets/img/tournament.jpg';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container-home">
      <h1>Pokémon Team Manager</h1>
      <img src={tournamentImage} alt="Pokémon Banner" className="banner-image" />
      <div className="card-container">
        <div className="card" onClick={() => navigate('/team/create')}>
          <div className="title">Create your Team</div>
          <div className="text">
            <p>Register your team to the competition and become the best trainer ever!</p>
          </div>
        </div>
        <div className="card" onClick={() => navigate('/team/list')}>
          <div className="title">Registered teams:</div>
          <div className="text">
            <p>Browse between all registered teams</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
