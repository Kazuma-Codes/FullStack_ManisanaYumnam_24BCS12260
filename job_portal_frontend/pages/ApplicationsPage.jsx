import { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]); // stores fetched data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getApplications().then(setApplications).finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ color:'var(--muted)' }}>loading...</p>; // prevents rendering empty table

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'32px' }}>
        <h1 style={{ fontSize:'20px', fontWeight:500 }}>Applications</h1>
        <span style={{ fontFamily:'var(--mono)', fontSize:'12px', color:'var(--muted)' }}>{applications.length} total</span>
      </div>

      {applications.length === 0 ? (
        <p style={{ color:'var(--muted)', paddingTop:'40px', textAlign:'center' }}>no applications yet</p>
      ) : (
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ borderBottom:'1px solid var(--border)' }}>
              {['applicant','role','email','date'].map(h => (
                <th key={h} style={{ textAlign:'left', padding:'0 0 10px', fontFamily:'var(--mono)', fontSize:'11px', color:'var(--muted)', fontWeight:400, textTransform:'uppercase', letterSpacing:'0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {applications.map((app, i) => (
              <tr key={app.id} style={{ borderBottom:'1px solid var(--border)' }}>
                <td style={{ padding:'12px 0', fontSize:'14px', fontWeight:500 }}>{app.applicant_name}</td>
                <td style={{ padding:'12px 0', fontSize:'13px', color:'#333', paddingRight:'16px' }}>{app.job_title}</td>
                <td style={{ padding:'12px 0', fontSize:'13px', color:'var(--muted)' }}>{app.applicant_email}</td>
                <td style={{ padding:'12px 0', fontSize:'12px', color:'var(--muted)', fontFamily:'var(--mono)', whiteSpace:'nowrap' }}>
                  {new Date(app.applied_at).toLocaleDateString('en-IN', { day:'numeric', month:'short' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
