"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
} from "react-icons/fi";

const socialLinks = [
  {
    icon: FiMail,
    href: "mailto:mehrzadmhb@gmail.com",
    label: "Email",
    value: "mehrzadmhb@gmail.com",
  },
  {
    icon: FiGithub,
    href: "https://github.com/ZadBabaei",
    label: "GitHub",
    value: "ZadBabaei",
  },
  {
    icon: FiLinkedin,
    href: "https://linkedin.com/in/zad-babaei",
    label: "LinkedIn",
    value: "zad-babaei",
  },
  {
    icon: FiPhone,
    href: "tel:709-691-6391",
    label: "Phone",
    value: "709-691-6391",
  },
];

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:mehrzadmhb@gmail.com?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-24 sm:px-12 lg:px-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2ECC71]/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card green-glow overflow-hidden rounded-3xl p-5 sm:p-8 lg:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow mb-4">05 / Contact</p>
              <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">
                Let&apos;s build something useful.
              </h2>
              <p className="mt-5 leading-8 text-slate-300">
                I am open to software development roles, product-focused web
                work, and teams that care about clean implementation.
              </p>

              <div className="mt-8 grid gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  const external = link.href.startsWith("https");

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3 text-slate-300 transition-colors duration-200 hover:border-[#2ECC71]/35 hover:text-white"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2ECC71]/10 text-[#2ECC71]">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-[0.14em] text-slate-500">
                          {link.label}
                        </span>
                        <span className="block text-sm font-semibold">
                          {link.value}
                        </span>
                      </span>
                    </a>
                  );
                })}
              </div>

              <a
                href="/MehrzadBabaeiResume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-button mt-6"
              >
                Download Resume
                <FiDownload aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="min-h-12 rounded-2xl border border-white/10 bg-black/25 px-4 text-white placeholder:text-slate-500 focus:border-[#2ECC71] focus:outline-none focus:ring-2 focus:ring-[#2ECC71]/20"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="min-h-12 rounded-2xl border border-white/10 bg-black/25 px-4 text-white placeholder:text-slate-500 focus:border-[#2ECC71] focus:outline-none focus:ring-2 focus:ring-[#2ECC71]/20"
                />
              </div>

              <textarea
                placeholder="Message"
                required
                rows={7}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="w-full resize-none rounded-2xl border border-white/10 bg-black/25 p-4 text-white placeholder:text-slate-500 focus:border-[#2ECC71] focus:outline-none focus:ring-2 focus:ring-[#2ECC71]/20"
              />

              <button type="submit" className="primary-button w-full sm:w-auto">
                Send Message
                <FiArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>

              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-mono text-sm text-[#A7F3C4]"
                >
                  Your mail client should have opened. Thanks for reaching out.
                </motion.p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
