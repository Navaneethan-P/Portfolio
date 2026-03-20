import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';

const experiences = [
  {
    role: 'Junior Developer',
    company: 'Infinity Cosmos Technologies',
    period: 'Mar 2025 – Present',
    details: [
      'Built backend modules using Java & Spring Boot for production systems',
      'Improved application stability through debugging & feature implementation',
      'Managed version control workflows using Git',
    ],
    active: true,
  },
  {
    role: 'Data Analytics Intern',
    company: 'Zaalima Development Pvt. Ltd.',
    period: 'Dec 2025 – Jan 2026',
    details: [
      'Analyzed complex datasets and created visual reports for stakeholder insights',
      'Supported data-driven decision-making pipelines',
    ],
  },
  {
    role: 'Software Development Intern',
    company: 'CodeAlpha',
    period: 'Aug 2025 – Oct 2025',
    details: [
      'Developed web applications with HTML, CSS, and JavaScript',
      'Improved code quality through systematic bug resolution',
    ],
  },
  {
    role: 'Technology Intern',
    company: 'Cognifyz Technologies',
    period: 'Nov 2025 – Dec 2025',
    details: [
      'Contributed to software architecture and system design',
      'Identified performance bottlenecks through testing',
    ],
  },
];

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience" title="Experience" number="02">
      <div className="space-y-6">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="float-card p-6 sm:p-8 relative overflow-hidden group"
          >
            {/* Active indicator */}
            {exp.active && (
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-primary/50 to-transparent" />
            )}

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
              <div>
                <h4 className="font-display text-lg font-bold text-ink">{exp.role}</h4>
                <p className="text-sky text-sm font-medium">{exp.company}</p>
              </div>
              <span className="mono-text text-[11px] text-ink-muted tracking-wider whitespace-nowrap bg-warm-sand px-3 py-1.5 rounded-full self-start">
                {exp.period}
              </span>
            </div>

            <ul className="space-y-2">
              {exp.details.map((d, j) => (
                <li key={j} className="text-sm text-ink-light flex items-start gap-3">
                  <span className="text-sky mt-1.5 text-[8px]">●</span>
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
