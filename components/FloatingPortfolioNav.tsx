"use client";

import { useEffect, useState } from "react";
import {
  FiBriefcase,
  FiCode,
  FiHome,
  FiMail,
  FiUser,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import type { IconType } from "react-icons";

type NavItem = {
  href: string;
  label: string;
  icon: IconType;
};

const desktopNavItems: NavItem[] = [
  { href: "#hero", label: "Home", icon: FiHome },
  { href: "#about", label: "About", icon: FiUser },
  { href: "#skills", label: "Skills", icon: FiCode },
  { href: "#experience", label: "Experience", icon: FiBriefcase },
  { href: "#projects", label: "Projects", icon: HiOutlineSparkles },
  { href: "#contact", label: "Contact", icon: FiMail },
];

const mobileNavItems = desktopNavItems.filter((item) =>
  ["#hero", "#about", "#skills", "#projects", "#contact"].includes(item.href)
);

export default function FloatingPortfolioNav() {
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (visibleEntry?.target.id) {
          setActiveSection(`#${visibleEntry.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
    );

    desktopNavItems.forEach(({ href }) => {
      const section = document.querySelector(href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    const section = document.querySelector(href);
    if (!section) return;

    section.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(href);
  };

  const renderLink = (item: NavItem, compact = false) => {
    const Icon = item.icon;
    const isActive = activeSection === item.href;

    return (
      <a
        key={item.href}
        href={item.href}
        aria-label={item.label}
        aria-current={isActive ? "page" : undefined}
        className={`floating-nav-link group ${isActive ? "is-active" : ""}`}
        onClick={(event) => {
          event.preventDefault();
          handleNavClick(item.href);
        }}
      >
        <Icon aria-hidden="true" className={compact ? "h-4 w-4" : "h-5 w-5"} />
        {!compact && (
          <span className="floating-nav-tooltip" role="tooltip">
            {item.label}
          </span>
        )}
        {compact && <span className="sr-only">{item.label}</span>}
      </a>
    );
  };

  return (
    <>
      <nav
        aria-label="Portfolio section navigation"
        className="floating-nav-rail"
      >
        <a
          href="#hero"
          aria-label="Go to home section"
          className="floating-nav-logo"
          onClick={(event) => {
            event.preventDefault();
            handleNavClick("#hero");
          }}
        >
          Z
        </a>

        <div className="flex flex-col items-center gap-3">
          {desktopNavItems.map((item) => renderLink(item))}
        </div>
      </nav>

      <nav
        aria-label="Mobile portfolio section navigation"
        className="mobile-portfolio-nav"
      >
        {mobileNavItems.map((item) => renderLink(item, true))}
      </nav>
    </>
  );
}
