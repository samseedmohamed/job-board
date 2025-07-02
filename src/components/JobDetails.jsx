import React from 'react';
import { useParams, Link } from 'react-router-dom';
import jobsData from '../mock/jobs.json';
import './JobDetails.css';

export default function JobDetails() {
  const { id } = useParams();
  const job = jobsData.find((j) => j.id === parseInt(id));

  if (!job) {
    return <div className="job-details-wrapper">Job not found.</div>;
  }

  return (
    <div className="job-details-wrapper">
      <div className="job-details-card">
        <h2>{job.title}</h2>
        <p className="company">{job.company}</p>
        <p className="location">{job.location}</p>
        {job.salary && <p className="salary">{job.salary}</p>}
        <hr />
        <div className="description">
          <h4>Job Description</h4>
          <p>{job.description}</p>
        </div>
        <Link to="/" className="back-button">← Back to Job List</Link>
      </div>
    </div>
  );
}
