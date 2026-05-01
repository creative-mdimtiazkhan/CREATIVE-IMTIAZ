import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export default function HomeCards() {
  const { state } = useAppContext();
  const cards = state.homeCards || [];

  if (cards.length === 0) return null;

  return (
    <section id="card-section" className="mt-10 py-10 px-4 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl font-bold text-[#00aaff]">Featured Cards</h2>
          <p className="text-zinc-500 text-sm">Highlights of our works and featured items</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="w-full max-w-[350px] aspect-[300/180] overflow-hidden rounded-[10px] bg-zinc-900 border border-zinc-800 shadow-xl group"
            >
              {card.imageUrl ? (
                <img 
                  src={card.imageUrl} 
                  alt="Feature Preview" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              ) : (
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-2 border-zinc-700 opacity-50" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
