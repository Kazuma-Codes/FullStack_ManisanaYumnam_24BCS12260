import { useState } from 'react';
import { api } from '../services/api';

export default function PostJobPage({ go }) {
  const [form, setForm] = useState({ title:'', company:'', location:'', job_type:'full-time', salary:'', description:'', requirements:'' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async () => {
    for (const k of ['title','company','location','description','requirements']) {
      if (!form[k].trim()) { setError(`${k} is required.`); return; }
    }
    setLoading(true); setError('');
    try { await api.createJob(form); setSuccess(true); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const inputStyle = {
    width:'100%', border:'none', borderBottom:'1px solid var(--border)',
    padding:'8px 0', fontSize:'14px', outline:'none',
    color:'var(--text)', background:'transparent',
  };
  const label = (text) => (
    <label style={{ fontSize:'11px', color:'var(--muted)', fontFamily:'var(--mono)', display:'block', marginBottom:'6px' }}>{text}</label>
  );

  if (success) return (
    <div style={{ paddingTop: '40px' }}>
      <p style={{ marginBottom: '4px' }}>job posted ✓</p>
      <p style={{ color:'var(--muted)', fontSize:'13px', marginBottom:'24px' }}>your listing is now live.</p>
      <div style={{ display:'flex', gap:'16px' }}>
        <button onClick={() => go('jobs')} style={{ background:'#111', color:'#fff', border:'none', padding:'10px 20px', fontSize:'13px', cursor:'pointer' }}>view all jobs</button>
        <button onClick={() => { setSuccess(false); setForm({ title:'', company:'', location:'', job_type:'full-time', salary:'', description:'', requirements:'' }); }} style={{ background:'none', border:'1px solid var(--border)', padding:'10px 20px', fontSize:'13px', cursor:'pointer' }}>post another</button>
      </div>
    </div>
  );

  return (
    <div>
      <h1 style={{ fontSize:'20px', fontWeight:500, marginBottom:'32px' }}>Post a job</h1>

      <div style={{ display:'flex', flexDirection:'column', gap:'24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px' }}>
          <div>{label('job title')}<input name="title" value={form.title} onChange={handle} placeholder="e.g. Backend Engineer" style={inputStyle} /></div>
          <div>{label('company')}<input name="company" value={form.company} onChange={handle} placeholder="e.g. Razorpay" style={inputStyle} /></div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px' }}>
          <div>{label('location')}<input name="location" value={form.location} onChange={handle} placeholder="e.g. Bengaluru or Remote" style={inputStyle} /></div>
          <div>{label('salary (optional)')}<input name="salary" value={form.salary} onChange={handle} placeholder="e.g. ₹15-25 LPA" style={inputStyle} /></div>
        </div>

        <div>
          {label('type')}
          <select name="job_type" value={form.job_type} onChange={handle} style={{ ...inputStyle, cursor:'pointer' }}>
            {['full-time','part-time','contract','internship','remote'].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div>{label('description')}<textarea name="description" value={form.description} onChange={handle} placeholder="describe the role and responsibilities..." rows={4} style={{ ...inputStyle, resize:'vertical' }} /></div>

        <div>{label('requirements (one per line)')}<textarea name="requirements" value={form.requirements} onChange={handle} placeholder={"3+ years Python experience\nDjango REST framework\nPostgreSQL"} rows={4} style={{ ...inputStyle, resize:'vertical' }} /></div>

        {error && <p style={{ fontSize:'13px', color:'#cc0000' }}>{error}</p>}

        <button onClick={submit} disabled={loading} style={{
          background: loading ? '#ccc' : '#111', color:'#fff', border:'none',
          padding:'12px 28px', fontSize:'14px', cursor: loading ? 'not-allowed' : 'pointer',
          alignSelf:'flex-start', fontFamily:'var(--font)',
        }}>
          {loading ? 'publishing...' : 'publish'}
        </button>
      </div>
    </div>
  );
}
