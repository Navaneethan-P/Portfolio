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

export default function Index() {
  return (
    <div className="min-h-screen bg-background grain-overlay">
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
