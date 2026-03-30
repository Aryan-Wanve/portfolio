"use client";

import { useEffect, useState } from "react";

const featuredEdits = [
  {
    title: "Concert reel",
    tag: "Live energy edit",
    video: "/concert.mp4",
    summary:
      "Fast-paced coverage shaped around performance, crowd energy, lights, and movement.",
  },
  {
    title: "Clothing showcase",
    tag: "Fashion-focused visual",
    video: "/clothing showcase.mp4",
    summary:
      "Clean product framing and polished edits built to make style, texture, and motion stand out.",
  },
  {
    title: "Talking head",
    tag: "People and presence",
    video: "/talking head.mp4",
    summary:
      "A more direct, personality-led format shaped with clarity, rhythm, and strong visual presence.",
  },
];

const skills = [
  "Videography",
  "Photography",
  "Cinematography",
  "Video editing",
  "Photo editing",
  "Graphic designing",
  "Motion graphics",
  "Color grading",
];

const socialLinks = [
  { label: "Personal Instagram", href: "https://www.instagram.com/aryanwanve/" },
  { label: "Photography Instagram", href: "https://www.instagram.com/from_aryan/" },
  { label: "Videography Instagram", href: "https://www.instagram.com/cine_chasers/" },
  { label: "YouTube", href: "https://www.youtube.com/@Onewayyyyyyy" },
];

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "Featured work", href: "#hook" },
  { label: "About", href: "#starter" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent(
      `New portfolio inquiry from ${formData.name || "your website"}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${formData.name || "Not provided"}`,
        `Email: ${formData.email || "Not provided"}`,
        "",
        formData.message || "Hello, I'd love to connect with you.",
      ].join("\n")
    );

    window.location.href = `mailto:aryanwanve15@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="landing-page">
      <section className="hero-section" id="home">
        <video
          className="section-video"
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="video-overlay" />
        <header className="topbar">
          <a className="brand" href="#home">
            Aryan Wanve
          </a>
          <nav className="topnav" aria-label="Primary">
            <a href="#hook">Edits</a>
            <a href="#starter">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <div className="hero-content">
          <p className="eyebrow">Aryan Wanve | Visual direction | Film-driven storytelling</p>
          <h1>
            <span className="hero-line">I turn raw footage into</span>{" "}
            <span className="hero-line">the kind of edit people replay.</span>
          </h1>
          <p className="hero-copy">
            I am Aryan Wanve, and I build visuals with mood, movement, and a
            finish that stays with people.
          </p>
          <div className="hero-actions">
            <a className="button button-solid" href="#hook">
              Watch featured work
            </a>
            <a className="button button-ghost" href="#contact">
              Start a project
            </a>
          </div>
        </div>
      </section>

      <section className="hook-section" id="hook">
        <div className="section-heading" data-reveal>
          <h2>Visual work built to pull people in fast.</h2>
          <p>
            A front row for the edits, sequences, and visual energy that define
            my style. Your current background video is standing in until
            the final showcase reels are ready.
          </p>
        </div>

        <div className="featured-grid">
          <div className="vertical-showcase">
            {featuredEdits.map((edit, index) => (
              <article
                className="vertical-video-card"
                key={edit.title}
                data-reveal
                style={{ "--reveal-delay": `${0.12 * (index + 1)}s` }}
              >
                <video
                  className="vertical-video"
                  src={edit.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="vertical-video-copy">
                  <p className="edit-tag">{edit.tag}</p>
                  <h3>{edit.title}</h3>
                  <p>{edit.summary}</p>
                </div>
              </article>
            ))}

            <article className="featured-video-card horizontal-feature" data-reveal>
              <video
                className="hook-video"
                src="/hori trailer.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="featured-video-copy">
                <p className="eyebrow">Horizontal feature</p>
                <h3>Horizontal trailer</h3>
                <p>
                  A wider cinematic cut for trailers, mood-led edits, and visual storytelling that needs more room to breathe.
                </p>
              </div>
            </article>

            <article className="vertical-video-card vertical-video-card-tall" data-reveal>
              <video
                className="vertical-video"
                src="/cafe and interior.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="vertical-video-copy">
                <p className="edit-tag">Atmosphere-led feature</p>
                <h3>Cafe and interior</h3>
                <p>
                  Interior tones, quiet movement, and a more cinematic pace built around space, texture, and mood.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="starter-section" id="starter">
        <div className="section-heading" data-reveal>
          <h2>The eye, the craft, and the skills behind the work.</h2>
        </div>

        <div className="starter-grid">
          <article className="info-panel" data-reveal style={{ "--reveal-delay": "0.08s" }}>
            <p className="panel-label">About me</p>
            <h3>I build visuals with pace, atmosphere, and intent.</h3>
            <p>
              I am Aryan Wanve, and I bring cinematic rhythm, strong mood, and
              visuals that feel crafted instead of copied into every frame.
            </p>
            <p>
              From reels and campaign cuts to photography-led visuals and motion
              work, I focus on making every output feel alive, polished, and
              worth watching twice.
            </p>
          </article>

          <article className="info-panel" data-reveal style={{ "--reveal-delay": "0.18s" }}>
            <p className="panel-label">Core skills</p>
            <div className="skill-cloud">
              {skills.map((skill) => (
                <span className="skill-pill" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </article>

          <article
            className="info-panel accent-panel"
            data-reveal
            style={{ "--reveal-delay": "0.28s" }}
          >
            <p className="panel-label">Quick info</p>
            <ul className="info-list">
              <li>Available for freelance work, visual direction, and collaborations.</li>
              <li>Works across videography, photography, edits, graphics, and motion.</li>
              <li>Best fit for reels, campaigns, music visuals, cinematic cuts, and promos.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section-heading" data-reveal>
          <h2>Let&apos;s build something people feel on first watch.</h2>
          <p>
            If you have a project, concept, or visual direction in mind, send it
            through. Share the mood, the timeline, and the kind of impact you
            want the final piece to leave.
          </p>
        </div>

        <div className="contact-grid">
          <article className="contact-card" data-reveal style={{ "--reveal-delay": "0.1s" }}>
            <p className="panel-label">Let&apos;s work</p>
            <h3>Need Aryan Wanve on your next visual project?</h3>
            <p>
              From concept to final export, I can shape the footage, the pacing,
              the color, and the graphic finish into something that feels
              complete from the first frame.
            </p>
            <a className="contact-link" href="mailto:aryanwanve15@gmail.com">
              aryanwanve15@gmail.com
            </a>
          </article>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
            data-reveal
            style={{ "--reveal-delay": "0.2s" }}
          >
            <label>
              <span>Name</span>
              <input
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>

            <label>
              <span>Email</span>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            <label>
              <span>Message</span>
              <textarea
                name="message"
                rows="6"
                placeholder="Tell me about your project, vibe, and deadline."
                value={formData.message}
                onChange={handleChange}
              />
            </label>

            <button className="button button-solid" type="submit">
              Send message
            </button>
          </form>
        </div>
      </section>

      <footer className="site-footer" data-reveal>
        <div className="footer-shell">
          <div className="footer-brand">
            <p className="footer-title">Aryan Wanve</p>
            <div className="footer-brand-copy">
              <h2>
                <span className="footer-line">Aryan Wanve is where visuals</span>
                <span className="footer-line">get their final form.</span>
              </h2>
              <p className="footer-copy">
                Visual work across videography, photography, cinematography,
                edits, motion graphics, color, and design.
              </p>
            </div>
          </div>

          <div className="footer-nav-grid">
            <div className="footer-column">
              <p className="footer-label">Explore</p>
              <div className="footer-stack">
                {footerLinks.map((link) => (
                  <a key={link.label} href={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
              <a
                className="button button-solid footer-button footer-column-button"
                href="mailto:aryanwanve15@gmail.com"
              >
                Start a project
              </a>
            </div>

            <div className="footer-column">
              <p className="footer-label">Across the web</p>
              <div className="footer-stack" aria-label="Social links">
                {socialLinks.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
              <a className="button button-ghost footer-button footer-column-button" href="#contact">
                Get quote
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">aryanwanve15@gmail.com</p>
          <p className="footer-copy">(c) 2026 Aryan Wanve. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
