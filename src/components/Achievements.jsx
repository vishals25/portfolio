import { ArrowUpRightIcon } from './Icons';
import './Achievements.css';

function Row({ title, detail, date, link }) {
  const body = (
    <>
      <span className="ach__title">{title}</span>
      {detail && <span className="ach__detail">{detail}</span>}
    </>
  );

  return (
    <li className="ach__row">
      {link ? (
        <a className="ach__main ach__main--link" href={link} target="_blank" rel="noopener noreferrer">
          {body}
          <ArrowUpRightIcon className="icon-arrow-ne ach__arrow" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : (
        <div className="ach__main">{body}</div>
      )}
      {date && <span className="ach__date">{date}</span>}
    </li>
  );
}

export default function Achievements({ achievements = [], certifications = [] }) {
  if (!achievements.length && !certifications.length) return null;

  return (
    <section id="achievements" className="section" aria-labelledby="achievements-title">
      <div className="container">
        <header className="section-head reveal">
          <p className="label" data-index="05">Achievements</p>
          <h2 id="achievements-title">Recognition &amp; certifications</h2>
        </header>

        <div className="ach reveal">
          {achievements.length > 0 && (
            <div>
              <h3 className="label ach__group">Highlights</h3>
              <ul className="ach__list" role="list">
                {achievements.map((a) => (
                  <Row key={a.title} {...a} detail={`${a.kind} · ${a.detail}`} />
                ))}
              </ul>
            </div>
          )}
          {certifications.length > 0 && (
            <div>
              <h3 className="label ach__group">Certifications</h3>
              <ul className="ach__list" role="list">
                {certifications.map((c) => (
                  <Row key={c.name} title={c.name} detail={c.issuer} date={c.date} link={c.link} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
