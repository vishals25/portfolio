export default function Footer({ profile }) {
  if (!profile) return null;

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer-links">
        <a href={profile.github} className="footer-link" target="_blank" rel="noopener noreferrer">GITHUB</a>
        <a href={profile.linkedin} className="footer-link" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
        <a href={`mailto:${profile.email}`} className="footer-link">EMAIL</a>
        <a href={profile.resumeLink} className="footer-link">RESUME</a>
      </div>
      <div className="footer-center">
        <div className="footer-say-hello">SAY HELLO AT</div>
        <a href={`mailto:${profile.email}`} className="footer-email-display">{profile.email}</a>
        <div className="footer-copy">© {new Date().getFullYear()} {profile.name}.</div>
      </div>
      <button className="footer-back-top" onClick={handleBackToTop}>
        BACK TO TOP ↑
      </button>
    </footer>
  );
}
