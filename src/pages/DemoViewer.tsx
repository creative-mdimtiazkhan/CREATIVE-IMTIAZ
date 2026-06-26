import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Monitor, 
  Tablet, 
  Smartphone, 
  ShoppingBag, 
  MessageSquare, 
  ExternalLink,
  Star,
  CheckCircle,
  Zap, 
  ShieldCheck,
  Code,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Check,
  Eye,
  Terminal,
  Clock,
  Heart,
  Briefcase
} from 'lucide-react';

export default function DemoViewer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, incrementFeaturedProjectViews, toggleFeaturedProjectLike } = useAppContext();

  // Find the selected featured project
  const project = state.featuredProjects?.find(p => p.id === id);

  // Active preview viewport mode: 'desktop' | 'tablet' | 'mobile'
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
  // Custom slider screen representation index
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Simulation vs Live Sandbox frame toggle
  const [viewMode, setViewMode] = useState<'live' | 'screenshot'>('screenshot');

  // Active plan index
  const [activePlanIdx, setActivePlanIdx] = useState(0);

  // Bookmarked state
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Custom static reviews to enhance purchase interest (Social Proof)
  const [buyerReviews] = useState([
    { name: "Al-Amin Sarkar", role: "E-commerce Founder", rating: 5, date: "June 2026", text: "Outstanding performance and design! The admin panel is ultra fast and SEO score touched 99 on Mobile. Truly value for money." },
    { name: "Sajid Hasan", role: "Agency Director", rating: 5, date: "May 2026", text: "We bought the corporate template and had it live in 3 hours. Our client is extremely delighted with the UI transitions!" },
  ]);

  // Tech stack mapping based on category or default
  const getTechStack = () => {
    const category = project?.category?.toLowerCase() || '';
    if (category.includes('shop') || category.includes('commerce')) {
      return ['React 18', 'Vite', 'Tailwind CSS v4', 'Node.js', 'Express', 'MongoDB/SQL', 'bKash API', 'Excel Reports'];
    }
    if (category.includes('news') || category.includes('blog') || category.includes('newspaper')) {
      return ['Next.js', 'React', 'Tailwind CSS', 'GraphQL', 'Headless CMS', 'PostgreSQL', 'Instant Indexing'];
    }
    // Default high-performance stack
    return ['React 18', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Framer Motion', 'Secure Wallet Integration'];
  };

  // Safe pageview tracking on component paint
  useEffect(() => {
    if (project) {
      incrementFeaturedProjectViews(project.id);
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-850 p-8 rounded-2xl max-w-md w-full text-center shadow-xl">
          <ShoppingBag className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Item Not Located</h2>
          <p className="text-zinc-400 mb-6 text-sm">
            The template package you're trying to inspect has been archived or relocated.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const techStack = (project.technologies && project.technologies.length > 0)
    ? project.technologies
    : getTechStack();

  const basePrice = parseInt(project.price?.replace(/[^0-9]/g, '') || '4999', 10);
  const virtualPlans = (project.plans && project.plans.length > 0) ? project.plans : [
    { id: 'plan-std', name: 'STD', price: project.price || '৳4,999', buttonText: 'Order STD Package', features: project.features || ['Full Source Code', 'WhatsApp Support'], status: 'Active', isFeatured: false },
    { id: 'plan-pro', name: 'PRO', price: `৳${(basePrice * 1.5).toLocaleString('en-US', {maximumFractionDigits: 0})}`, buttonText: 'Order PRO Package', features: [...(project.features || []), 'Premium Dashboard', 'Priority support'], status: 'Active', isFeatured: true },
    { id: 'plan-dev', name: 'DEV', price: `৳${(basePrice * 2.5).toLocaleString('en-US', {maximumFractionDigits: 0})}`, buttonText: 'Order DEV Package', features: [...(project.features || []), 'Premium Dashboard', 'Priority support', 'White Label License'], status: 'Active', isFeatured: false },
  ];

  // Exclude hidden plans for cleaner customer view
  const activePlans = virtualPlans.filter(p => p.status !== 'Hidden');
  
  // Guard the active index bounds
  const currentPlan = activePlans[activePlanIdx] || activePlans[0] || virtualPlans[0];

  // Build clean dynamic contact & orders WhatsApp link
  const rawAdminWhatsapp = state.contact.whatsapp || '';
  const cleanAdminPhone = rawAdminWhatsapp.replace(/[^0-9]/g, '') || '8801700000000';
  const whatsappDemoMsg = `Assalamu Alaikum! I'm inspecting your premium template "${project.name}" on your portfolio using the *${currentPlan.name}* plan (${currentPlan.price}). I'd love to order or configure this setup!`;
  const whatsappUrl = `https://wa.me/${cleanAdminPhone}?text=${encodeURIComponent(whatsappDemoMsg)}`;

  // Custom simulated screenshots gallery setup for carousel slider
  const simulatedSlides = [
    { title: "Homepage Layout", url: project.screenshot },
    ...(project.gallery && project.gallery.length > 0
      ? project.gallery.map((url, idx) => ({ title: `Gallery Screenshot ${idx + 1}`, url }))
      : [
          { title: "Dashboard / Admin Console", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" },
          { title: "Checkout & Invoice Page", url: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=1200&q=80" },
        ]
    )
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-[#00aaff]/30 selection:text-white">
      
      {/* ========================================================================
          TOP THEMEFOREST-STYLE INTEGRATED CONTROLLER BAR
          ======================================================================== */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-zinc-900 px-4 py-3 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left Block: Logo / Back Link */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button 
              onClick={() => navigate(-1)} 
              className="p-2 hover:bg-zinc-900 border border-zinc-800 rounded-xl transition text-zinc-400 hover:text-white hover:scale-105"
              title="Return to list"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="min-w-0">
              <span className="text-[9px] text-[#00aaff] bg-[#00aaff]/10 border border-[#00aaff]/20 px-2 py-0.5 rounded font-black uppercase tracking-widest block w-fit mb-0.5">
                Marketplace Previewer
              </span>
              <h2 className="text-sm font-black text-white truncate max-w-[200px] sm:max-w-[280px]">
                {project.name}
              </h2>
            </div>
          </div>

          {/* Center Block: Live Sandbox Viewport Device Switcher */}
          {viewMode === 'live' && (
            <div className="bg-zinc-900 border border-zinc-850 p-1 rounded-xl flex items-center gap-1">
              <button
                onClick={() => setViewportMode('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                  viewportMode === 'desktop'
                    ? 'bg-[#00aaff] text-white shadow-lg shadow-blue-500/10'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-805'
                }`}
                title="Desktop View (100% Width)"
              >
                <Monitor size={13} />
                <span className="hidden md:inline">Desktop</span>
              </button>

              <button
                onClick={() => setViewportMode('tablet')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                  viewportMode === 'tablet'
                    ? 'bg-[#00aaff] text-white shadow-lg shadow-blue-500/10'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-805'
                }`}
                title="Tablet View (768px Bezel Frame)"
              >
                <Tablet size={13} />
                <span className="hidden md:inline">Tablet</span>
              </button>

              <button
                onClick={() => setViewportMode('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                  viewportMode === 'mobile'
                    ? 'bg-[#00aaff] text-white shadow-lg shadow-blue-500/10'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-805'
                }`}
                title="Mobile View (375px Smartphone Frame)"
              >
                <Smartphone size={13} />
                <span className="hidden md:inline">Mobile</span>
              </button>
            </div>
          )}

          {/* Right Block: Direct CTAs */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-2 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 rounded-xl transition text-zinc-400 hover:text-red-400"
              title="Save to shortlist"
            >
              <Heart size={16} fill={isBookmarked ? "#ef4444" : "none"} className={isBookmarked ? "text-red-500 scale-105" : ""} />
            </button>

             <Link 
              to={`/checkout/${project.id}?plan=${currentPlan.name}`}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:scale-[1.03] text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-emerald-500/5 flex items-center gap-1.5"
            >
              <ShoppingBag size={13} />
              <span>Buy Now ({currentPlan.price})</span>
            </Link>
          </div>

        </div>
      </header>

      {/* =========================================================================
          MAIN LAYOUT VIEWPORT & DEMO PAGE
          ======================================================================== */}
      <main className="flex-1 w-full flex flex-col">

        {/* SECTION 1: DYNAMIC SANDBOX IFRAME VIEWPORT */}
        <section className="bg-zinc-950 border-b border-zinc-900/60 py-6 px-4 flex flex-col items-center justify-center min-h-[460px] md:min-h-[560px] relative overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,170,255,0.08),rgba(255,255,255,0))]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:32px_32px] opacity-25" />

          {/* Controls to switch sandbox live demo vs showcase screenshot */}
          <div className="flex bg-zinc-900 p-1 rounded-full text-xs font-semibold mb-6 z-10 border border-zinc-850">
            <button
              onClick={() => setViewMode('screenshot')}
              className={`px-4 py-2 rounded-full transition flex items-center gap-1.5 ${
                viewMode === 'screenshot' 
                  ? 'bg-zinc-800 text-white font-bold' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Monitor size={12} />
              <span>Full High-Res Tour</span>
            </button>
            <button
              onClick={() => setViewMode('live')}
              className={`px-4 py-2 rounded-full transition flex items-center gap-1.5 ${
                viewMode === 'live' 
                  ? 'bg-zinc-800 text-white font-bold' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Terminal size={12} />
              <span>Interactive Simulator</span>
            </button>
          </div>

          {/* Outer Viewport Box framing */}
          <AnimatePresence mode="wait">
            {viewMode === 'live' ? (
              <motion.div
                key="interactive-sandbox"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className={`w-full transition-all duration-300 mx-auto z-10 relative flex flex-col ${
                  viewportMode === 'desktop' ? 'max-w-6xl' :
                  viewportMode === 'tablet' ? 'max-w-[768px]' : 'max-w-[375px]'
                }`}
              >
                
                {/* Browser Address Bar Mock chrome */}
                <div className="bg-zinc-900 border border-b-0 border-zinc-850 rounded-t-2xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 max-w-sm mx-auto bg-zinc-950/80 border border-zinc-800 rounded-lg px-3 py-1 text-[10px] text-zinc-500 font-mono tracking-wider truncate text-center flex items-center justify-center gap-1.5">
                    <span className="text-emerald-500">🔒 secure</span>
                    <span>demo.softdev.agency/products/{project.id}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                  </div>
                </div>

                {/* Simulated Content Box with responsive Iframe */}
                <div className="bg-[#0b0c10] border border-zinc-850 rounded-b-2xl overflow-hidden aspect-[16/10] max-h-[500px] shadow-2xl relative group">
                  {project.liveLink && project.liveLink !== '#' ? (
                    <iframe
                      src={project.liveLink}
                      title={project.name}
                      className="w-full h-full border-0 bg-zinc-950"
                      sandbox="allow-scripts allow-same-origin allow-popups"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-zinc-900 to-zinc-950">
                      <div className="max-w-md">
                        <Monitor className="w-12 h-12 text-[#00aaff] mx-auto mb-4 animate-pulse" />
                        <h4 className="text-lg font-bold text-white mb-2">Simulated Live Viewport</h4>
                        <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                          We run secure deployment servers on checkout. Feel free to click "Live Demo" to witness external execution, or check our Full High-Res Tour below.
                        </p>
                        <a 
                          href={project.liveLink === '#' ? undefined : project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 py-2.5 px-5 bg-blue-600 hover:bg-blue-700 font-bold text-xs uppercase tracking-wider rounded-xl transition"
                        >
                          <span>Open Live Link</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Device sizing Bezel wrapper labels */}
                  {viewportMode === 'tablet' && (
                    <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-between px-2 text-[10px] text-zinc-600 font-serif rotate-90 pointer-events-none uppercase">
                      <span>• • Tablet grip sides • •</span>
                    </div>
                  )}
                  {viewportMode === 'mobile' && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-800 w-24 h-5 rounded-b-xl z-20 flex items-center justify-center">
                      <div className="w-8 h-1 rounded-full bg-zinc-750" />
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              /* SCREENSHOT CAROUSEL / FULL TOUR SECTION */
              project.highResTourLink && project.highResTourLink !== '#' && project.highResTourLink.trim() !== '' ? (
                <motion.div
                  key="tour-sandbox"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className={`w-full transition-all duration-300 mx-auto z-10 flex flex-col ${
                    viewportMode === 'desktop' ? 'max-w-6xl' :
                    viewportMode === 'tablet' ? 'max-w-[768px]' : 'max-w-[375px]'
                  }`}
                >
                  {/* Browser Address Bar Mock chrome */}
                  <div className="bg-zinc-900 border border-b-0 border-zinc-850 rounded-t-2xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-1 max-w-sm mx-auto bg-zinc-950/80 border border-zinc-800 rounded-lg px-3 py-1 text-[10px] text-zinc-500 font-mono tracking-wider truncate text-center flex items-center justify-center gap-1.5">
                      <span className="text-emerald-500">🔒 secure</span>
                      <span>tour.softdev.agency/products/{project.id}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                    </div>
                  </div>

                  {/* High Quality Tour Iframe */}
                  <div className="bg-[#0b0c10] border border-zinc-850 rounded-b-2xl overflow-hidden aspect-[16/10] max-h-[500px] shadow-2xl relative group">
                    <iframe
                      src={project.highResTourLink}
                      title={`${project.name} High-Res Tour`}
                      className="w-full h-full border-0 bg-zinc-950"
                      sandbox="allow-scripts allow-same-origin allow-popups"
                    />
                    
                    {viewportMode === 'tablet' && (
                      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-between px-2 text-[10px] text-zinc-600 font-serif rotate-90 pointer-events-none uppercase">
                        <span>• • Tablet grip sides • •</span>
                      </div>
                    )}
                    {viewportMode === 'mobile' && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-800 w-24 h-5 rounded-b-xl z-20 flex items-center justify-center">
                        <div className="w-8 h-1 rounded-full bg-zinc-750" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                /* SCREENSHOT CAROUSEL / SLIDER FALLBACK */
                <motion.div
                  key="screenshots-tour"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-4xl mx-auto z-10 flex flex-col bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-850 shadow-2xl relative"
                >
                  {/* Carousel Viewer */}
                  <div className="relative aspect-[16/9] bg-zinc-950 flex items-center justify-center overflow-hidden">
                    <img
                      src={simulatedSlides[activeSlide]?.url || project.screenshot}
                      alt={simulatedSlides[activeSlide]?.title || project.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Left arrow */}
                    {simulatedSlides.length > 1 && (
                      <button
                        onClick={() => setActiveSlide(prev => prev === 0 ? simulatedSlides.length - 1 : prev - 1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white rounded-xl transition border border-white/10"
                      >
                        <ChevronLeft size={18} />
                      </button>
                    )}

                    {/* Right arrow */}
                    {simulatedSlides.length > 1 && (
                      <button
                        onClick={() => setActiveSlide(prev => prev === simulatedSlides.length - 1 ? 0 : prev + 1)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white rounded-xl transition border border-white/10"
                      >
                        <ChevronRight size={18} />
                      </button>
                    )}

                    {/* Title banner */}
                    <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/5 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#00aaff]">
                        {simulatedSlides[activeSlide]?.title || "Product Showcase"}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        Slide {activeSlide + 1} of {simulatedSlides.length}
                      </span>
                    </div>
                  </div>

                  {/* Carousel Dots list */}
                  {simulatedSlides.length > 1 && (
                    <div className="flex items-center justify-center gap-2 p-4 bg-zinc-900/60">
                      {simulatedSlides.map((slide, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => setActiveSlide(sIdx)}
                          className={`h-2 transition-all rounded-full ${
                            activeSlide === sIdx 
                              ? 'w-6 bg-[#00aaff]' 
                              : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                          }`}
                          title={slide.title}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              )
            )}
          </AnimatePresence>

        </section>

        {/* SECTION 2: THEMEFOREST-STYLE MARKETPLACE CONTEXT SIDEBAR & SPECIFICATIONS BLOCK */}
        <section className="bg-zinc-950 py-12 px-4 md:px-8 border-t border-zinc-900">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: PRODUCT BRIEF & FEATURES GRID (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Product Info Block */}
              <div className="bg-zinc-900/40 p-6 md:p-8 rounded-3xl border border-zinc-900/80 shadow-xl backdrop-blur-md relative">
                <div className="absolute top-6 right-6 flex items-center gap-1.5 text-yellow-500 text-xs font-bold">
                  {Array.from({ length: Math.round(project.rating || 5) }).map((_, rIdx) => (
                    <Star key={rIdx} size={13} fill="currentColor" className="text-yellow-500" />
                  ))}
                  <span className="text-zinc-400 ml-1">({(project.rating || 5.0).toFixed(1)} Rating)</span>
                </div>

                <span className="text-[10px] text-[#00aaff] bg-[#00aaff]/10 border border-[#00aaff]/20 px-3 py-1 rounded-full font-bold uppercase tracking-widest inline-block mb-3">
                  {project.category || 'Premium Template'}
                </span>

                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  {project.name}
                </h1>
                
                <p className="text-zinc-400 text-sm leading-relaxed mt-4 whitespace-pre-line border-b border-zinc-800 pb-6">
                  {project.description || 'This beautiful modern templates comes pre-configured with reactive states, high rendering speed, and elite design modules. Expand your web architecture seamlessly today.'}
                </p>

                {/* Tech specifications chips */}
                <div className="pt-6">
                  <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <Code size={13} className="text-[#00aaff]" />
                    Built-in Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((techItem, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="bg-zinc-950 border border-zinc-850 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300 hover:text-white hover:border-[#00aaff] transition duration-250 cursor-default"
                      >
                        {techItem}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Package Core Features & Highlights */}
              <div className="bg-zinc-900/40 p-6 md:p-8 rounded-3xl border border-zinc-900/80 shadow-xl backdrop-blur-md">
                <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[#00aaff] rounded-full" />
                  Core Capabilities & Custom Modules
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.coreFeatures && project.coreFeatures.length > 0 ? (
                    project.coreFeatures.map((feat, fIdx) => (
                      <div 
                        key={fIdx}
                        className="bg-zinc-950 border border-zinc-850 p-4 rounded-2xl flex items-start gap-4 hover:border-zinc-800 transition duration-300 group"
                      >
                        <div className="w-7 h-7 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center rounded-lg mt-0.5 shrink-0 group-hover:bg-emerald-500/20 transition-all font-mono font-bold text-xs">
                          {feat.icon || "✓"}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">{feat.title}</h4>
                          <p className="text-zinc-500 text-[11px] mt-1">
                            {feat.description}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    (project.features || [
                      "100% Responsive Adaptive Layout",
                      "Advanced Admin Panel Management",
                      "Integrated Payment Handlers Ready",
                      "SEO Optimized Semantics",
                      "Next-Gen Fast Rendering Loading",
                      "Secure Authentication Routing"
                    ]).map((feat, fIdx) => (
                      <div 
                        key={fIdx}
                        className="bg-zinc-950 border border-zinc-850 p-4 rounded-2xl flex items-start gap-3 hover:border-zinc-800 transition duration-300 group"
                      >
                        <div className="w-6 h-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center rounded-lg mt-0.5 shrink-0 group-hover:bg-emerald-500/20 transition-all">
                          <Check size={12} className="stroke-[3]" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">{feat}</h4>
                          <p className="text-zinc-500 text-[11px] mt-1">
                            Tailored precisely to support production scalability benchmarks effortlessly.
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Client Benefits Section */}
              <div className="bg-zinc-900/40 p-6 md:p-8 rounded-3xl border border-zinc-900/80 shadow-xl backdrop-blur-md">
                <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-amber-500 rounded-full" />
                  Why Choose Our Agency Templates?
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.benefits && project.benefits.length > 0 ? (
                    project.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="bg-zinc-950/80 border border-zinc-850 p-5 rounded-2xl space-y-3">
                        <div className="w-9 h-9 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 text-amber-400 font-bold text-sm">
                          {benefit.icon || "✓"}
                        </div>
                        <h4 className="text-sm font-bold text-white leading-tight">{benefit.title}</h4>
                        <p className="text-zinc-500 text-xs leading-relaxed">{benefit.description}</p>
                      </div>
                    ))
                  ) : (
                    [
                      { icon: <Zap className="text-amber-400" />, title: "Instant Deployment", desc: "Get setup in 2-4 hours. Our developers take care of file hosting, domain routing, and template customization." },
                      { icon: <ShieldCheck className="text-blue-400" />, title: "Lifetime Updates", desc: "No renewal fees on templates. Receive regular design upgrades and bug patches totally free." },
                      { icon: <Briefcase className="text-emerald-400" />, title: "Dedicated SLA", desc: "Receive real-time chat support directly on WhatsApp to coordinate extra pages and script changes." },
                    ].map((benefit, bIdx) => (
                      <div key={bIdx} className="bg-zinc-950/80 border border-zinc-850 p-5 rounded-2xl space-y-3">
                        <div className="w-9 h-9 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-805">
                          {benefit.icon}
                        </div>
                        <h4 className="text-sm font-bold text-white leading-tight">{benefit.title}</h4>
                        <p className="text-zinc-500 text-xs leading-relaxed">{benefit.desc}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Social Proof Reviews Log */}
              <div className="bg-zinc-900/40 p-6 md:p-8 rounded-3xl border border-zinc-900/80 shadow-xl backdrop-blur-md">
                <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-pink-500 rounded-full" />
                  What our clients say
                </h2>

                <div className="space-y-4">
                  {project.reviews && project.reviews.length > 0 ? (
                    project.reviews.map((review, rIdx) => (
                      <div key={rIdx} className="bg-zinc-950 p-4 rounded-2xl border border-zinc-850 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-extrabold text-white uppercase tracking-wider">{review.name}</p>
                            <p className="text-[10px] text-zinc-500 mt-0.5">{review.designation} • Verified Partner</p>
                          </div>
                          <div className="flex items-center gap-0.5 text-yellow-500 text-[10px]">
                            {Array.from({ length: review.rating || 5 }).map((_, stIdx) => (
                              <Star key={stIdx} size={10} fill="currentColor" />
                            ))}
                          </div>
                        </div>
                        <p className="text-zinc-400 text-xs leading-relaxed italic">
                          "{review.review}"
                        </p>
                      </div>
                    ))
                  ) : (
                    buyerReviews.map((review, rIdx) => (
                      <div key={rIdx} className="bg-zinc-950 p-4 rounded-2xl border border-zinc-850 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-extrabold text-white uppercase tracking-wider">{review.name}</p>
                            <p className="text-[10px] text-zinc-500 mt-0.5">{review.role} • {review.date}</p>
                          </div>
                          <div className="flex items-center gap-0.5 text-yellow-500 text-[10px]">
                            {Array.from({ length: review.rating }).map((_, stIdx) => (
                              <Star key={stIdx} size={10} fill="currentColor" />
                            ))}
                          </div>
                        </div>
                        <p className="text-zinc-400 text-xs leading-relaxed italic">
                          "{review.text}"
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: TAXES, SELLER INFO, CALL TO ACTION BOX (4 Cols) */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              
              {/* Premium Market Checkout Box */}
              <div className="bg-zinc-900 border border-zinc-850 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 animate-pulse" />

                {/* Dynamic Billing Switcher */}
                <div className="flex bg-zinc-950 p-1 rounded-xl mb-6 border border-zinc-850 overflow-x-auto">
                  {activePlans.map((planItem, idx) => (
                    <button
                      key={planItem.id}
                      onClick={() => setActivePlanIdx(idx)}
                      className={`flex-1 text-center py-2 px-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shrink-0 min-w-[70px] ${
                        activePlanIdx === idx
                          ? 'bg-[#00aaff] text-white font-bold shadow-md'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {planItem.name}
                    </button>
                  ))}
                </div>

                <div className="mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#00aaff]">Price Package ({currentPlan.name})</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-emerald-400">{currentPlan.price}</span>
                    <span className="text-zinc-500 text-xs">One-time payment</span>
                  </div>
                </div>

                {/* Features details based on selected dynamic plan */}
                <ul className="space-y-3 mb-6 text-xs text-zinc-300 border-t border-zinc-855 pt-5 max-h-72 overflow-y-auto pr-1">
                  {currentPlan.features.map((feat, featIdx) => (
                    <li key={featIdx} className="flex items-start gap-2.5">
                      <CheckCircle size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Primary Action Button */}
                <div className="space-y-3">
                  <Link 
                    to={`/checkout/${project.id}?plan=${currentPlan.name}`}
                    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 active:scale-95 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition duration-300 flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/10"
                  >
                    <ShoppingBag size={14} />
                    <span>Confirm Order ({currentPlan.name})</span>
                  </Link>

                  <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 active:scale-95 text-zinc-300 hover:text-white font-semibold text-xs uppercase tracking-widest rounded-2xl transition flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare size={13} className="text-emerald-400" />
                    <span>Contact Seller (WhatsApp)</span>
                  </a>

                  {project.liveLink && project.liveLink !== '#' && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-white font-semibold text-xs uppercase tracking-widest rounded-2xl transition flex items-center justify-center gap-1.5"
                    >
                      <ExternalLink size={13} />
                      <span>Open Live Site Externally</span>
                    </a>
                  )}
                </div>

                <div className="text-[10px] text-zinc-500 mt-4 text-center leading-relaxed">
                  🔒 Payments are processed using secure bKash, Nagad or Rocket peer-to-peer references.
                </div>

              </div>

              {/* Developer/Seller Profile card */}
              <div className="bg-zinc-900/40 border border-zinc-900 p-5 rounded-3xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-[#00aaff] flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">
                  SD
                </div>
                <div className="min-w-0">
                  <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Designed & Verified By</p>
                  <p className="font-extrabold text-[#00aaff] text-sm mt-0.5">Software Development Agency</p>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/10 px-2 py-0.2 rounded-full mt-1.5">
                    ● Elite Level Author
                  </span>
                </div>
              </div>

            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
