import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomeCards() {
  const { state } = useAppContext();
  const cards = state.homeCards || [];

  if (cards.length === 0) return null;

  return (
    <section className="py-20 px-4 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black text-white">Featured Services</h2>
          <p className="text-zinc-500 max-w-xl mx-auto">Explore some of the core features and specialized services I offer to help your business grow.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-zinc-900 overflow-hidden rounded-3xl border border-zinc-800 hover:border-[#00aaff]/50 transition-all group flex flex-col shadow-2xl"
            >
              <div className="aspect-[300/180] relative overflow-hidden bg-zinc-800">
                {card.imageUrl ? (
                  <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-700">
                    <ExternalLink size={48} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00aaff] transition-colors">{card.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                  {card.description}
                </p>

                {card.buttonText && (
                  <div className="mt-auto">
                    {card.buttonLink?.startsWith('http') ? (
                      <a 
                        href={card.buttonLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#00aaff] text-xs font-black uppercase tracking-widest hover:underline"
                      >
                        {card.buttonText}
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <Link 
                        to={card.buttonLink || '#'} 
                        className="inline-flex items-center gap-2 text-[#00aaff] text-xs font-black uppercase tracking-widest hover:underline"
                      >
                        {card.buttonText}
                        <ExternalLink size={14} />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
