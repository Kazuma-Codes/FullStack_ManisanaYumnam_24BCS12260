// a popup form that takes user input and sends data to backend
import { useState } from 'react';
import { api } from '../services/api';

export default function ApplyModal({ job, onClose }) {
  const [form, setForm] = useState({ applicant_name: '', applicant_email: '', cover_letter: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.applicant_name || !form.applicant_email || !form.cover_letter) {
      setError('please fill in all fields.'); return;
    }
    setLoading(true); setError('');
    try {
      await api.applyToJob({ ...form, job: job.id });
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', border: 'none', borderBottom: '1px solid var(--border)',
    padding: '8px 0', fontSize: '14px', outline: 'none',
    color: 'var(--text)', background: 'transparent',
  };

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 100,
    }}>
      <div style={{ background: '#fff', padding: '32px', width: '100%', maxWidth: '460px', position: 'relative' }}>
        <button onClick={onClose} style={{
          position:'absolute', top:'16px', right:'16px', background:'none', border:'none',
          fontSize:'18px', color:'var(--muted)', cursor:'pointer', lineHeight:1,
        }}>×</button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <p style={{ fontSize: '14px', marginBottom: '4px' }}>application sent ✓</p>
            <p style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '24px' }}>good luck with {job.company}!</p>
            <button onClick={onClose} style={{ background:'#111', color:'#fff', border:'none', padding:'10px 24px', fontSize:'13px', cursor:'pointer' }}>close</button>
          </div>
        ) : (
          <>
            <p style={{ fontWeight: 500, marginBottom: '4px' }}>{job.title}</p>
            <p style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '28px' }}>{job.company}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--mono)', display: 'block', marginBottom: '6px' }}>name</label>
                <input name="applicant_name" value={form.applicant_name} onChange={handleChange} placeholder="your name" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--mono)', display: 'block', marginBottom: '6px' }}>email</label>
                <input name="applicant_email" type="email" value={form.applicant_email} onChange={handleChange} placeholder="you@example.com" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'var(--mono)', display: 'block', marginBottom: '6px' }}>cover letter</label>
                <textarea name="cover_letter" value={form.cover_letter} onChange={handleChange} placeholder="why are you a good fit?" rows={5} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>

              {error && <p style={{ fontSize: '13px', color: '#cc0000' }}>{error}</p>}

              <button onClick={handleSubmit} disabled={loading} style={{
                background: loading ? '#ccc' : '#111', color: '#fff', border: 'none',
                padding: '12px', fontSize: '14px', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font)',
              }}>
                {loading ? 'sending...' : 'submit application'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
