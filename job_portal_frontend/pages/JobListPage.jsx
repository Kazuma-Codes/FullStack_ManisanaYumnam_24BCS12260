import { useState, useEffect } from 'react';
import { api } from '../services/api';

const TYPE_LABELS = { 'full-time':'Full Time','part-time':'Part Time','contract':'Contract','internship':'Internship','remote':'Remote' };

export default function JobListPage({ go }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [jobType, setJobType] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (jobType) params.job_type = jobType;
    api.getJobs(params).then(setJobs).finally(() => setLoading(false));
  }, [search, jobType]);

  return (
    <div>
      {/* Search */}
      <input
        placeholder="search jobs, companies, locations..."
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%', border: 'none', borderBottom: '1px solid var(--border)',
          padding: '8px 0', fontSize: '15px', outline: 'none',
          color: 'var(--text)', background: 'transparent', marginBottom: '20px',
        }}
      />

      {/* Type filter */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {['', 'full-time', 'part-time', 'contract', 'internship', 'remote'].map(t => (
          <button key={t} onClick={() => setJobType(t)} style={{
            background: 'none',
            border: `1px solid ${jobType === t ? '#111' : 'var(--border)'}`,
            color: jobType === t ? '#111' : 'var(--muted)',
            padding: '4px 12px', borderRadius: '2px',
            fontSize: '12px', fontFamily: 'var(--mono)',
          }}>
            {t || 'all'}
          </button>
        ))}
      </div>

      {/* Count */}
      <p style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '20px', fontFamily: 'var(--mono)' }}>
        {loading ? '...' : `${jobs.length} roles`}
      </p>

      {/* List */}
      {!loading && jobs.map((job, i) => (
        <div
          key={job.id}
          onClick={() => go('detail', job.id)}
          style={{
            padding: '16px 0',
            borderTop: i === 0 ? '1px solid var(--border)' : 'none',
            borderBottom: '1px solid var(--border)',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '16px',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div>
            <p style={{ fontWeight: 500, marginBottom: '2px' }}>{job.title}</p>
            <p style={{ color: 'var(--muted)', fontSize: '13px' }}>{job.company} · {job.location}</p>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '2px' }}>
              {TYPE_LABELS[job.job_type] || job.job_type}
            </p>
            {job.salary && <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{job.salary}</p>}
          </div>
        </div>
      ))}

      {!loading && jobs.length === 0 && (
        <p style={{ color: 'var(--muted)', paddingTop: '40px', textAlign: 'center' }}>no jobs found</p>
      )}
    </div>
  );
}
