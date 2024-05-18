import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createTeam } from '../../../api';
import './TeamForm.css';

function TeamForm({ onTeamCreated }) {
  const [teamName, setTeamName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createTeam(teamName);
      onTeamCreated(response.data);
      setTeamName('');
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  return (
    <form className="team-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={teamName}
          placeholder="Enter a name"
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-button">Next</button>
    </form>
  );
}

TeamForm.propTypes = {
  onTeamCreated: PropTypes.func.isRequired,
};

export default TeamForm;
