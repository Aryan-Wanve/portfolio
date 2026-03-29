"use client";

import { useState } from "react";

const featuredEdits = [
  {
    title: "Street Pulse",
    tag: "Music video recut",
    summary:
      "Fast cuts, mood-heavy transitions, and a cinematic rhythm built to hold attention.",
  },
  {
    title: "Momentum Reel",
    tag: "Brand energy edit",
    summary:
      "Punchy pacing and layered motion graphics shaped for social-first storytelling.",
  },
  {
    title: "Night Shift",
    tag: "Aftermovie sequence",
    summary:
      "A darker visual language with texture, speed ramps, and a polished final-grade feel.",
  },
];

const skills = [
  "Video editing",
  "Color grading",
  "Motion graphics",
  "Story-driven cuts",
  "Social media reels",
  "Creative direction",
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/yourhandle" },
  { label: "YouTube", href: "https://youtube.com/@yourhandle" },
  { label: "Behance", href: "https://behance.net/yourhandle" },
  { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle" },
];

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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

    window.location.href = `mailto:hello@yourdomain.com?subject=${subject}&body=${body}`;
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
            Aryan Visuals
          </a>
          <nav className="topnav" aria-label="Primary">
            <a href="#hook">Edits</a>
            <a href="#starter">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <div className="hero-content">
          <p className="eyebrow">Video editor • Visual storyteller • Motion-first creative</p>
          <h1>I turn raw footage into the kind of edit people replay.</h1>
          <p className="hero-copy">
            Cinematic cuts, sharp pacing, and digital energy crafted for artists,
            brands, and ideas that need to hit instantly.
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
        <div className="section-heading">
          <p className="eyebrow">Hook</p>
          <h2>Best edits built to stop the scroll.</h2>
          <p>
            Using your current background video as the placeholder showcase so you
            can swap in the final cuts later without changing the layout.
          </p>
        </div>

        <div className="featured-grid">
          <article className="featured-video-card">
            <video
              className="hook-video"
              src="/hero.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="featured-video-copy">
              <p className="eyebrow">Featured edit</p>
              <h3>Main reel placeholder</h3>
              <p>
                Drop your strongest sequence here later and this block will still
                work as the centerpiece of the section.
              </p>
            </div>
          </article>

          <div className="edit-list">
            {featuredEdits.map((edit) => (
              <article className="edit-card" key={edit.title}>
                <p className="edit-tag">{edit.tag}</p>
                <h3>{edit.title}</h3>
                <p>{edit.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="starter-section" id="starter">
        <div className="section-heading">
          <p className="eyebrow">Starter</p>
          <h2>Skills, style, and the person behind the timeline.</h2>
        </div>

        <div className="starter-grid">
          <article className="info-panel">
            <p className="panel-label">About me</p>
            <h3>I build edits with pace, clarity, and emotion.</h3>
            <p>
              I focus on making videos feel alive, whether that means fast-moving
              reels, dramatic event cuts, or polished visual stories for brands
              and creators.
            </p>
            <p>
              Update this text with your exact background, city, client history,
              or niche when you are ready.
            </p>
          </article>

          <article className="info-panel">
            <p className="panel-label">Core skills</p>
            <div className="skill-cloud">
              {skills.map((skill) => (
                <span className="skill-pill" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </article>

          <article className="info-panel accent-panel">
            <p className="panel-label">Quick info</p>
            <ul className="info-list">
              <li>Available for freelance projects and creative collaborations.</li>
              <li>Editing stack: Premiere Pro, After Effects, DaVinci Resolve.</li>
              <li>Fast turnarounds for reels, promos, music videos, and highlights.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section-heading">
          <p className="eyebrow">Contact</p>
          <h2>Contact me and send a message.</h2>
          <p>
            This form opens an email draft so visitors can reach you right away.
            Replace the email address with your real one when you are ready.
          </p>
        </div>

        <div className="contact-grid">
          <article className="contact-card">
            <p className="panel-label">Let&apos;s work</p>
            <h3>Need an editor who can shape attention in seconds?</h3>
            <p>
              Share the idea, timeline, and style you want. I&apos;ll help turn it
              into a cut that feels intentional from the first frame.
            </p>
            <a className="contact-link" href="mailto:hello@yourdomain.com">
              hello@yourdomain.com
            </a>
          </article>

          <form className="contact-form" onSubmit={handleSubmit}>
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

      <footer className="site-footer">
        <div>
          <p className="footer-title">Aryan Visuals</p>
          <p className="footer-copy">
            Edit-driven portfolio for music, brands, events, and digital stories.
          </p>
        </div>

        <div className="footer-links" aria-label="Social links">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>

        <p className="footer-copy">© 2026 Aryan Visuals. All rights reserved.</p>
      </footer>
    </main>
  );
}
