import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Tag, Briefcase } from 'lucide-react';

export default function Projects() {
  const { state, t, language } = useAppContext();
  // Sync automatically from the main products database (state.featuredProjects)
  const projects = (state.featuredProjects || []).filter(item => item.status !== 'Hidden');

  return (
    <section className="py-10 px-4 bg-theme-bg text-theme-text">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[#00aaff]">{t('projects')}</h2>
            <p className="text-theme-muted text-sm mt-1">
              {language === 'bn' ? 'আমার সর্বশেষ ডিজিটাল কাজগুলো দেখুন' : 'Discover my latest digital works'}
            </p>
          </div>
          <div className="bg-theme-card px-4 py-2 rounded-xl border border-theme-border flex items-center gap-3">
             <Briefcase size={16} className="text-[#00aaff]" />
             <span className="text-sm font-bold">{projects.length} {language === 'bn' ? 'শোকেস' : 'Showcases'}</span>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="py-24 bg-theme-card border-2 border-dashed border-theme-border rounded-3xl text-center">
            <Briefcase size={48} className="text-theme-muted mx-auto mb-4" />
            <p className="text-theme-muted italic">
              {language === 'bn' ? 'এখন পর্যন্ত কোনো প্রজেক্ট যোগ করা হয়নি।' : 'No projects added yet. Check back soon!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-theme-card rounded-3xl overflow-hidden border border-theme-border hover:border-[#00aaff]/50 transition-all shadow-2xl flex flex-col group"
              >
                <div className="aspect-video bg-neutral-900 shrink-0 relative overflow-hidden">
                  {project.screenshot ? (
                    <img 
                      src={project.screenshot} 
                      alt={project.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-theme-muted">
                      {language === 'bn' ? 'কোনো ছবি পাওয়া যায়নি' : 'No Image Preview'}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/10">
                     DYNAMIK
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#00aaff] transition-colors">{project.name}</h3>
                  <p className="text-theme-muted mb-6 text-sm flex-grow line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-theme-border">
                    <div className="flex flex-col">
                       {project.regularPrice && <span className="text-theme-muted text-[10px] line-through uppercase font-black opacity-80">{project.regularPrice}</span>}
                       <span className="text-[#00aaff] font-black text-xl leading-none">{project.discountPrice || project.price || 'TBA'}</span>
                    </div>
                    <Link 
                      to={`/demo/${project.id}`} 
                      className="flex items-center gap-2 bg-[#00aaff] hover:bg-[#0088cc] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-lg shadow-blue-500/20 cursor-pointer"
                    >
                      <Tag size={16} />
                      <span>{language === 'bn' ? 'বিস্তারিত' : 'View Details'}</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
