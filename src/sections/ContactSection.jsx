// src/sections/ContactSection.jsx
import React from "react";
import Section from "../components/Section";
import GlowText from "../components/GlowText";

const EMAIL = "ekansh.pandey2004@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/ekansh-pandey-392938301";
const GITHUB = "https://github.com/FauxApokolips";
const RESUME_URL = "/Ekansh_s_Resume.pdf";

export default function ContactSection() {
  const [copied, setCopied] = React.useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      alert("Copy failed");
    }
  };

  const mailTo = `mailto:${EMAIL}?subject=Portfolio Inquiry`;

  return (
    <Section id="contact">
      <div className="contactWrap">
        {/* LEFT */}
        <div>
          <GlowText text="Contact" />
          <p className="contactSubtitle">
            Interested in working together or discussing a project? I usually reply within 24 hours.
          </p>

          <div className="contactEmailRow">
            <a href={mailTo} className="contactEmail">
              {EMAIL}
            </a>
            <button
              type="button"
              className="contactBtn ghost"
              onClick={copyEmail}
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>

          <div className="contactCtas">
            <a className="contactBtn primary" href={mailTo}>
              Email Me
            </a>
            <a
              className="contactBtn ghost"
              href="./Ekansh_s_Resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Download Résumé
            </a>
          </div>

          <div className="contactMeta">
            <span className="chip">Gurugram, India</span>
            <span className="chip">IST (UTC+5:30)</span>
            <span className="chip">Open to SDE / Business roles</span>
          </div>

          <div className="contactSocials">
            <a href={LINKEDIN} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={GITHUB} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <form
          className="contactForm"
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            const body = `Name: ${f.get("name")}\nEmail: ${f.get("from")}\n\n${f.get(
              "message"
            )}`;
            window.location.href = `mailto:${EMAIL}?subject=Portfolio Contact&body=${encodeURIComponent(
              body
            )}`;
          }}
        >
          <div className="formTitle">Send a quick message</div>

          <label className="field">
            <span>Name</span>
            <input name="name" />
          </label>

          <label className="field">
            <span>Email</span>
            <input name="from" />
          </label>

          <label className="field">
            <span>Message</span>
            <textarea name="message" rows={4} />
          </label>

          <button type="submit" className="contactBtn primary full">
            Open Email Draft
          </button>
        </form>
      </div>
    </Section>
  );
}
