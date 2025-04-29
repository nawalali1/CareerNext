import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Jobs.css';

function Jobs() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'Software Engineer';
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const APP_ID = 'fdc28ec8'; // ✅ your real app ID
  const APP_KEY = '1aab6e9ff602ea547b0574a56b488618'; // ✅ your real app key

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&results_per_page=10&what=${encodeURIComponent(
            role
          )}&content-type=application/json`
        );

        const data = await response.json();
        setJobs(data.results);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [role]);

  return (
    <div className="jobs-container">
      <h2>Live Job Postings</h2>
      <p className="jobs-subtext">Results for: <strong>{role}</strong></p>

      {loading ? (
        <div className="loader"></div>
      ) : jobs.length > 0 ? (
        <div className="job-cards">
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p className="company">{job.company.display_name}</p>
              <p className="location">{job.location.display_name}</p>
              <a href={job.redirect_url} target="_blank" rel="noopener noreferrer">
                <button className="apply-button">Apply Now</button>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
}

export default Jobs;
