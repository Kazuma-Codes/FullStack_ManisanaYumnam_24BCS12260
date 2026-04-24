export default function Navbar({ currentPage, navigate }) {
  const links = [
    { id: 'jobs', label: 'Browse Jobs' },
    { id: 'post', label: 'Post a Job' },
    { id: 'applications', label: 'Applications' },
  ];

  return (
    <nav style={{
      background: 'rgba(10,10,15,0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      padding: '0 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <button onClick={() => navigate('jobs')} style={{
        background: 'none', border: 'none', padding: 0,
        fontFamily: 'var(--font-display)', fontSize: '1.35rem',
        fontWeight: 800, color: 'var(--text)',
        display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'
      }}>
        <span style={{
          background: 'var(--accent)', color: '#000',
          borderRadius: '6px', padding: '2px 8px', fontSize: '1rem'
        }}>H</span>
        ireGrid
      </button>

      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {links.map(link => (
          <button key={link.id} onClick={() => navigate(link.id)} style={{
            background: currentPage === link.id ? 'var(--surface2)' : 'none',
            border: currentPage === link.id ? '1px solid var(--border)' : '1px solid transparent',
            color: currentPage === link.id ? 'var(--accent)' : 'var(--muted)',
            padding: '8px 16px', borderRadius: '8px',
            fontFamily: 'var(--font-body)', fontSize: '0.9rem',
            fontWeight: 500, cursor: 'pointer',
            transition: 'all 0.2s',
          }}>
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
