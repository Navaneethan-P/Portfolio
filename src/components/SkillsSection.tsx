import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';

const skillGroups = [
  {
    category: 'Languages',
    skills: ['Java', 'Python', 'C', 'JavaScript'],
  },
  {
    category: 'Web & Mobile',
    skills: ['HTML', 'CSS', 'Angular', 'Flutter'],
  },
  {
    category: 'Backend & DB',
    skills: ['Spring Boot', 'Firebase', 'MySQL', 'MongoDB'],
  },
  {
    category: 'Tools & DevOps',
    skills: ['Git', 'GitHub', 'VS Code', 'IntelliJ'],
  },
  {
    category: 'AI & Security',
    skills: ['Generative AI', 'Ethical Hacking', 'Automation', 'ML'],
  },
];

const certs = [
  'Java Programming', 'SQL & Database Systems', 'AI Fundamentals',
  'Cybersecurity & Ethical Hacking', 'Generative AI', 'Responsive Web Design',
  'Agile Project Management', 'UI/UX Design',
];

export default function SkillsSection() {
  return (
    <SectionWrapper id="skills" title="Skills" number="04">
      <div className="space-y-10">
        {/* Skills */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="float-card p-6"
            >
              <h4 className="font-display text-sm font-bold text-ink mb-4 flex items-center gap-2">
                <span className="sky-dot" style={{ width: 6, height: 6 }} />
                {group.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="tag-pill">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden py-6 border-y border-border"
        >
          <div className="flex animate-marquee whitespace-nowrap">
            {[...certs, ...certs].map((cert, i) => (
              <span key={i} className="mx-6 mono-text text-xs text-ink-muted tracking-wider flex items-center gap-3">
                <span className="sky-dot" style={{ width: 4, height: 4 }} />
                {cert}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Languages spoken */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {['English', 'Tamil', 'Telugu', 'Hindi'].map((lang) => (
            <span key={lang} className="float-card px-5 py-2.5 mono-text text-xs text-ink-light tracking-wider">
              {lang}
            </span>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
