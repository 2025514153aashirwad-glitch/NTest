import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth, SignInButton, UserButton } from "@clerk/react";

const NAV_LINKS = [
  { name: 'Scholar', href: '/scholar' },
  { name: 'Fields', href: '/fields' },
  { name: 'Explore', href: '/explore' },
  { name: 'Registry', href: '/registry' },
  { name: 'About', href: '/about' },
];

export default function Navbar() {
  const { isSignedIn } = useAuth();
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-[18px] left-1/2 -translate-x-1/2 z-[1000] flex items-center justify-between px-6 py-2 w-[min(94vw,900px)] h-[54px] rounded-pill border transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(2, 5, 15, 0.85)' : 'rgba(3, 7, 18, 0.55)',
        backdropFilter: 'blur(32px) saturate(2) brightness(1.1)',
        borderColor: scrolled ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.08)',
        boxShadow: scrolled ? '0 12px 50px rgba(0,0,0,0.5)' : '0 1px 0 rgba(255,255,255,0.07) inset, 0 -1px 0 rgba(0,0,0,0.3) inset, 0 12px 50px rgba(0,0,0,0.5)',
      }}
    >
      {/* Logo Mark */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="relative w-8 h-8 rounded-full p-[1px] overflow-hidden">
          <div className="absolute inset-0 animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0deg,var(--gold)_180deg,transparent_360deg)] opacity-60" />
          <div className="absolute inset-[1px] rounded-full bg-void flex items-center justify-center">
            <span className="font-display text-[1.1rem] text-gold pt-0.5">U∞</span>
          </div>
        </div>
        <span className="font-sans text-[0.82rem] font-medium text-white transition-colors uppercase tracking-[0.05em]">
          U Infinitum
        </span>
      </Link>

      {/* Nav Links */}
      <ul className="hidden md:flex items-center gap-1">
        {NAV_LINKS.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <li key={link.name}>
              <Link
                to={link.href}
                className={`px-4 py-1.5 rounded-pill font-sans text-[0.68rem] font-normal uppercase tracking-[0.14em] transition-all duration-300 ${
                  isActive
                    ? 'text-gold bg-gold/10 border border-gold/20'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* CTA Button / Auth */}
      <div className="flex items-center gap-3">
        <Link
          to="/join"
          className="hidden md:block font-mono text-[0.6rem] text-gold/70 tracking-[0.14em] uppercase hover:text-gold transition-colors duration-300"
        >
          Join →
        </Link>
        {!isSignedIn && (
          <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97, y: 0 }}>
            <SignInButton mode="modal">
              <button className="h-[34px] px-5 rounded-pill bg-gold font-sans text-[0.65rem] font-medium text-void tracking-[0.1em] uppercase shadow-[0_2px_18px_rgba(201,169,110,0.4)] transition-all duration-300">
                Portal →
              </button>
            </SignInButton>
          </motion.div>
        )}
        {isSignedIn && (
          <div className="flex items-center gap-4 px-2 py-1 rounded-pill bg-white/5 border border-white/10">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-7 h-7",
                  userButtonTrigger: "focus:shadow-none focus:ring-0"
                }
              }}
            />
          </div>
        )}
      </div>
    </nav>
  );
}
