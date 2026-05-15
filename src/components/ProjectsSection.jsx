import { useEffect, useState, useRef, useMemo } from 'react';

export default function ProjectsSection({ projects, skills }) {
  const sectionRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Flatten all skills into a single array for the cloud
  const allSkills = useMemo(() => {
    if (!skills) return [];
    const result = [];
    Object.entries(skills).forEach(([category, items]) => {
      items.forEach((item) => {
        result.push({ name: item, category });
      });
    });
    return result;
  }, [skills]);

  // Track which project is in view via IntersectionObserver on each slide
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Observe individual project slides
  useEffect(() => {
    if (!projects) return;
    const slides = document.querySelectorAll('.project-slide');
    if (!slides.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const index = parseInt(entry.target.dataset.index, 10);
            if (!isNaN(index)) setActiveProject(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [projects]);

  if (!projects || !skills) return null;

  const currentProject = projects[activeProject];
  const highlightedSkills = currentProject?.relatedSkills || [];

  return (
    <section className="projects-section" ref={sectionRef} id="projects">
      {/* Project navigation dots */}
      <div className={`project-nav ${isVisible ? 'visible' : ''}`}>
        {projects.map((_, i) => (
          <button
            key={i}
            className={`project-nav-dot ${i === activeProject ? 'active' : ''}`}
            onClick={() => {
              const slide = document.querySelector(`[data-index="${i}"]`);
              slide?.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>

      <div className="projects-snap-container">
        {/* Left: Project slides */}
        <div className="projects-left">
          {projects.map((project, i) => (
            <div className="project-slide" key={i} data-index={i}>
              <div className="project-slide-header">
                <div className="project-label">Selected Works</div>
                <h2 className="project-name">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-name-link"
                  >
                    {project.name}
                    <span className="project-link-icon">↗</span>
                  </a>
                </h2>
              </div>
              <div className="project-meta">
                {project.type} / {project.date}
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-tech-list">
                {project.tech.map((t, j) => (
                  <span className="project-tech-tag" key={j}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Skills panel (sticky) */}
        <div className="projects-right">
          <div className="skills-panel-title">Technology</div>
          <div className="skills-cloud">
            {allSkills.map((skill, i) => (
              <span
                key={i}
                className={`skill-pill ${highlightedSkills.includes(skill.name) ? 'active' : ''}`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
