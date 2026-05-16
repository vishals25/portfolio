import { useState, useEffect } from 'react';

export default function Navbar({ profile }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!profile) return null;

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <a href="#" className="nav-logo">{profile.shortName}</a>
      <div className="nav-links">
        <a href={profile.github} className="nav-link" target="_blank" rel="noopener noreferrer">github</a>
        <a href={profile.resumeLink} className="nav-link" target="_blank" rel="noopener noreferrer" download>resume</a>
        <a href={`mailto:${profile.email}`} className="nav-link nav-email">{profile.email}</a>
      </div>
    </nav>
  );
}
