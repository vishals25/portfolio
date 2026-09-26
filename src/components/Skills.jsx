import './Skills.css';

export default function Skills({ skills }) {
  const { groups = [], note } = skills;

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <header className="section-head reveal">
          <p className="label" data-index="04">Skills</p>
          <h2 id="skills-title">Technical toolkit</h2>
          {note && (
            <p className="skills__note">
              <span className="skills__core-key" aria-hidden="true" /> {note}
            </p>
          )}
        </header>

        <dl className="skills reveal">
          {groups.map(({ label, items, core = [] }) => (
            <div key={label} className="skills__row">
              <dt className="skills__label">{label}</dt>
              <dd className="skills__items">
                <ul role="list">
                  {items.map((item) => {
                    const isCore = core.includes(item);
                    return (
                      <li key={item} className={isCore ? 'is-core' : undefined}>
                        {item}
                        {isCore && <span className="sr-only"> (core)</span>}
                      </li>
                    );
                  })}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
