import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import { Mail, Github, Linkedin, MapPin, Phone, ArrowUpRight, Instagram, ChefHat } from 'lucide-react';

const links = [
  { icon: Mail, label: 'navaneethan2005.official@gmail.com', href: 'mailto:navaneethan2005.official@gmail.com', sub: 'Email' },
  { icon: Phone, label: '+91 63829 32703', href: 'tel:+916382932703', sub: 'Phone' },
  { icon: Github, label: 'Navaneethan-P', href: 'https://github.com/Navaneethan-P', sub: 'GitHub' },
  { icon: Linkedin, label: 'navaneethan-p', href: 'https://linkedin.com/in/navaneethan-p', sub: 'LinkedIn' },
  { icon: MapPin, label: 'Sholinghur, Tamil Nadu', href: '#', sub: 'Location' },
  { icon: Instagram, label: 'lonely._.lover_07', href: 'https://instagram.com/lonely._.lover_07', sub: 'Instagram' },
  { icon: ChefHat, label: 'navaneethan_07', href: 'https://www.codechef.com/users/navaneethan_07', sub: 'CodeChef' },
];

export default function ContactSection() {
  return (
    <SectionWrapper id="contact" title="Contact" number="08">
      <div className="max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-ink-muted mb-12 text-lg leading-relaxed"
        >
          Got a project idea, want to collaborate, or just want to say hi?
          <br />
          <span className="text-sm text-ink-muted/50">Feel free to reach out anytime.</span>
        </motion.p>

        <div className="space-y-3">
          {links.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="float-card p-4 flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-warm-sand flex items-center justify-center flex-shrink-0 group-hover:bg-sky-soft transition-colors duration-300">
                <item.icon size={18} className="text-ink-muted group-hover:text-sky transition-colors duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="mono-text text-[10px] text-ink-muted tracking-wider uppercase">{item.sub}</p>
                <p className="text-sm text-ink font-medium truncate">{item.label}</p>
              </div>
              <ArrowUpRight size={16} className="text-ink-muted opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-28 pt-8 border-t border-border text-center space-y-2"
      >
        <p className="font-display text-xs text-ink-muted tracking-wider">
          Designed & crafted by <span className="text-sky font-signature text-xl font-bold">Navaneethan P</span> — 2026
        </p>
        <p className="text-[11px] text-ink-muted/40">
          Keep moving forward
        </p>
      </motion.footer>
    </SectionWrapper>
  );
}
