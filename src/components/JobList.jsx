import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jobsData from '../mock/jobs.json';
import Skeleton from 'react-loading-skeleton';
import './JobList.css';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });
  const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const jobsPerPage = 10;
	const [loading, setLoading] = useState(true);

  useEffect(() => {
    setJobs(jobsData);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, sortBy]);

	useEffect(() => {
		setTimeout(() => {
			setJobs(jobsData);
			setLoading(false);
		}, 1000);
	}, []);
	
	
  const handleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

	let filteredJobs = jobs.filter(
		(job) =>
			job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			job.location.toLowerCase().includes(searchTerm.toLowerCase())
	);
	
	// Apply sorting
	if (sortBy === 'title') {
		filteredJobs.sort((a, b) => a.title.localeCompare(b.title));
	} else if (sortBy === 'salary') {
		filteredJobs.sort((a, b) => {
			const salaryA = parseInt(a.salary?.replace(/[^0-9]/g, '') || 0);
			const salaryB = parseInt(b.salary?.replace(/[^0-9]/g, '') || 0);
			return salaryB - salaryA;
		});
	}
	
	// Pagination
	const indexOfLastJob = currentPage * jobsPerPage;
	const indexOfFirstJob = indexOfLastJob - jobsPerPage;
	const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
	const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
	

  return (
		<div className="job-list-wrapper">
			{/* Controls */}
			<div className="controls">
				<input
					type="text"
					placeholder="Search by title or location"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="search-input"
				/>
				<select
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}
					className="sort-dropdown"
				>
					<option value="">Sort By</option>
					<option value="title">Title (A–Z)</option>
					<option value="salary">Salary (High to Low)</option>
				</select>
			</div>
	
			{/* Job Cards */}
			<div className="job-list-container">
				{loading
					? Array.from({ length: jobsPerPage }).map((_, index) => (
							<div key={index} className="job-card">
								<h3><Skeleton width={200} /></h3>
								<p><Skeleton width={150} /></p>
								<p><Skeleton width={100} /></p>
								<p><Skeleton width={80} /></p>
								<div style={{ marginTop: '10px' }}>
									<Skeleton width={100} height={30} />
								</div>
							</div>
						))
					: currentJobs.map((job) => (
							<div key={job.id} className="job-card">
								<h3>{job.title}</h3>
								<p><strong>{job.company}</strong></p>
								<p>{job.location}</p>
								{job.salary && <p>{job.salary}</p>}
								<div className="actions">
									<Link to={`/job/${job.id}`}>View Details</Link>
									<button onClick={() => handleFavorite(job.id)}>
										{favorites.includes(job.id) ? '★' : '☆'}
									</button>
								</div>
							</div>
						))}
			</div>
	
			{/* Pagination */}
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
