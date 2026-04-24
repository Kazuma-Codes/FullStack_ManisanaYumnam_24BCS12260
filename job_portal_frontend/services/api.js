const BASE_URL = 'http://localhost:8000/api';

export const api = {
  // Jobs
  getJobs: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/jobs/?${query}`);
    if (!res.ok) throw new Error('Failed to fetch jobs');
    return res.json();
  },

  getJob: async (id) => {
    const res = await fetch(`${BASE_URL}/jobs/${id}/`);
    if (!res.ok) throw new Error('Job not found');
    return res.json();
  },

  createJob: async (data) => {
    const res = await fetch(`${BASE_URL}/jobs/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create job');
    return res.json();
  },

  // Applications
  applyToJob: async (data) => {
    const res = await fetch(`${BASE_URL}/applications/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to apply');
    return json;
  },

  getApplications: async () => {
    const res = await fetch(`${BASE_URL}/applications/`);
    if (!res.ok) throw new Error('Failed to fetch applications');
    return res.json();
  },
};
