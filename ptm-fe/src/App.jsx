import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateTeam from './pages/create-team/CreateTeam';
import ListTeams from './pages/list-team/ListTeams';
import EditTeam from './pages/edit-team/EditTeam';
import Home from './pages/home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team/create" element={<CreateTeam />} />
        <Route path="/team/list" element={<ListTeams />} />
        <Route path="/team/:teamId/edit" element={<EditTeam />} />
      </Routes>
    </Router>
  );
}

export default App;
