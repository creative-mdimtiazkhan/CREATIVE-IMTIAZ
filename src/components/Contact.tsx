import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { Mail, Phone, MessageCircle, Facebook, Youtube, Instagram, Twitter, Linkedin, Github, Globe } from 'lucide-react';

export default function Contact() {
  const { state } = useAppContext();
  const { contact } = state;
  const socialLinks = state.socialLinks || [];

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return <Facebook size={18} />;
      case 'youtube': return <Youtube size={18} />;
      case 'instagram': return <Instagram size={18} />;
      case 'twitter': return <Twitter size={18} />;
      case 'linkedin': return <Linkedin size={18} />;
      case 'github': return <Github size={18} />;
      case 'tiktok': return <Globe size={18} />; // Lucide doesn't have tiktok, using Globe as fallback
      default: return <Globe size={18} />;
    }
  };

  return (
    <section id="contact" className="py-10 px-4 text-white mb-5 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-3 text-[#00aaff]">Contact Us</h2>

      <div className="bg-[#111] border border-zinc-800 p-6 rounded-2xl shadow-lg">
        <div className="flex flex-col gap-3">
          {contact.gmail && (
            <a 
              href={`mailto:${contact.gmail}`} 
              className="flex items-center justify-center gap-2 p-3 rounded-lg text-white font-semibold no-underline"
              style={{ backgroundColor: '#2196f3' }}
            >
              <Mail size={20} />
              <span>Email Us</span>
            </a>
          )}

          {contact.phone && (
            <a 
              href={`tel:${contact.phone.replace(/\s+/g, '')}`} 
              className="flex items-center justify-center gap-2 p-3 rounded-lg text-white font-semibold no-underline"
              style={{ backgroundColor: '#ff9800' }}
            >
              <Phone size={20} />
              <span>Call Now</span>
            </a>
          )}

          {contact.whatsapp && (
            <a 
              href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2 p-3 rounded-lg text-white font-semibold no-underline"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle size={20} />
              <span>Chat on WhatsApp</span>
            </a>
          )}
        </div>

        {socialLinks.length > 0 && (
          <div className="mt-8 pt-6 border-t border-zinc-800">
            <h3 className="text-lg font-bold mb-4 text-zinc-400">Social Links</h3>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a 
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#1e1e1e] hover:bg-[#2a2a2a] transition text-white p-3 rounded-lg no-underline font-medium"
                >
                  {getSocialIcon(link.platform)}
                  <span>{link.platform}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
