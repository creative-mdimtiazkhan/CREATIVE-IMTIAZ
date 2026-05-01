import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import { ChevronLeft, ShoppingCart, MessageCircle, Monitor, Smartphone, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useAppContext();
  const project = state.projects?.find(p => p.id === id);

  const [activeImageSet, setActiveImageSet] = useState(0);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Project Not Found</h2>
        <Link to="/projects" className="text-blue-500 hover:underline">Back to All Projects</Link>
      </div>
    );
  }

  const currentGallery = project.images || [];

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Top Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-xl border-b border-[#222]">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 text-gray-400 hover:text-white transition">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold truncate px-4">{project.name}</h1>
          <div className="w-10"></div> {/* Spacer */}
        </div>
      </div>

      <div className="pt-20 max-w-4xl mx-auto px-4">
        {/* Dynamic Gallery Slider */}
        <div className="space-y-6">
           <div className="relative group">
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4">
                 {currentGallery.map((img, idx) => (
                   <div key={img.id} className="min-w-full snap-center space-y-4">
                      {/* Desktop View */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#111] rounded-3xl border border-[#222] overflow-hidden shadow-2xl relative"
                      >
                         <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 border border-white/10 z-10">
                            <Monitor size={12} className="text-blue-400" />
                            <span className="text-[10px] font-bold">Desktop Layout</span>
                         </div>
                         <img src={img.desktop || img.mobile} alt={`${project.name} desktop`} className="w-full h-auto object-contain" />
                      </motion.div>

                      {/* Mobile View App Highlight */}
                      {img.mobile && (
                         <motion.div 
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           className="max-w-[280px] mx-auto bg-[#111] rounded-[2.5rem] border-8 border-[#222] overflow-hidden shadow-2xl shadow-blue-500/10 relative"
                         >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#222] rounded-b-2xl z-10"></div>
                            <div className="absolute top-2 left-4 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/10 z-10">
                               <Smartphone size={8} className="text-purple-400" />
                               <span className="text-[7px] font-bold">Mobile UI</span>
                            </div>
                            <img src={img.mobile} alt={`${project.name} mobile`} className="w-full h-auto" />
                         </motion.div>
                      )}
                   </div>
                 ))}
              </div>
              
              {currentGallery.length > 1 && (
                 <div className="flex justify-center gap-2 mt-4">
                    {currentGallery.map((_, i) => (
                       <div key={i} className="w-2 h-2 rounded-full bg-blue-500 opacity-50"></div>
                    ))}
                 </div>
              )}
           </div>

           {/* Project Info */}
           <div className="bg-[#111] rounded-3xl border border-[#222] p-8 space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                 <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-500 font-bold text-xs uppercase tracking-widest">
                       <ShieldCheck size={14} />
                       Official Project
                    </div>
                    <h2 className="text-3xl font-black">{project.name}</h2>
                 </div>
                 
                 <div className="bg-[#1a1a1a] p-4 rounded-2xl border border-[#333] flex flex-col items-center min-w-[160px]">
                    {project.regularPrice && (
                       <span className="text-gray-500 text-xs line-through mb-1 uppercase font-bold decoration-red-500">{project.regularPrice}</span>
                    )}
                    <span className="text-3xl font-black text-[#00aaff]">{project.discountPrice || 'TBA'}</span>
                 </div>
              </div>

              <div className="space-y-4">
                 <h4 className="text-sm font-bold text-gray-400 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    Project Description
                 </h4>
                 <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                   {project.description}
                 </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="bg-[#1a1a1a] p-4 rounded-2xl flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500">
                       <CheckCircle2 size={24} />
                    </div>
                    <div>
                       <div className="text-xs text-gray-500 uppercase font-bold">Delivery</div>
                       <div className="font-bold">Fast & Optimized</div>
                    </div>
                 </div>
                 <div className="bg-[#1a1a1a] p-4 rounded-2xl flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                       <ShieldCheck size={24} />
                    </div>
                    <div>
                       <div className="text-xs text-gray-500 uppercase font-bold">Support</div>
                       <div className="font-bold">Life-time Updates</div>
                    </div>
                 </div>
              </div>

              <div className="pt-6 border-t border-[#222] flex flex-col sm:flex-row gap-4">
                 <Link 
                   to="/message" 
                   className="flex-1 bg-[#00aaff] hover:bg-[#0088cc] text-white py-4 rounded-2xl font-black text-center transition shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3"
                 >
                    <ShoppingCart size={20} />
                    ORDER NOW
                 </Link>
                 <a 
                   href={`https://wa.me/${state.contact.whatsapp.replace(/\D/g, '')}?text=I'm interested in ${project.name}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-2xl font-black text-center transition flex items-center justify-center gap-3"
                 >
                    <MessageCircle size={20} />
                    CHAT ON WHATSAPP
                 </a>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
