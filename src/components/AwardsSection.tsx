import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import { Trophy, Users, Code, Sparkles, BookOpen, Target } from 'lucide-react';

const awards = [
  { icon: Trophy, text: '1st Place — Project Expo 2026 as Team Lead' },
  { icon: Users, text: 'Team Lead — Project Expo 2025, Boltathon Hackathon' },
  { icon: Target, text: 'Participant — Smart India Hackathon' },
  { icon: Code, text: '700+ coding problems solved across competitive platforms' },
  { icon: Sparkles, text: '3,000+ LinkedIn audience through technical content' },
  { icon: BookOpen, text: 'Internshala Student Partner — Mentoring students' },
];

export default function AwardsSection() {
  return (
    <SectionWrapper id="awards" title="Awards" number="05">
      <div className="grid sm:grid-cols-2 gap-4">
        {awards.map((award, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="float-card p-5 flex items-start gap-4 group"
          >
            <div className="w-9 h-9 rounded-xl bg-sky-soft flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <award.icon size={16} className="text-sky" />
            </div>
            <p className="text-sm text-ink-light leading-relaxed">{award.text}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
