"use client";

const Footer = () => {
  return (
    <footer className="py-8 px-6 bg-[#020c1b] text-center">
      <p className="text-sm text-[#8892b0]">
        Designed &amp; Built by{" "}
        <span className="hover:text-[#64ffda] transition-colors duration-200 cursor-default">
          Mehrzad Babaei
        </span>
      </p>
      <p className="text-xs text-[#495670] mt-2">
        Built with Next.js, TypeScript &amp; Tailwind CSS
      </p>
    </footer>
  );
};

export default Footer;
