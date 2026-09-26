import { ArrowRightIcon } from './Icons';
import './Experience.css';

export default function Experience({ experience = [], education = [] }) {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <header className="section-head reveal">
          <p className="label" data-index="02">Experience</p>
          <h2 id="experience-title">Where I&rsquo;ve worked</h2>
        </header>

        <ol className="xp" role="list">
          {experience.map((role) => (
            <li className="xp__item reveal" key={`${role.company}-${role.period}`}>
              <div className="xp__meta">
                <p className="xp__period">{role.period}</p>
                {role.location && <p className="xp__location">{role.location}</p>}
              </div>

              <article className="xp__body">
                <h3 className="xp__company">{role.company}</h3>
                <p className="xp__role">{role.title}</p>
                {role.summary && <p className="xp__summary">{role.summary}</p>}

                {role.highlights?.length > 0 && (
                  <ul className="xp__highlights">
                    {role.highlights.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}

                <div className="xp__footer">
                  {role.tech?.length > 0 && (
                    <ul className="tags" aria-label={`Technologies used at ${role.company}`}>
                      {role.tech.map((t) => (
                        <li key={t} className="tag">{t}</li>
                      ))}
                    </ul>
                  )}
                  {role.caseStudy && (
                    <a className="text-link xp__case" href={`#${role.caseStudy}`}>
                      Read the case study <ArrowRightIcon />
                    </a>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ol>

        {education.length > 0 && (
          <div className="xp__education reveal">
            <h3 className="label">Education</h3>
            {education.map((edu) => (
              <div className="xp__edu" key={edu.institution}>
                <div>
                  <p className="xp__edu-degree">{edu.degree}</p>
                  <p className="xp__edu-school">{edu.institution}</p>
                </div>
                <p className="xp__edu-side">
                  <span>{edu.period}</span>
                  {edu.cgpa && <span className="xp__edu-cgpa">CGPA {edu.cgpa}</span>}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
