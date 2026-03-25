"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLinkedin, FiGithub, FiPhone } from "react-icons/fi";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

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

  const socialLinks = [
    {
      icon: <FiMail size={22} />,
      href: "mailto:mehrzadmhb@gmail.com",
      label: "Email",
    },
    {
      icon: <FiLinkedin size={22} />,
      href: "https://linkedin.com/in/zad-babaei",
      label: "LinkedIn",
    },
    {
      icon: <FiGithub size={22} />,
      href: "https://github.com/ZadBabaei",
      label: "GitHub",
    },
    {
      icon: <FiPhone size={22} />,
      href: "tel:709-691-6391",
      label: "Phone",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-32 px-6 sm:px-12 lg:px-24 bg-[#0a192f]"
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <span className="hidden sm:block h-px w-16 bg-[#10b981]/40" />
          <h2 className="text-3xl sm:text-4xl font-bold text-[#ccd6f6]">
            <span className="text-[#00ff88] font-mono text-xl mr-2">05.</span>
            Get In Touch
          </h2>
          <span className="hidden sm:block h-px w-16 bg-[#10b981]/40" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[#8892b0] text-lg leading-relaxed mb-12"
        >
          I&apos;m currently looking for new opportunities. Whether you have a
          question or just want to say hi, my inbox is always open.
        </motion.p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-5 text-left"
        >
          <div>
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#112240] text-[#ccd6f6] placeholder-[#8892b0]/60
                border border-[#1d3461] focus:border-[#00ff88] focus:outline-none focus:ring-1 focus:ring-[#00ff88]/30
                transition-colors duration-200"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#112240] text-[#ccd6f6] placeholder-[#8892b0]/60
                border border-[#1d3461] focus:border-[#00ff88] focus:outline-none focus:ring-1 focus:ring-[#00ff88]/30
                transition-colors duration-200"
            />
          </div>
          <div>
            <textarea
              placeholder="Message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#112240] text-[#ccd6f6] placeholder-[#8892b0]/60
                border border-[#1d3461] focus:border-[#00ff88] focus:outline-none focus:ring-1 focus:ring-[#00ff88]/30
                transition-colors duration-200 resize-none"
            />
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="px-8 py-3 rounded-lg border border-[#00ff88] text-[#00ff88] font-mono text-sm
                hover:bg-[#00ff88]/10 hover:text-[#64ffda] hover:shadow-[0_0_20px_rgba(0,255,136,0.15)]
                active:bg-[#00ff88] active:text-[#0a192f]
                transition-all duration-200"
            >
              Send Message
            </button>
          </div>

          {/* Success state */}
          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-[#64ffda] text-sm font-mono mt-4"
            >
              Your mail client should have opened — thanks for reaching out!
            </motion.p>
          )}
        </motion.form>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex items-center justify-center gap-6 mt-16"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-[#8892b0] hover:text-[#64ffda] hover:drop-shadow-[0_0_8px_rgba(100,255,218,0.5)]
                transition-all duration-200"
            >
              {link.icon}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
