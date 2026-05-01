import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export default function Skills() {
  const { state } = useAppContext();
  const skills = state.skills || [];

  const visibleSkills = skills.filter(skill => skill.visible);

  if (visibleSkills.length === 0) {
    return null;
  }

  return (
    <section className="p-5 max-w-2xl mx-auto mb-5">
      <h2 className="text-[28px] font-bold mb-5 text-[#00aaff] text-center">My Skills</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[15px]">
        {visibleSkills.map((skill) => (
          <motion.div 
            key={skill.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1e1e1e] p-5 rounded-2xl shadow-lg border border-[#2a2a2a] hover:border-[#3a3a3a] transition-all"
          >
            <h3 className="text-xl font-bold text-white mb-1 m-0">{skill.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-3 m-0">{skill.description}</p>
            <span className="inline-block text-xs font-semibold px-3 py-1 bg-[#00aaff]/10 text-[#00aaff] rounded-lg">
              {skill.level}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
