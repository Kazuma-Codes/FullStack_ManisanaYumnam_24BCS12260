import { useState, useEffect } from 'react';
import { api } from '../services/api';
import ApplyModal from '../components/ApplyModal';

export default function JobDetailPage({ jobId, go }) {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api.getJob(jobId).then(setJob).finally(() => setLoading(false));
  }, [jobId]);

  if (loading) return <p style={{ color: 'var(--muted)' }}>loading...</p>; // early return
  if (!job) return <p style={{ color: 'var(--muted)' }}>not found</p>; // early return 

  const Row = ({ label, value }) => ( // reusable code
    <div style={{ display: 'flex', gap: '16px', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
      <span style={{ color: 'var(--muted)', fontSize: '13px', fontFamily: 'var(--mono)', minWidth: '100px' }}>{label}</span>
      <span style={{ fontSize: '14px' }}>{value}</span>
    </div>
  );

  return (
    <div>
      <button onClick={() => go('jobs')} style={{
        background:'none', border:'none', color:'var(--muted)',
        fontSize:'13px', marginBottom:'28px', cursor:'pointer', padding:0,
        fontFamily:'var(--mono)',
      }}>← back</button>

      <h1 style={{ fontSize: '22px', fontWeight: 500, marginBottom: '4px' }}>{job.title}</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '28px' }}>{job.company}</p>

      <div style={{ marginBottom: '32px' }}>
        <Row label="location" value={job.location} />
        <Row label="type" value={job.job_type} />
        {job.salary && <Row label="salary" value={job.salary} />}
        <Row label="applicants" value={`${job.application_count} applied`} />
        <Row label="posted" value={new Date(job.posted_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })} />
      </div>

      <div style={{ marginBottom: '28px' }}>
        <p style={{ fontFamily:'var(--mono)', fontSize:'12px', color:'var(--muted)', marginBottom:'10px', textTransform:'uppercase', letterSpacing:'0.05em' }}>About the role</p>
        <p style={{ lineHeight: 1.8, whiteSpace: 'pre-line', color: '#333' }}>{job.description}</p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontFamily:'var(--mono)', fontSize:'12px', color:'var(--muted)', marginBottom:'10px', textTransform:'uppercase', letterSpacing:'0.05em' }}>Requirements</p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {job.requirements.split('\n').filter(Boolean).map((r, i) => (
            <li key={i} style={{ display: 'flex', gap: '10px', color: '#333', lineHeight: 1.6 }}>
              <span style={{ color: 'var(--muted)' }}>—</span>{r}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={() => setShowModal(true)} style={{
        background: '#111', color: '#fff', border: 'none',
        padding: '12px 28px', fontSize: '14px', fontWeight: 500,
        cursor: 'pointer', fontFamily: 'var(--font)',
      }}>
        Apply
      </button>

      {showModal && <ApplyModal job={job} onClose={() => setShowModal(false)} />}
    </div>
  );
}



