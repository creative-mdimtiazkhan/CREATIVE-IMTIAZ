import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export default function About() {
  const { state, t } = useAppContext();

  if (!state.about || state.about.trim() === '') {
    return null;
  }

  return (
    <section id="about" className="py-10 px-4 bg-theme-bg text-theme-text mb-5">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-4 text-[#00aaff]"
        >
          {t('about_me')}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-theme-muted leading-relaxed whitespace-pre-wrap"
        >
          {state.about}
        </motion.p>
      </div>
    </section>
  );
}
