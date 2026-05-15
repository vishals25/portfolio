import { useCallback } from 'react';
import { usePortfolioData } from './hooks/usePortfolioData';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import Certifications from './components/Certifications';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';

export default function App() {
  const { profile, experience, projects, skills, education, certifications, loading } = usePortfolioData();

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        color: '#666',
        fontFamily: "'Space Mono', monospace",
        fontSize: '1.2rem',
        letterSpacing: '0.1em',
      }}>
        Loading...
      </div>
    );
  }

  return (
    <>
      <ParticleBackground />
      <Navbar profile={profile} />
      <main>
        <HeroSection
          profile={profile}
          experience={experience}
          education={education}
        />
        <ProjectsSection
          projects={projects}
          skills={skills}
        />
        <Certifications certifications={certifications} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
