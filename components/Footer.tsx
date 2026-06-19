"use client";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#020A08]/85 px-6 py-8 pb-[calc(6rem+env(safe-area-inset-bottom))] text-center backdrop-blur-md lg:pb-8">
      <p className="text-sm text-slate-400">
        Designed and built by{" "}
        <span className="font-semibold text-white">Mehrzad Babaei</span>
      </p>
      <p className="mt-2 font-mono text-xs text-slate-600">
        Next.js / TypeScript / Tailwind CSS
      </p>
    </footer>
  );
};

export default Footer;
