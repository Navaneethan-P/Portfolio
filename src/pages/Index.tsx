import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import AwardsSection from '@/components/AwardsSection';
import CertificatesSection from '@/components/CertificatesSection';
import OfferLettersSection from '@/components/OfferLettersSection';
import ContactSection from '@/components/ContactSection';
import HeroScene from '@/components/HeroScene';

export default function Index() {
  return (
    <div className="min-h-screen grain-overlay">
      <HeroScene />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <AwardsSection />
      <CertificatesSection />
      <OfferLettersSection />
      <ContactSection />
    </div>
  );
}
