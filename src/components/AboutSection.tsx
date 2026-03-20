import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import { GraduationCap, MapPin, Star, Sparkles } from 'lucide-react';
import { useCodingStats, useLinkedInStats } from '@/hooks/useStats';

const facts = [
  { label: 'CGPA', value: '8.16', icon: Star },
  { label: 'College', value: 'Adhi College of Engineering', icon: GraduationCap },
  { label: 'Location', value: 'Sholinghur, Tamil Nadu', icon: MapPin },
  { label: 'Passion', value: 'AI × CyberSec', icon: Sparkles },
];

export default function AboutSection() {
  const { data: solvedCount, isLoading: isCodingLoading } = useCodingStats();
  const { data: linkedinCount, isLoading: isLinkedinLoading } = useLinkedInStats();

  return (
    <SectionWrapper id="about" title="About" number="01">
      <div className="grid lg:grid-cols-5 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-3 space-y-5"
        >
          <p className="text-ink-light leading-[1.8] text-[15px]">
            I'm an Information Technology student at Adhi College of Engineering, Kanchipuram, 
            pursuing my B.Tech <span className="mono-text text-xs bg-warm-sand px-1.5 py-0.5 rounded">(2023-2027)</span>. 
            I specialize in building production-oriented applications — from AI trading systems 
            to cybersecurity threat simulation frameworks.
          </p>
          <p className="text-ink-light leading-[1.8] text-[15px]">
            With <span className="font-semibold text-ink">{isCodingLoading ? '1000+' : `${solvedCount}+`} coding problems solved</span> across 
            LeetCode and CodeChef, I thrive on complex architectural challenges. I've built 
            everything from ML-powered crypto trading bots to real-time streaming sync apps.
          </p>
          <p className="text-ink-light leading-[1.8] text-[15px]">
            Beyond code, I mentor students as an Internshala Student Partner and have built a 
            <span className="font-semibold text-ink"> {isLinkedinLoading ? '3,000+' : `${linkedinCount.toLocaleString()}+`} LinkedIn community</span> through 
            technical content creation.
          </p>
        </motion.div>

        <div className="lg:col-span-2 space-y-4">
          {facts.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="float-card p-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-soft flex items-center justify-center flex-shrink-0">
                <fact.icon size={18} className="text-sky" />
              </div>
              <div>
                <p className="mono-text text-[10px] uppercase tracking-wider text-ink-muted">{fact.label}</p>
                <p className="font-display text-sm font-semibold text-ink">{fact.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </SectionWrapper>
  );
}
