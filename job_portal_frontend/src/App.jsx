// controls which page to show like job screens and jobdetails and job list
import { useState } from 'react';
import JobListPage from './pages/JobListPage';
import JobDetailPage from './pages/JobDetailPage';
import PostJobPage from './pages/PostJobPage';
import ApplicationsPage from './pages/ApplicationsPage';

const nav = { display:'flex', gap:'24px', alignItems:'center' };
const navBtn = (active) => ({
  background: 'none', border: 'none', padding: '0',
  fontSize: '14px', color: active ? '#111' : '#888',
  fontWeight: active ? 500 : 400, cursor: 'pointer',
  fontFamily: 'var(--font)',
  borderBottom: active ? '1px solid #111' : '1px solid transparent',
  paddingBottom: '1px',
});

export default function App() {
  const [page, setPage] = useState('jobs');
  const [jobId, setJobId] = useState(null);

  const go = (p, id = null) => { setPage(p); setJobId(id); window.scrollTo(0,0); };

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
      {/* Nav */}
      <header style={{ borderBottom: '1px solid var(--border)', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <button onClick={() => go('jobs')} style={{ background:'none', border:'none', fontFamily:'var(--mono)', fontSize:'14px', fontWeight:500, cursor:'pointer', color:'#111' }}>
          jobs.
        </button>
        <div style={nav}>
          <button style={navBtn(page==='jobs')} onClick={() => go('jobs')}>browse</button>
          <button style={navBtn(page==='post')} onClick={() => go('post')}>post a job</button>
          <button style={navBtn(page==='applications')} onClick={() => go('applications')}>applications</button>
        </div>
      </header>

      <main>
        {page === 'jobs' && <JobListPage go={go} />}
        {page === 'detail' && <JobDetailPage jobId={jobId} go={go} />}
        {page === 'post' && <PostJobPage go={go} />}
        {page === 'applications' && <ApplicationsPage go={go} />}
      </main>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '24px 0', marginTop: '60px', color: 'var(--muted)', fontSize: '13px' }}>
        built with django + react
      </footer>
    </div>
  );
}
