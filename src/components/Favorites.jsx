import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jobsData from '../mock/jobs.json';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './FavoriteJobs.css';

export default function FavoriteJobs() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(stored);
    // Simulate loading delay
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter((favId) => favId !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const favoriteJobs = jobsData.filter((job) => favorites.includes(job.id));

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = favoriteJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(favoriteJobs.length / jobsPerPage);

  if (!loading && favoriteJobs.length === 0) {
    return (
      <div className="favorites-wrapper">
        <div className="no-favorites">
          <p>You haven’t favorited any jobs yet.</p>
          <Link to="/" className="back-link">Back to Job List</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-wrapper">
      <h2>Favorite Jobs</h2>

      <div className="favorite-jobs-container">
        {loading
          ? Array.from({ length: jobsPerPage }).map((_, index) => (
              <div key={index} className="favorite-job-card">
                <h3><Skeleton width={200} /></h3>
                <p className="company"><Skeleton width={120} /></p>
                <p className="location"><Skeleton width={100} /></p>
                <p className="salary"><Skeleton width={80} /></p>
                <div className="actions">
                  <Skeleton width={80} height={30} />
                  <Skeleton width={80} height={30} />
                </div>
              </div>
            ))
          : currentJobs.map((job) => (
              <div key={job.id} className="favorite-job-card">
                <h3>{job.title}</h3>
                <p className="company">{job.company}</p>
                <p className="location">{job.location}</p>
                {job.salary && <p className="salary">{job.salary}</p>}
                <div className="actions">
                  <Link to={`/job/${job.id}`}>View Details</Link>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveFavorite(job.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
      </div>

      {!loading && totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
