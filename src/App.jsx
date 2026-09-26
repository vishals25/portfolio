import { useEffect } from 'react';
import profile from './data/profile.json';
import experience from './data/experience.json';
import education from './data/education.json';
import projects from './data/projects.json';
import skills from './data/skills.json';
import certifications from './data/certifications.json';
import achievements from './data/achievements.json';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Activity from './components/Activity';
import Contact, { SiteFooter } from './components/Contact';

// index.html adds .js-reveal to <html> only when IntersectionObserver exists and
// the visitor hasn't asked for reduced motion; without it everything is visible.
function useReveal() {
  useEffect(() => {
    if (!document.documentElement.classList.contains('js-reveal')) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );

    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function App() {
  useReveal();

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar profile={profile} />
      <main id="main" tabIndex={-1}>
        <Hero profile={profile} />
        <About profile={profile} education={education} />
        <Experience experience={experience} education={education} />
        <Projects projects={projects} />
        <Skills skills={skills} />
        <Achievements achievements={achievements} certifications={certifications} />
        <Activity profile={profile} />
        <Contact profile={profile} />
      </main>
      <SiteFooter profile={profile} />
    </>
  );
}
