const TYPE_COLORS = {
  'full-time': { bg: 'rgba(90,255,163,0.12)', color: '#5affa3', label: 'Full Time' },
  'part-time': { bg: 'rgba(232,255,90,0.12)', color: '#e8ff5a', label: 'Part Time' },
  'contract': { bg: 'rgba(255,160,90,0.12)', color: '#ffa05a', label: 'Contract' },
  'internship': { bg: 'rgba(90,160,255,0.12)', color: '#5aa0ff', label: 'Internship' },
  'remote': { bg: 'rgba(200,90,255,0.12)', color: '#c85aff', label: 'Remote' },
};

export default function JobCard({ job, onClick, index = 0 }) {
  const typeStyle = TYPE_COLORS[job.job_type] || TYPE_COLORS['full-time'];
  const initials = job.company.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div
      onClick={onClick}
      className="fade-up"
      style={{
        animationDelay: `${index * 0.06}s`,
        opacity: 0,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '24px',
        cursor: 'pointer',
        transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(232,255,90,0.08)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '10px',
          background: 'var(--surface2)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem',
          color: 'var(--accent)', flexShrink: 0,
        }}>{initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: '1.05rem', color: 'var(--text)', marginBottom: '2px',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
          }}>{job.title}</h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>{job.company}</p>
        </div>
        <span style={{
          background: typeStyle.bg, color: typeStyle.color,
          padding: '4px 10px', borderRadius: '20px', fontSize: '0.76rem',
          fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0,
        }}>{typeStyle.label}</span>
      </div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <span style={{ color: 'var(--muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
          📍 {job.location}
        </span>
        {job.salary && (
          <span style={{ color: 'var(--accent2)', fontSize: '0.85rem', fontWeight: 500 }}>
            💰 {job.salary}
          </span>
        )}
        <span style={{ color: 'var(--muted)', fontSize: '0.85rem', marginLeft: 'auto' }}>
          {job.application_count} applied
        </span>
      </div>
    </div>
  );
}
