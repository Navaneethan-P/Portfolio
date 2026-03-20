import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Code, Download, Instagram, ChefHat } from 'lucide-react';
import HeroScene from './HeroScene';
import profilePicture from '@/assets/pic_nobg.png';
import { useCodingStats } from '@/hooks/useStats';

export default function HeroSection() {
  const { data: solvedCount, isLoading } = useCodingStats();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroScene />

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 opacity-[0.07] text-[120px] font-bold text-ink select-none pointer-events-none float-slow">
        {'< />'}
      </div>
      <div className="absolute bottom-20 right-10 opacity-[0.05] text-[100px] font-bold text-ink select-none pointer-events-none float-medium float-delay-2">
        {'{ }'}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Profile picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
          className="relative flex-shrink-0"
        >
          <div className="relative float-slow">
            <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-3xl overflow-hidden border-2 border-border shadow-lg">
              <img
                src={profilePicture}
                alt="Navaneethan P"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -top-3 -right-3 w-full h-full rounded-3xl border border-primary/20 -z-10" />
            <div className="absolute -bottom-3 -left-3 w-full h-full rounded-3xl border border-border -z-10" />
          </div>
        </motion.div>

        {/* Text content */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="mono-text text-[11px] tracking-wider text-ink-muted">
              {'// '}Hello, I'm
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold mt-3 mb-4 leading-[1.05]"
          >
            <span className="text-ink font-signature tracking-widest uppercase">Navan</span>
            <span className="text-sky font-signature tracking-widest uppercase">eethan</span>
            <span className="block text-lg sm:text-xl lg:text-2xl font-medium mt-3 text-ink-light font-display tracking-tight">
              Full-Stack Developer & Security Researcher
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-ink-muted text-sm sm:text-base max-w-lg leading-relaxed mb-8"
          >
            IT student crafting production-grade systems in AI, cybersecurity, and backend engineering. 
            <span className="text-sky font-medium"> {isLoading ? '1000+' : `${solvedCount}+`} problems solved.</span> Always building something new.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center gap-3 justify-center lg:justify-start"
          >
            {[
              { icon: Github, href: 'https://github.com/Navaneethan-P', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com/in/navaneethan-p', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:navaneethan2005.official@gmail.com', label: 'Email' },
              { icon: Code, href: 'https://leetcode.com/navaneethan_2005', label: 'LeetCode' },
              { icon: ChefHat, href: 'https://www.codechef.com/users/navaneethan_07', label: 'CodeChef' },
              { icon: Instagram, href: 'https://instagram.com/lonely._.lover_07', label: 'Instagram' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="float-card p-3 rounded-xl hover:!shadow-[var(--shadow-hover)] group"
                title={item.label}
              >
                <item.icon size={18} className="text-ink-muted group-hover:text-sky transition-colors duration-300" />
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex justify-center lg:justify-start mt-8"
          >
            <a
              href="/Navaneethan_P_Resume_2026.pdf"
              download="Navaneethan_P_Resume_2026.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-display font-medium rounded-xl hover:bg-sky transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              <Download size={18} />
              Resume
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="float-medium inline-flex flex-col items-center gap-2">
          <span className="mono-text text-[10px] text-ink-muted tracking-wider">scroll</span>
          <ArrowDown size={16} className="text-ink-muted" />
        </a>
      </motion.div>
    </section>
  );
}
