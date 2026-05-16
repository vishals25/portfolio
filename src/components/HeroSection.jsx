import { useRef, useState, useEffect, useCallback } from 'react';

export default function HeroSection({ profile, experience, education }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [hoveredExp, setHoveredExp] = useState(null);
  const hoverTimeoutRef = useRef(null);
  const enterTimeoutRef = useRef(null);

  const handleMouseEnterExp = useCallback((exp) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

    enterTimeoutRef.current = setTimeout(() => {
      setHoveredExp(exp);
    }, 200); // 200ms delay before showing
  }, []);

  const handleMouseEnterModal = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
  }, []);

  const handleMouseLeaveExp = useCallback(() => {
    if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);

    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredExp(null);
    }, 200); // 200ms grace period to move mouse into modal
  }, []);

  // Calculate total scrollable height of the right panel content
  const getMaxScroll = useCallback(() => {
    if (!contentRef.current) return 0;
    const contentHeight = contentRef.current.scrollHeight;
    const viewportHeight = window.innerHeight - 72; // minus nav height
    return Math.max(0, contentHeight - viewportHeight + 100);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting && entry.intersectionRatio > 0.5);
      },
      { threshold: [0.5] }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const handleWheel = (e) => {
      // ONLY hijack if we are at the top of the page
      if (window.scrollY > 5) return;

      const maxScroll = getMaxScroll();
      if (maxScroll <= 0) return;

      const delta = e.deltaY;

      // Scrolling down
      if (delta > 0) {
        if (scrollProgress < maxScroll) {
          e.preventDefault();
          const newProgress = Math.min(scrollProgress + delta, maxScroll);
          setScrollProgress(newProgress);
        }
      }

      // Scrolling up
      if (delta < 0) {
        if (scrollProgress > 0) {
          e.preventDefault();
          const newProgress = Math.max(0, scrollProgress + delta);
          setScrollProgress(newProgress);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isActive, scrollProgress, getMaxScroll]);

  // Calculate which section dot is active
  const maxScroll = getMaxScroll();
  const totalDots = 3; // experience, education, end
  const activeDot = maxScroll > 0 ? Math.min(Math.floor((scrollProgress / maxScroll) * totalDots), totalDots - 1) : 0;

  if (!profile) return null;

  // Build tagline with highlights
  const taglineLines = profile.tagline.split('\n');
  const highlightIndices = profile.taglineHighlight || [];

  return (
    <section className="hero-section" ref={sectionRef} id="hero">
      {/* Left: Fixed profile */}
      <div className="hero-left">
        <h1 className="hero-tagline">
          {taglineLines.map((line, i) => (
            <span key={i}>
              {highlightIndices.includes(i) ? (
                <span className="highlight">{line}</span>
              ) : (
                line
              )}
              {i < taglineLines.length - 1 && <br />}
            </span>
          ))}
        </h1>
        <div className="hero-meta">
          <div className="hero-meta-item">
            <span className="hero-meta-label">BASED IN</span>
            <span className="hero-meta-value">{profile.basedIn}</span>
          </div>
          <div className="hero-meta-item">
            <span className="hero-meta-label">STATUS</span>
            <span className="hero-meta-value">
              <span className="status-dot" />
              Open to Opportunities
            </span>
          </div>
        </div>

        {/* Scroll hint */}
        {scrollProgress === 0 && (
          <div className="scroll-hint">
            <span>SCROLL</span>
            <span className="scroll-hint-arrow">↓</span>
          </div>
        )}
      </div>

      {/* Right: Scrollable content */}
      <div className="hero-right">
        <div className="hero-right-scroll">
          <div
            className="hero-right-content"
            ref={contentRef}
            style={{ transform: `translateY(-${scrollProgress}px)` }}
          >
            {/* Experience */}
            {experience && experience.length > 0 && (
              <div className="sidebar-section">
                <h2 className="sidebar-title">Experience</h2>
                <div className="timeline">
                  <div className="timeline-line" />
                  {experience.map((exp, i) => (
                    <div
                      className="timeline-item"
                      key={i}
                      onMouseEnter={() => handleMouseEnterExp(exp)}
                      onMouseLeave={handleMouseLeaveExp}
                    >
                      <div className="timeline-dot-wrap">
                        <div className="timeline-dot" />
                      </div>
                      <div className="timeline-content">
                        <div className="sidebar-item-title">{exp.title}</div>
                        <div className="sidebar-item-company">{exp.company}</div>
                        <div className="sidebar-item-period">{exp.period}</div>

                        {exp.highlights && exp.highlights.length > 0 && (
                          <div className={`timeline-highlights ${hoveredExp === exp ? 'expanded' : ''}`}>
                            <div className="timeline-highlights-inner">
                              <ul className="timeline-highlights-list">
                                {exp.highlights.map((h, j) => (
                                  <li key={j} className="timeline-highlights-item">{h}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <div className="sidebar-section">
                <h2 className="sidebar-title">Education</h2>
                <div className="timeline">
                  <div className="timeline-line" />
                  {education.map((edu, i) => (
                    <div className="timeline-item" key={i}>
                      <div className="timeline-dot-wrap">
                        <div className="timeline-dot" />
                      </div>
                      <div className="timeline-content">
                        <div className="sidebar-item-title">{edu.degree}</div>
                        <div className="sidebar-item-company">{edu.institution}</div>
                        <div className="sidebar-item-period">{edu.period}</div>
                        {edu.cgpa && <span className="edu-cgpa">CGPA: {edu.cgpa}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Scroll progress dots */}
        <div className="scroll-progress">
          {Array.from({ length: totalDots }).map((_, i) => (
            <div key={i} className={`scroll-dot ${i <= activeDot ? 'active' : ''}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
