import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobList from './components/JobList';
import JobDetails from './components/JobDetails';
import FavoriteJobs from './components/Favorites';
import Sidebar from './components/Sidebar';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/favorites" element={<FavoriteJobs />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
