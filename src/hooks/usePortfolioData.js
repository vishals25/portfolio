import { useState, useEffect } from 'react';

async function fetchJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to fetch ${path}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export function usePortfolioData() {
  const [data, setData] = useState({
    profile: null,
    experience: null,
    projects: null,
    skills: null,
    education: null,
    certifications: null,
    loading: true,
  });

  useEffect(() => {
    Promise.all([
      fetchJSON(`${import.meta.env.BASE_URL}data/profile.json`),
      fetchJSON(`${import.meta.env.BASE_URL}data/experience.json`),
      fetchJSON(`${import.meta.env.BASE_URL}data/projects.json`),
      fetchJSON(`${import.meta.env.BASE_URL}data/skills.json`),
      fetchJSON(`${import.meta.env.BASE_URL}data/education.json`),
      fetchJSON(`${import.meta.env.BASE_URL}data/certifications.json`),
    ]).then(([profile, experience, projects, skills, education, certifications]) => {
      setData({ profile, experience, projects, skills, education, certifications, loading: false });
    });
  }, []);

  return data;
}
