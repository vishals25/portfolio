import { useRef, useState } from 'react';
import { CheckIcon } from './Icons';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMPTY = { name: '', email: '', message: '' };

function validate({ name, email, message }) {
  const errors = {};
  if (!name.trim()) errors.name = 'Please enter your name.';
  if (!email.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(email.trim())) errors.email = 'That email address doesn’t look right.';
  if (message.trim().length < 10) errors.message = 'Please write at least a sentence (10+ characters).';
  return errors;
}

/**
 * Posts JSON to a Formspree-compatible endpoint. Rendered only when
 * profile.contactFormEndpoint is set.
 */
export default function ContactForm({ endpoint, email }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [touched, setTouched] = useState(false);
  const inFlight = useRef(false);
  const formRef = useRef(null);

  const onChange = (e) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    if (touched) setErrors(validate(next));
    if (status === 'error') setStatus('idle');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (inFlight.current) return; // duplicate-submission guard

    setTouched(true);
    const found = validate(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.elements[firstInvalid]?.focus();
      return;
    }

    // Honeypot: bots fill hidden fields; quietly pretend success
    if (formRef.current?.elements._gotcha?.value) {
      setStatus('success');
      return;
    }

    inFlight.current = true;
    setStatus('submitting');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(String(res.status));
      setValues(EMPTY);
      setTouched(false);
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      clearTimeout(timeout);
      inFlight.current = false;
    }
  };

  if (status === 'success') {
    return (
      <div className="form__success" role="status">
        <span className="form__success-icon"><CheckIcon /></span>
        <div>
          <p className="form__success-title">Message sent. Thank you!</p>
          <p>I&rsquo;ll reply to the email address you gave as soon as I can.</p>
          <button type="button" className="text-link form__again" onClick={() => setStatus('idle')}>
            Send another message
          </button>
        </div>
      </div>
    );
  }

  const submitting = status === 'submitting';
  const field = (name) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
  });

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate aria-busy={submitting}>
      <div className="form__row">
        <div className="form__field">
          <label htmlFor="contact-name">Name</label>
          <input type="text" autoComplete="name" required {...field('name')} />
          {errors.name && <p id="contact-name-error" className="form__error">{errors.name}</p>}
        </div>
        <div className="form__field">
          <label htmlFor="contact-email">Email</label>
          <input type="email" autoComplete="email" inputMode="email" required {...field('email')} />
          {errors.email && <p id="contact-email-error" className="form__error">{errors.email}</p>}
        </div>
      </div>
      <div className="form__field">
        <label htmlFor="contact-message">Message</label>
        <textarea rows="5" required {...field('message')} />
        {errors.message && <p id="contact-message-error" className="form__error">{errors.message}</p>}
      </div>

      <div className="form__hp" aria-hidden="true">
        <label htmlFor="contact-gotcha">Leave this field empty</label>
        <input id="contact-gotcha" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form__actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting && <span className="form__spinner" aria-hidden="true" />}
          {submitting ? 'Sending…' : 'Send message'}
        </button>
        <p className="form__status" role="status">
          {submitting ? 'Sending your message…' : ''}
        </p>
      </div>

      {status === 'error' && (
        <p className="form__alert" role="alert">
          Something went wrong and your message wasn&rsquo;t sent. Please try again, or email me
          directly at <a className="text-link" href={`mailto:${email}`}>{email}</a>.
        </p>
      )}
    </form>
  );
}
