import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ExternalLink, Eye, Heart, ShoppingBag, CheckCircle, Zap, ShieldCheck } from 'lucide-react';

export default function FeaturedProjects() {
  const { state, incrementFeaturedProjectViews, toggleFeaturedProjectLike, t, language } = useAppContext();
  const [activePlanIdxs, setActivePlanIdxs] = useState<Record<string, number>>({});
  const projects = (state.featuredProjects || []).filter(p => p.status !== 'Hidden' && p.isFeatured !== false);

  const rawWhatsapp = state.contact.whatsapp || '';
  const whatsappNumber = rawWhatsapp.replace(/[^0-9]/g, '');
  const formattedWhatsapp = whatsappNumber ? whatsappNumber : '8801700000000'; // Fallback admin phone

  const handleProjectClick = (projectId: string) => {
    incrementFeaturedProjectViews(projectId);
  };

  const handleLikeClick = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFeaturedProjectLike(projectId);
  };

  return (
    <section id="featured-projects" className="py-24 px-4 bg-theme-bg border-t border-theme-border relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4 animate-in fade-in duration-700">
          <span className="px-3 py-1 bg-[#00aaff]/10 text-[#00aaff] rounded-full text-xs font-semibold tracking-wider uppercase">
            {language === 'bn' ? 'মার্কেটপ্লেস শোকেস' : 'Marketplace Showcase'}
          </span>
          <h2 className="text-4xl font-extrabold text-theme-text tracking-tight sm:text-5xl">
            🔥 {t('featured_projects')}
          </h2>
          <p className="text-theme-muted max-w-xl mx-auto text-sm sm:text-base">
            {language === 'bn' 
              ? 'আমাদের সব প্রিমিয়াম ওয়েবসাইট টেমপ্লেট এবং রেডি-টু-লঞ্চ ডিজিটাল সলিউশন এক্সপ্লোর করুন।' 
              : 'Explore our premium website templates, ready-to-launch business solutions, and ready-to-launch digital products.'}
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 bg-theme-card border border-dashed border-theme-border rounded-3xl text-center max-w-sm mx-auto shadow-2xl">
            <ShoppingBag size={48} className="text-[#00aaff] opacity-85 mb-4 animate-bounce" />
            <h3 className="text-lg font-bold text-theme-text">
              {language === 'bn' ? 'কোনো প্রোডাক্ট উপলব্ধ নেই' : 'No Featured Products Available'}
            </h3>
            <p className="text-theme-muted text-xs mt-2">
              {language === 'bn' 
                ? 'লেকচার ও কাস্টমাইজড প্রজেক্ট নিয়ে আবার চেষ্টা করুন।' 
                : 'Check back later for incredible premium releases and customized assets!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const alreadyLiked = localStorage.getItem(`liked_project_${project.id}`) === 'true';
              
              const basePrice = parseInt(project.price?.replace(/[^0-9]/g, '') || '4999', 10);
              const virtualPlans = (project.plans && project.plans.length > 0) ? project.plans : [
                { id: project.id + '-std', name: 'STD', price: project.price || '৳4,999', buttonText: 'Order STD Package', features: project.features || ['Full Source Code', 'WhatsApp Support'], status: 'Active', isFeatured: false },
                { id: project.id + '-pro', name: 'PRO', price: `৳${(basePrice * 1.5).toLocaleString('en-US', {maximumFractionDigits: 0})}`, buttonText: 'Order PRO Package', features: [...(project.features || []), 'Premium Dashboard', 'Priority support'], status: 'Active', isFeatured: true },
                { id: project.id + '-dev', name: 'DEV', price: `৳${(basePrice * 2.5).toLocaleString('en-US', {maximumFractionDigits: 0})}`, buttonText: 'Order DEV Package', features: [...(project.features || []), 'Premium Dashboard', 'Priority support', 'White Label License'], status: 'Active', isFeatured: false },
              ];

              const activePlans = virtualPlans.filter(p => p.status !== 'Hidden');
              const activePlanIdx = activePlanIdxs[project.id] ?? 0;
              const currentPlan = activePlans[activePlanIdx] || activePlans[0] || virtualPlans[0];

              const projectFeatures = currentPlan.features;

              const customOrderText = `Hi! I would like to order the product: *${project.name}* with the plan *${currentPlan.name}* (${currentPlan.price}) shown on your website portfolio. Please supply setup details.`;
              const finalOrderUrl = project.orderLink || `https://wa.me/${formattedWhatsapp}?text=${encodeURIComponent(customOrderText)}`;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  className="bg-theme-card rounded-[28px] border border-theme-border hover:border-[#00aaff]/40 transition-all duration-300 flex flex-col overflow-hidden shadow-2xl hover:shadow-sky-500/10 group h-full"
                >
                  {/* Product Screenshot / Preview */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 group-inner-holder">
                    {project.screenshot ? (
                       <img 
                         src={project.screenshot} 
                         alt={project.name} 
                         className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" 
                         referrerPolicy="no-referrer"
                       />
                    ) : (
                       <div className="w-full h-full bg-neutral-800 flex flex-col items-center justify-center text-zinc-550 gap-2">
                         <ShoppingBag size={40} className="text-[#00aaff] opacity-30" />
                         <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Preview Screenshot</span>
                       </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                    
                    {/* View Details/Demo quick badge */}
                    {project.liveLink && (
                      <span className="absolute top-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-md text-[#00aaff] text-[11px] font-bold rounded-lg border border-neutral-800">
                        {language === 'bn' ? 'লাইভ ডেমো রয়েছে' : 'Live Demo available'}
                      </span>
                    )}
                  </div>

                  {/* Product Information */}
                  <div className="p-6 flex flex-col flex-grow">
                    {project.category && (
                      <span className="text-[11px] text-[#00aaff] bg-[#00aaff]/10 border border-[#00aaff]/20 px-2 py-0.5 rounded-md font-extrabold uppercase tracking-widest mb-2.5 w-fit">
                        {project.category}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-theme-text mb-2 leading-snug group-hover:text-[#00aaff] transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-theme-muted text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* STD | PRO | DEV Segmented Selector */}
                    <div className="flex bg-neutral-100 dark:bg-black/70 p-1 rounded-xl border border-theme-border mb-4 overflow-x-auto gap-0.5">
                      {activePlans.map((p, pIdx) => (
                        <button
                          key={p.id}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActivePlanIdxs(prev => ({ ...prev, [project.id]: pIdx }));
                          }}
                          className={`flex-1 text-center py-1.5 px-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shrink-0 min-w-[55px] cursor-pointer ${
                            activePlanIdx === pIdx
                              ? 'bg-[#00aaff] text-white shadow-md font-black'
                              : 'text-theme-muted hover:text-[#00aaff] hover:bg-neutral-200 dark:hover:bg-neutral-800'
                          }`}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>

                    {/* Price Tag styling matching second visual blueprint */}
                    <div className="flex items-center gap-2 px-3.5 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 font-bold mb-4 w-fit">
                      <span className="text-sm opacity-80">{language === 'bn' ? 'মূল্যঃ' : '💰 Price:'}</span>
                      <span className="text-theme-text text-base font-extrabold">{currentPlan.price}</span>
                    </div>

                    {/* Feature bullet list with custom aesthetic bullets */}
                    <div className="space-y-2.5 mb-6 border-t border-theme-border pt-4 flex-grow">
                      {projectFeatures.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2.5 text-theme-muted text-sm">
                          {fIdx === 0 && <CheckCircle size={15} className="text-[#00aaff] shrink-0" />}
                          {fIdx === 1 && <Zap size={15} className="text-amber-500 shrink-0" />}
                          {fIdx >= 2 && <ShieldCheck size={15} className="text-emerald-500 shrink-0" />}
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Views & Likes Info Panel */}
                    <div className="flex items-center justify-between text-theme-muted text-xs mb-6 bg-neutral-100 dark:bg-black/40 p-3 rounded-xl border border-theme-border">
                      <span className="flex items-center gap-1.5" title="Views">
                        <Eye size={14} className="text-[#00aaff]" />
                        <span>{project.views || 0} {language === 'bn' ? 'ভিউস' : 'Views'}</span>
                      </span>
                      
                      <button 
                        onClick={(e) => handleLikeClick(e, project.id)}
                        className={`flex items-center gap-1.5 transition-all duration-150 active:scale-95 cursor-pointer ${
                          alreadyLiked ? 'text-red-500 font-semibold' : 'text-theme-muted hover:text-red-400'
                        }`}
                        title={alreadyLiked ? 'Unlike' : 'Like'}
                      >
                        <Heart 
                          size={14} 
                          fill={alreadyLiked ? 'currentColor' : 'none'} 
                          className={alreadyLiked ? 'scale-110 drop-shadow-[0_0_6px_rgba(239,68,68,0.4)]' : ''} 
                        />
                        <span>{project.likes || 0} {language === 'bn' ? 'লাইকস' : 'Likes'}</span>
                      </button>
                    </div>

                    {/* Multi-Button Layout matching Marketplace wireframe */}
                    <div className="grid grid-cols-2 gap-3 mt-auto">
                      <Link 
                        to={`/demo/${project.id}`}
                        onClick={() => handleProjectClick(project.id)}
                        className="flex items-center justify-center gap-1.5 py-3 border border-[#00aaff]/30 hover:border-[#00aaff]/60 hover:bg-[#00aaff]/5 text-[#00aaff] font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer text-center"
                      >
                        {language === 'bn' ? '🔵 লাইভ ডেমো' : '🔵 View Demo'}
                      </Link>
                      
                      <Link 
                        to={`/checkout/${project.id}?plan=${currentPlan.name}`}
                        className="flex items-center justify-center gap-1.5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-500/10 text-center"
                      >
                        {language === 'bn' ? '🟢 অর্ডার করুন' : '🟢 Order Now'}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
