import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Offers', href: '#offers' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Fade in logo roughly near the end of the Hero Section (80% of window height)
      setScrolled(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-background/50 backdrop-blur-md ${
        scrolled ? 'border-b border-border shadow-sm' : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center relative min-h-[80px]">
        <a 
          href="#" 
          className={`absolute left-6 flex items-center gap-2 transition-opacity duration-500 ${
            scrolled ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <span className="font-signature text-3xl font-bold text-ink">Navaneethan</span>
          <span className="sky-dot" />
        </a>

        <motion.div 
          layout
          className={`hidden lg:flex items-center gap-6 w-full ${
            scrolled ? 'justify-end' : 'justify-center'
          }`}
        >
          {navLinks.map((link) => (
            <motion.a
              layout
              key={link.label}
              href={link.href}
              className="group relative font-display text-xs font-medium tracking-wider uppercase text-ink-muted hover:text-ink transition-colors duration-300"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all duration-500 group-hover:w-full" />
            </motion.a>
          ))}
        </motion.div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-ink absolute right-6"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-sm font-medium text-ink-muted hover:text-ink transition-colors flex items-center gap-3"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
