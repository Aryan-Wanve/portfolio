"use client";

import { useState } from "react";

export default function ContactForm() {
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

    window.location.href = `mailto:aryanwanve15@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
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
  );
}
