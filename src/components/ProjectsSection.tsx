import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'DeepSearch 3.0',
    tag: 'Cybersecurity',
    desc: 'Modular threat simulation framework for simulating cyber attacks, monitoring system behavior, and testing vulnerabilities.',
    tech: ['Python', 'Security', 'Simulation'],
    github: 'https://github.com/Navaneethan-P/DEEPSEARCH-3.0',
    featured: true,
  },
  {
    title: 'TradeMind AI',
    tag: 'Machine Learning',
    desc: 'ML-powered crypto trading signal system with real-time data processing and intelligent market analysis.',
    tech: ['Python', 'ML', 'Crypto'],
    github: 'https://github.com/Navaneethan-P/TradeMind-AI',
    featured: true,
  },
  {
    title: 'MyDress — Style Weaver',
    tag: 'AI / Fashion',
    desc: 'AI wardrobe management with intelligent outfit matching and purchase recommendations.',
    tech: ['AI', 'Recommendation', 'Fashion'],
    github: 'https://github.com/Navaneethan-P/style-weaver',
  },
  {
    title: 'SyncWatch',
    tag: 'Real-Time',
    desc: 'Synchronized streaming playback across devices with low-latency real-time communication.',
    tech: ['Flutter', 'Firebase', 'WebRTC'],
    github: 'https://github.com/Navaneethan-P/syncwatch',
  },
  {
    title: 'Agentless Scanner',
    tag: 'Security Tool',
    desc: 'Network-level vulnerability scanner that detects security issues without endpoint installation.',
    tech: ['Batch', 'Networking', 'Security'],
    github: 'https://github.com/Navaneethan-P/DEEPSEARCH-TOOL-2.0',
  },
  {
    title: 'Hand Cricket',
    tag: 'Web Game',
    desc: 'Multiplayer browser game with real-time scoring logic and interactive gameplay.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/Navaneethan-P/Hand_Cricket',
  },
];

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects" title="Projects" number="03">
      {/* Featured projects */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {projects.filter(p => p.featured).map((project, i) => (
          <motion.a
            key={project.title}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="float-card p-8 group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex items-start justify-between mb-4">
              <span className="tag-pill">{project.tag}</span>
              <ArrowUpRight size={18} className="text-ink-muted group-hover:text-sky group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
            </div>

            <h4 className="font-display text-xl font-bold text-ink mb-3 group-hover:text-sky transition-colors duration-300">
              {project.title}
            </h4>
            <p className="text-sm text-ink-muted leading-relaxed mb-5">{project.desc}</p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="mono-text text-[10px] text-ink-muted tracking-wider">{t}</span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>

      {/* Other projects grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {projects.filter(p => !p.featured).map((project, i) => (
          <motion.a
            key={project.title}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="float-card p-5 group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <Github size={16} className="text-ink-muted" />
              <ExternalLink size={14} className="text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h4 className="font-display text-sm font-bold text-ink mb-2 group-hover:text-sky transition-colors">
              {project.title}
            </h4>
            <p className="text-xs text-ink-muted leading-relaxed">{project.desc}</p>
          </motion.a>
        ))}
      </div>
    </SectionWrapper>
  );
}
