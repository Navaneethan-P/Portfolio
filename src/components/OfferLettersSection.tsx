import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import { ExternalLink, FileText, Image as ImageIcon } from 'lucide-react';

export default function OfferLettersSection() {
  // Use Vite's import.meta.glob to dynamically import all offer letters
  const offerFiles = import.meta.glob('../assets/Navaneethan.Offerletters/*.{pdf,png,jpg,jpeg}', { eager: true, import: 'default' }) as Record<string, string>;
  
  const offers = Object.entries(offerFiles).map(([path, url]) => {
    // Extract filename from path
    const filename = path.split('/').pop() || '';
    // Determine type by extension
    const isPdf = filename.toLowerCase().endsWith('.pdf');
    // Create a clean title
    let title = filename.replace(/\.(pdf|png|jpe?g|docx?)$/i, '');
    title = title.replace(/[-_]/g, ' ');
    
    return {
      title,
      url,
      isPdf,
      filename
    };
  });

  return (
    <SectionWrapper id="offers" title="Offer Letters" number="07">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer, i) => (
          <motion.a
            key={offer.filename}
            href={offer.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10px", amount: 0.1 }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.08 }}
            className="float-card p-5 group cursor-pointer relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-warm-sand flex items-center justify-center flex-shrink-0 group-hover:bg-sky-soft transition-colors duration-300">
                {offer.isPdf ? (
                  <FileText size={18} className="text-ink-muted group-hover:text-sky transition-colors duration-300" />
                ) : (
                  <ImageIcon size={18} className="text-ink-muted group-hover:text-sky transition-colors duration-300" />
                )}
              </div>
              <ExternalLink size={16} className="text-ink-muted group-hover:text-sky group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
            </div>

            <h4 className="font-display text-base font-bold text-ink mb-2 group-hover:text-sky transition-colors duration-300 flex-grow">
              {offer.title}
            </h4>
            
            <div className="mt-auto pt-4">
              <span className="mono-text text-[10px] text-ink-muted tracking-wider uppercase">
                {offer.isPdf ? 'PDF Document' : 'Document Image'}
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </SectionWrapper>
  );
}
