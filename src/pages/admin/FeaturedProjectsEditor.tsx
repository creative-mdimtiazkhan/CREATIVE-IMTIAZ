import React, { useState, useRef } from 'react';
import { FeaturedProject, ProductPlan, useAppContext } from '../../context/AppContext';
import { 
  Plus, 
  Trash2, 
  Save, 
  Image as ImageIcon, 
  X, 
  Edit2, 
  ChevronUp, 
  ChevronDown, 
  ExternalLink, 
  Eye, 
  Heart, 
  Star, 
  Copy, 
  EyeOff, 
  Check, 
  Layers, 
  ArrowLeft, 
  Sparkles,
  Code
} from 'lucide-react';

export default function FeaturedProjectsEditor() {
  const { state, updateFeaturedProjects } = useAppContext();
  const [projects, setProjects] = useState<FeaturedProject[]>(state.featuredProjects || []);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<FeaturedProject | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Core Product details
  const [currentProject, setCurrentProject] = useState({
    name: '',
    description: '',
    screenshot: '',
    liveLink: '',
    highResTourLink: '',
    category: '',
    orderLink: '',
    views: 0,
    likes: 0,
    galleryString: '',
    status: 'Active',
    isFeatured: true,
    regularPrice: '',
    discountPrice: '',
    rating: 5
  });

  // Dynamic Plans state inside the form
  const [plans, setPlans] = useState<ProductPlan[]>([]);

  // States for dynamic builders lists
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [newTechText, setNewTechText] = useState('');

  const [coreFeatures, setCoreFeatures] = useState<Array<{ title: string; description: string; icon: string }>>([]);
  const [benefits, setBenefits] = useState<Array<{ icon: string; title: string; description: string }>>([]);
  const [reviews, setReviews] = useState<Array<{ name: string; designation: string; review: string; rating: number }>>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentProject(prev => ({ ...prev, screenshot: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper to initialize STD, PRO, DEV standard plans
  const handleGenerateDefaultPlans = () => {
    const defaultPlans: ProductPlan[] = [
      {
        id: 'plan-std-' + Math.random().toString(36).substr(2, 9),
        name: 'STD',
        price: '৳4,999',
        buttonText: 'Order STD Package',
        features: ['Full Source Code', 'Domain Configuration', 'WhatsApp Support', 'Responsive Design', 'Fast Loading'],
        status: 'Active',
        isFeatured: false
      },
      {
        id: 'plan-pro-' + Math.random().toString(36).substr(2, 9),
        name: 'PRO',
        price: '৳7,999',
        buttonText: 'Order PRO Package',
        features: ['Premium Dashboard', 'Priority Support', 'SEO Setup', 'Full Source Code', 'Domain Configuration', 'WhatsApp Support', 'Hosting Setup', 'Custom Dashboard'],
        status: 'Active',
        isFeatured: true
      },
      {
        id: 'plan-dev-' + Math.random().toString(36).substr(2, 9),
        name: 'DEV',
        price: '৳12,999',
        buttonText: 'Order DEV Package',
        features: ['Full Developer Access', 'Database Package', 'API Integration', 'Premium Dashboard', 'Priority Support', 'SEO Setup', 'Full Source Code', 'Domain Configuration', 'WhatsApp Support', 'Hosting Setup', 'Custom Dashboard', 'Unlimited Revisions'],
        status: 'Active',
        isFeatured: false
      }
    ];
    setPlans(defaultPlans);
  };

  // Plan level operations
  const handleAddPlan = () => {
    const newPlan: ProductPlan = {
      id: 'plan-custom-' + Math.random().toString(36).substr(2, 9),
      name: `Plan ${plans.length + 1}`,
      price: '৳4,999',
      buttonText: 'Order Package',
      features: ['Full Source Code', 'WhatsApp Support'],
      status: 'Active',
      isFeatured: false
    };
    setPlans([...plans, newPlan]);
  };

  const handleDuplicatePlan = (planToCopy: ProductPlan) => {
    const duplicated: ProductPlan = {
      ...planToCopy,
      id: 'plan-dup-' + Math.random().toString(36).substr(2, 9),
      name: `${planToCopy.name} (Copy)`,
      isFeatured: false // reset featured flag for the duplicated plan by default
    };
    setPlans([...plans, duplicated]);
  };

  const handleDeletePlan = (planId: string) => {
    setPlans(plans.filter(p => p.id !== planId));
  };

  const handleTogglePlanStatus = (planId: string) => {
    setPlans(plans.map(p => 
      p.id === planId 
        ? { ...p, status: p.status === 'Hidden' ? 'Active' : 'Hidden' } 
        : p
    ));
  };

  const handleTogglePlanFeatured = (planId: string) => {
    setPlans(plans.map(p => 
      p.id === planId 
        ? { ...p, isFeatured: !p.isFeatured } 
        : p
    ));
  };

  const handleMovePlan = (idx: number, direction: 'up' | 'down') => {
    const nextIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (nextIdx < 0 || nextIdx >= plans.length) return;
    const reordered = [...plans];
    [reordered[idx], reordered[nextIdx]] = [reordered[nextIdx], reordered[idx]];
    setPlans(reordered);
  };

  const handlePlanChange = (planId: string, field: keyof ProductPlan, value: any) => {
    setPlans(plans.map(p => p.id === planId ? { ...p, [field]: value } : p));
  };

  // Plan features dynamic add / change / remove
  const handleAddFeatureToPlan = (planId: string) => {
    setPlans(plans.map(p => {
      if (p.id === planId) {
        return {
          ...p,
          features: [...p.features, '']
        };
      }
      return p;
    }));
  };

  const handleUpdatePlanFeature = (planId: string, featIdx: number, text: string) => {
    setPlans(plans.map(p => {
      if (p.id === planId) {
        const updatedFeats = [...p.features];
        updatedFeats[featIdx] = text;
        return {
          ...p,
          features: updatedFeats
        };
      }
      return p;
    }));
  };

  const handleRemovePlanFeature = (planId: string, featIdx: number) => {
    setPlans(plans.map(p => {
      if (p.id === planId) {
        return {
          ...p,
          features: p.features.filter((_, idx) => idx !== featIdx)
        };
      }
      return p;
    }));
  };

  const handleSave = () => {
    if (!currentProject.name || !currentProject.description) {
      alert('Product Name and Description are required!');
      return;
    }

    const galleryArray = currentProject.galleryString
      ? currentProject.galleryString.split(',').map(g => g.trim()).filter(Boolean)
      : [];

    const projectToSave: FeaturedProject = {
      id: editingProject ? editingProject.id : Date.now().toString(),
      name: currentProject.name,
      description: currentProject.description,
      screenshot: currentProject.screenshot,
      liveLink: currentProject.liveLink,
      highResTourLink: currentProject.highResTourLink,
      // Fallback price is standard first active plan's price, or custom label
      price: currentProject.discountPrice || plans.find(p => p.status !== 'Hidden')?.price || '৳4,999',
      category: currentProject.category || 'Standard',
      // Fallback features is standard first active plan's features list
      features: plans.find(p => p.status !== 'Hidden')?.features || ['Fast Loading'],
      orderLink: currentProject.orderLink,
      views: currentProject.views || 0,
      likes: currentProject.likes || 0,
      gallery: galleryArray,
      status: currentProject.status as 'Active' | 'Hidden',
      isFeatured: currentProject.isFeatured,
      plans: plans, // Save the full list of dynamic package plans
      regularPrice: currentProject.regularPrice,
      discountPrice: currentProject.discountPrice,
      rating: Number(currentProject.rating) || 5,
      technologies: technologies,
      coreFeatures: coreFeatures,
      benefits: benefits,
      reviews: reviews
    };

    let updatedList: FeaturedProject[];
    if (editingProject) {
      updatedList = projects.map(p => 
        p.id === editingProject.id 
          ? projectToSave 
          : p
      );
    } else {
      updatedList = [
        ...projects, 
        projectToSave
      ];
    }

    setProjects(updatedList);
    updateFeaturedProjects(updatedList);
    setSuccess(true);
    resetForm();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setSuccess(false), 3000);
  };

  const resetForm = () => {
    setCurrentProject({
      name: '',
      description: '',
      screenshot: '',
      liveLink: '',
      highResTourLink: '',
      category: '',
      orderLink: '',
      views: 0,
      likes: 0,
      galleryString: '',
      status: 'Active',
      isFeatured: true,
      regularPrice: '',
      discountPrice: '',
      rating: 5
    });
    setPlans([]);
    setTechnologies([]);
    setNewTechText('');
    setCoreFeatures([]);
    setBenefits([]);
    setReviews([]);
    setEditingProject(null);
    setShowForm(false);
  };

  const handleStartEdit = (project: FeaturedProject) => {
    setEditingProject(project);
    setCurrentProject({
      name: project.name || '',
      description: project.description || '',
      screenshot: project.screenshot || '',
      liveLink: project.liveLink || '',
      highResTourLink: project.highResTourLink || '',
      category: project.category || '',
      orderLink: project.orderLink || '',
      views: project.views || 0,
      likes: project.likes || 0,
      galleryString: project.gallery ? project.gallery.join(', ') : '',
      status: project.status || 'Active',
      isFeatured: project.isFeatured !== false,
      regularPrice: project.regularPrice || '',
      discountPrice: project.discountPrice || '',
      rating: project.rating || 5
    });
    setPlans(project.plans || []);
    setTechnologies(project.technologies || []);
    setCoreFeatures(project.coreFeatures || []);
    setBenefits(project.benefits || []);
    setReviews(project.reviews || []);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      updateFeaturedProjects(updated);
    }
  };

  const moveProject = (index: number, direction: 'up' | 'down') => {
    const newList = [...projects];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newList.length) return;

    [newList[index], newList[targetIndex]] = [newList[targetIndex], newList[index]];
    setProjects(newList);
    updateFeaturedProjects(newList);
  };

  return (
    <div className="w-full max-w-full px-1 overflow-x-hidden space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start md:items-center gap-4 pb-5 border-b border-zinc-800">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-white">
            <Layers className="text-[#00aaff]" />
            <span>Products</span>
          </h2>
          <p className="text-zinc-400 text-xs mt-1">Configure your product cards and dynamic package tiers.</p>
        </div>
        {!showForm && (
          <button 
            onClick={() => {
              setShowForm(true);
              handleGenerateDefaultPlans(); // pre-initialize standard plans to save user actions
            }}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-lg text-sm active:scale-95"
          >
            <Plus size={16} /> Add New Product
          </button>
        )}
      </div>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/35 text-emerald-400 text-xs p-4 rounded-xl animate-in font-medium flex items-center gap-2">
          <Check size={16} className="text-emerald-450" />
          <span>Product saved successfully!</span>
        </div>
      )}

      {/* Product & Package Plans Form */}
      {showForm && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Form Header Action Bar */}
          <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <button onClick={resetForm} className="p-2 bg-zinc-900 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white transition">
                <ArrowLeft size={16} />
              </button>
              <h3 className="text-base font-bold text-white">{editingProject ? 'Modify Product & Plans' : 'Configure New Listing'}</h3>
            </div>
            <button onClick={resetForm} className="text-zinc-400 hover:text-white p-2">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-8">
            {/* SECTION 1: Product Base Information */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-[#00aaff] font-black flex items-center gap-1.5 pb-2 border-b border-zinc-900">
                <span>Part 1:</span> Product Base Information
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Product Name</label>
                  <input 
                    type="text"
                    value={currentProject.name}
                    onChange={(e) => setCurrentProject({ ...currentProject, name: e.target.value })}
                    className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl focus:border-[#00aaff] focus:ring-1 focus:ring-[#00aaff]/20 outline-none text-white font-bold text-sm transition"
                    placeholder="E.g. Premium Website Package"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Product Category</label>
                  <input 
                    type="text"
                    value={currentProject.category}
                    onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                    className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl focus:border-[#00aaff] focus:ring-1 focus:ring-[#00aaff]/20 outline-none text-white text-sm transition"
                    placeholder="E.g. E-Commerce, Agency, Mobile App"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Regular Price</label>
                  <input 
                    type="text"
                    value={currentProject.regularPrice}
                    onChange={(e) => setCurrentProject({ ...currentProject, regularPrice: e.target.value })}
                    className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl focus:border-[#00aaff] focus:ring-1 focus:ring-[#00aaff]/20 outline-none text-white font-mono text-sm transition"
                    placeholder="E.g. ৳6,000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Discount Price</label>
                  <input 
                    type="text"
                    value={currentProject.discountPrice}
                    onChange={(e) => setCurrentProject({ ...currentProject, discountPrice: e.target.value })}
                    className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl focus:border-[#00aaff] focus:ring-1 focus:ring-[#00aaff]/20 outline-none text-[#00aaff] font-bold font-mono text-sm transition"
                    placeholder="E.g. ৳4,999"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Rating (1 to 5 Stars)</label>
                  <input 
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={currentProject.rating}
                    onChange={(e) => setCurrentProject({ ...currentProject, rating: parseFloat(e.target.value) || 5 })}
                    className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl focus:border-[#00aaff] focus:ring-1 focus:ring-[#00aaff]/20 outline-none text-white font-mono text-sm transition"
                    placeholder="E.g. 4.9"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Short Description</label>
                <textarea 
                  rows={2}
                  value={currentProject.description}
                  onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                  className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl focus:border-[#00aaff] focus:ring-1 focus:ring-[#00aaff]/20 outline-none text-white resize-none text-sm transition"
                  placeholder="Provide a clean concise marketing description..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Live Demo Link (Interactive)</label>
                  <input 
                    type="text"
                    value={currentProject.liveLink}
                    onChange={(e) => setCurrentProject({ ...currentProject, liveLink: e.target.value })}
                    className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl focus:border-[#00aaff] focus:ring-1 focus:ring-[#00aaff]/20 outline-none text-white text-xs transition"
                    placeholder="E.g. https://domain.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Full High-Res Tour Link</label>
                  <input 
                    type="text"
                    value={currentProject.highResTourLink}
                    onChange={(e) => setCurrentProject({ ...currentProject, highResTourLink: e.target.value })}
                    className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl focus:border-[#00aaff] focus:ring-1 focus:ring-[#00aaff]/20 outline-none text-white text-xs transition"
                    placeholder="E.g. https://tour.domain.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 font-mono">Views (Simulation)</label>
                  <input 
                    type="number"
                    value={currentProject.views}
                    onChange={(e) => setCurrentProject({ ...currentProject, views: parseInt(e.target.value) || 0 })}
                    className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl focus:border-[#00aaff] focus:ring-1 focus:ring-[#00aaff]/20 outline-none text-white font-mono text-sm transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 font-mono">Likes (Simulation)</label>
                  <input 
                    type="number"
                    value={currentProject.likes}
                    onChange={(e) => setCurrentProject({ ...currentProject, likes: parseInt(e.target.value) || 0 })}
                    className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl focus:border-[#00aaff] focus:ring-1 focus:ring-[#00aaff]/20 outline-none text-white font-mono text-sm transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Status / Placement</label>
                  <select
                    value={currentProject.status}
                    onChange={(e) => setCurrentProject({ ...currentProject, status: e.target.value })}
                    className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl focus:border-[#00aaff] focus:ring-1 focus:ring-[#00aaff]/20 outline-none text-white font-semibold text-sm transition"
                  >
                    <option value="Active">🟢 Active / Public</option>
                    <option value="Hidden">🔴 Hidden (Draft)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Product Thumbnail Image (Main Card)</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full aspect-video bg-zinc-950 border-2 border-dashed border-zinc-850 hover:border-[#00aaff] rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all group overflow-hidden"
                  >
                    {currentProject.screenshot ? (
                      <img src={currentProject.screenshot} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <ImageIcon size={28} className="text-zinc-650 group-hover:text-[#00aaff] transition-colors mb-2" />
                        <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Click to upload Screenshot</span>
                      </>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Gallery Screenshot URLs</label>
                    <textarea 
                      rows={3}
                      value={currentProject.galleryString}
                      onChange={(e) => setCurrentProject({ ...currentProject, galleryString: e.target.value })}
                      className="w-full p-3 bg-zinc-950 border border-zinc-850 rounded-xl focus:border-[#00aaff] focus:ring-1 focus:ring-[#00aaff]/20 outline-none text-white text-xs resize-none transition"
                      placeholder="E.g. URL1, URL2"
                    />
                    <p className="text-[10px] text-zinc-600 mt-1.5 leading-relaxed">Optional extra preview URLs separated with commas.</p>
                  </div>

                  <div className="flex items-center p-3 bg-zinc-950 border border-zinc-850 rounded-xl">
                    <input 
                      type="checkbox" 
                      id="isFeaturedCheckbox"
                      checked={currentProject.isFeatured}
                      onChange={(e) => setCurrentProject({ ...currentProject, isFeatured: e.target.checked })}
                      className="mr-3 w-4 h-4 text-blue-600 rounded bg-zinc-950 border-zinc-800"
                    />
                    <label htmlFor="isFeaturedCheckbox" className="text-xs font-bold text-zinc-400 cursor-pointer select-none">
                      Show on Homepage Featured Products Slider
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: Package Plans Custom Config */}
            <div className="space-y-4 pt-4 border-t border-zinc-800/80">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#00aaff] font-extrabold flex items-center gap-1.5 pb-2">
                    <Sparkles size={14} className="text-[#00aaff]" />
                    <span>Part 2:</span> Dynamic Package Plans List
                  </h4>
                  <p className="text-zinc-500 text-[11px] mt-1">Configure unique STD, PRO, and DEV plans containing distinctive prices.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleGenerateDefaultPlans}
                    className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold rounded-lg text-xs transition flex items-center gap-1.5"
                  >
                    <Sparkles size={12} /> Auto-Generate STD / PRO / DEV
                  </button>
                  <button
                    type="button"
                    onClick={handleAddPlan}
                    className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-[#00aaff] border border-zinc-800 font-bold rounded-lg text-xs transition flex items-center gap-1"
                  >
                    <Plus size={12} /> Add Package Plan
                  </button>
                </div>
              </div>

              {plans.length === 0 ? (
                <div className="py-8 text-zinc-500 text-xs italic">
                  No active package plans configured yet. Click Auto-Generate or Add Package Plan.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {plans.map((plan, planIdx) => {
                    const isHidden = plan.status === 'Hidden';
                    const isFeatured = plan.isFeatured;

                    return (
                      <div 
                        key={plan.id}
                        className={`border rounded-xl transition-all p-4 space-y-4 relative ${
                          isHidden 
                            ? 'border-dashed border-red-500/20 opacity-60 bg-red-500/5' 
                            : isFeatured 
                              ? 'border-[#00aaff]/30 bg-[#00aaff]/5' 
                              : 'border-zinc-850 bg-transparent'
                        }`}
                      >
                        {/* Plan top bar controller */}
                        <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-black text-[#00aaff] bg-[#00aaff]/5 border border-[#00aaff]/15 px-2 py-0.5 rounded">
                              Plan #{planIdx + 1} ({plan.name})
                            </span>
                            {isFeatured && (
                              <span className="text-[8px] font-extrabold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded text-amber-400 uppercase tracking-wider flex items-center gap-1">
                                <Star size={8} fill="currentColor" /> Popular
                              </span>
                            )}
                            {isHidden && (
                              <span className="text-[8px] font-extrabold bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded text-rose-400 uppercase tracking-wider">
                                🚫 Hidden
                              </span>
                            )}
                          </div>

                          {/* Plan controller buttons */}
                          <div className="flex items-center gap-1">
                            {/* Order keys */}
                            <button
                              type="button"
                              disabled={planIdx === 0}
                              onClick={() => handleMovePlan(planIdx, 'up')}
                              className="p-1 px-1.5 bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-white rounded disabled:opacity-20"
                              title="Move Plan Up"
                            >
                              <ChevronUp size={12} />
                            </button>
                            <button
                              type="button"
                              disabled={planIdx === plans.length - 1}
                              onClick={() => handleMovePlan(planIdx, 'down')}
                              className="p-1 px-1.5 bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-white rounded disabled:opacity-20"
                              title="Move Plan Down"
                            >
                              <ChevronDown size={12} />
                            </button>

                            {/* Clickable Featured Toggle */}
                            <button
                              type="button"
                              onClick={() => handleTogglePlanFeatured(plan.id)}
                              title="Toggle Featured Flag"
                              className={`p-1.5 rounded transition ${
                                isFeatured 
                                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                                  : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'
                              }`}
                            >
                              <Star size={11} fill={isFeatured ? "currentColor" : "none"} />
                            </button>

                            {/* Visibility Toggler */}
                            <button
                              type="button"
                              onClick={() => handleTogglePlanStatus(plan.id)}
                              title="Toggle Visibility Status"
                              className={`p-1.5 rounded transition ${
                                isHidden 
                                  ? 'bg-rose-500/10 text-rose-450 border border-rose-500/20' 
                                  : 'bg-zinc-900 text-zinc-400 hover:text-white'
                              }`}
                            >
                              {isHidden ? <EyeOff size={11} /> : <Eye size={11} />}
                            </button>

                            {/* Duplicator */}
                            <button
                              type="button"
                              onClick={() => handleDuplicatePlan(plan)}
                              title="Copy plan"
                              className="p-1.5 bg-zinc-900 hover:bg-zinc-850 text-[#00aaff] rounded border border-zinc-800 transition"
                            >
                              <Copy size={11} />
                            </button>

                            {/* Deleter */}
                            <button
                              type="button"
                              onClick={() => handleDeletePlan(plan.id)}
                              title="Delete Plan"
                              className="p-1.5 bg-rose-500/5 hover:bg-rose-500/15 text-rose-500 rounded border border-rose-500/10 transition"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        </div>

                        {/* Plan configuration fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1">Plan Name</label>
                            <input 
                              type="text"
                              value={plan.name}
                              onChange={(e) => handlePlanChange(plan.id, 'name', e.target.value)}
                              className="w-full p-2 bg-zinc-950 border border-zinc-850 rounded-lg text-white font-bold text-xs outline-none focus:border-[#00aaff]"
                              placeholder="E.g. STD, PRO, DEV"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1">Price Point</label>
                            <input 
                              type="text"
                              value={plan.price}
                              onChange={(e) => handlePlanChange(plan.id, 'price', e.target.value)}
                              className="w-full p-2 bg-zinc-950 border border-zinc-850 rounded-lg text-[#00aaff] font-bold text-xs outline-none focus:border-[#00aaff]"
                              placeholder="E.g. ৳4,999"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-1">Button Button label</label>
                            <input 
                              type="text"
                              value={plan.buttonText || ''}
                              onChange={(e) => handlePlanChange(plan.id, 'buttonText', e.target.value)}
                              className="w-full p-2 bg-zinc-950 border border-zinc-850 rounded-lg text-white text-xs outline-none focus:border-[#00aaff]"
                              placeholder="E.g. Confirm STD Order"
                            />
                          </div>
                        </div>

                        {/* Dynamic features block */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-extrabold uppercase tracking-wide text-zinc-450">
                              Included Features ({plan.features.length})
                            </span>
                            <button
                              type="button"
                              onClick={() => handleAddFeatureToPlan(plan.id)}
                              className="px-2 py-0.5 bg-zinc-900 hover:bg-zinc-800 text-[#00aaff] font-bold text-[9px] rounded border border-zinc-800 flex items-center gap-1"
                            >
                              <Plus size={8} /> Add Feature Line
                            </button>
                          </div>

                          {plan.features.length === 0 ? (
                            <p className="text-[10px] text-zinc-650 italic">No features registered.</p>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                              {plan.features.map((feature, featIdx) => (
                                <div key={featIdx} className="flex items-center gap-1 bg-zinc-950 p-1.5 rounded-lg border border-zinc-900">
                                  <span className="text-emerald-500 text-[10px] shrink-0 pl-1 font-bold">✓</span>
                                  <input 
                                    type="text"
                                    value={feature}
                                    onChange={(e) => handleUpdatePlanFeature(plan.id, featIdx, e.target.value)}
                                    className="flex-grow bg-transparent text-white text-xs outline-none focus:text-[#00aaff]"
                                    placeholder="E.g. Full Source Code"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePlanFeature(plan.id, featIdx)}
                                    className="p-1 text-zinc-650 hover:text-red-500 transition-colors"
                                  >
                                    <Trash2 size={10} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* SECTION 3: Built-in Technology Stack */}
            <div className="space-y-4 pt-4 border-t border-zinc-800/80">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#00aaff] font-extrabold flex items-center gap-1.5 font-sans">
                  <Code size={14} className="text-[#00aaff]" />
                  <span>Part 3:</span> Built-in Technology Stack
                </h4>
                <p className="text-zinc-500 text-[11px] mt-1">Add or remove tag items that will render as technical tag badges.</p>
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {technologies.length === 0 ? (
                    <span className="text-xs text-zinc-500 italic">No technologies added yet. Type a technology label below.</span>
                  ) : (
                    technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="bg-zinc-950 border border-zinc-850 px-3 py-1 rounded-lg text-xs font-mono text-zinc-350 flex items-center gap-1.5">
                        <span>{tech}</span>
                        <button
                          type="button"
                          onClick={() => setTechnologies(technologies.filter((_, i) => i !== tIdx))}
                          className="text-zinc-500 hover:text-red-500 font-bold transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))
                  )}
                </div>

                <div className="flex gap-2 max-w-sm">
                  <input
                    type="text"
                    value={newTechText}
                    onChange={(e) => setNewTechText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newTechText.trim()) {
                          setTechnologies([...technologies, newTechText.trim()]);
                          setNewTechText('');
                        }
                      }
                    }}
                    placeholder="E.g., Tailwind CSS v4"
                    className="flex-1 p-2 bg-zinc-950 border border-zinc-850 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newTechText.trim()) {
                        setTechnologies([...technologies, newTechText.trim()]);
                        setNewTechText('');
                      }
                    }}
                    className="px-3 py-2 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-white font-bold rounded-lg text-xs transition"
                  >
                    Add Tag
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION 4: Core Capabilities */}
            <div className="space-y-4 pt-4 border-t border-zinc-800/80">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#00aaff] font-extrabold flex items-center gap-1.5 font-sans">
                    <Sparkles size={14} className="text-[#00aaff]" />
                    <span>Part 4:</span> Core Capabilities & Custom Modules
                  </h4>
                  <p className="text-zinc-500 text-[11px] mt-1">Specify custom Title, Description, and inline Icon indicators.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setCoreFeatures([...coreFeatures, { title: '', description: '', icon: '✓' }])}
                  className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-[#00aaff] font-bold rounded-lg text-xs transition flex items-center gap-1"
                >
                  <Plus size={10} /> Add Feature Line
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coreFeatures.length === 0 ? (
                  <div className="col-span-full py-4 text-zinc-500 text-xs italic">
                    No custom core features defined. Fallbacks will apply in the product page.
                  </div>
                ) : (
                  coreFeatures.map((feat, fIdx) => (
                    <div key={fIdx} className="border border-zinc-850 p-4 rounded-xl space-y-3 relative bg-transparent">
                      <button
                        type="button"
                        onClick={() => setCoreFeatures(coreFeatures.filter((_, i) => i !== fIdx))}
                        className="absolute top-3 right-3 text-zinc-600 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="sm:col-span-1">
                          <label className="block text-[9px] font-bold text-zinc-500 uppercase mb-1">Icon Symbol</label>
                          <input
                            type="text"
                            value={feat.icon}
                            onChange={(e) => {
                              const updated = [...coreFeatures];
                              updated[fIdx].icon = e.target.value;
                              setCoreFeatures(updated);
                            }}
                            className="w-full p-2 bg-zinc-950 border border-zinc-850 rounded-lg text-white font-mono text-center text-xs"
                            placeholder="E.g., ✓"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[9px] font-bold text-zinc-500 uppercase mb-1">Feature Title</label>
                          <input
                            type="text"
                            value={feat.title}
                            onChange={(e) => {
                              const updated = [...coreFeatures];
                              updated[fIdx].title = e.target.value;
                              setCoreFeatures(updated);
                            }}
                            className="w-full p-2 bg-zinc-950 border border-zinc-850 rounded-lg text-white text-xs font-bold font-sans"
                            placeholder="E.g., Responsive Design"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-zinc-500 uppercase mb-1">Capability Description</label>
                        <textarea
                          rows={2}
                          value={feat.description}
                          onChange={(e) => {
                            const updated = [...coreFeatures];
                            updated[fIdx].description = e.target.value;
                            setCoreFeatures(updated);
                          }}
                          className="w-full p-2 bg-zinc-950 border border-zinc-850 rounded-lg text-white text-[11px] resize-none font-sans"
                          placeholder="Briefly expand what makes this core feature outstanding..."
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* SECTION 5: Why Choose Us (Benefits) */}
            <div className="space-y-4 pt-4 border-t border-zinc-800/80">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#00aaff] font-extrabold flex items-center gap-1.5 font-sans">
                    <Layers size={14} className="text-[#00aaff]" />
                    <span>Part 5:</span> Why Choose Us Section
                  </h4>
                  <p className="text-zinc-500 text-[11px] mt-1">Benefit card blocks rendering on the product detailed views.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setBenefits([...benefits, { icon: '★', title: '', description: '' }])}
                  className="px-2.5 py-1.5 bg-zinc-900hover:bg-zinc-850 border border-zinc-800 text-[#00aaff] font-bold rounded-lg text-xs transition flex items-center gap-1"
                >
                  <Plus size={10} /> Add Benefit Card
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {benefits.length === 0 ? (
                  <div className="col-span-full py-4 text-zinc-500 text-xs italic">
                    No custom benefits specified. Graceful fallback cards are showing by default.
                  </div>
                ) : (
                  benefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="border border-zinc-850 p-4 rounded-xl space-y-3 relative flex flex-col justify-between bg-transparent">
                      <button
                        type="button"
                        onClick={() => setBenefits(benefits.filter((_, i) => i !== bIdx))}
                        className="absolute top-3 right-3 text-zinc-650 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                      
                      <div className="space-y-2">
                        <div>
                          <label className="block text-[9px] font-bold text-zinc-500 uppercase mb-1">Card Icon/Symbol</label>
                          <input
                            type="text"
                            value={benefit.icon}
                            onChange={(e) => {
                              const updated = [...benefits];
                              updated[bIdx].icon = e.target.value;
                              setBenefits(updated);
                            }}
                            className="w-12 p-1.5 bg-zinc-950 border border-zinc-850 rounded-lg text-white font-mono text-center text-xs"
                            placeholder="E.g. ★"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-zinc-500 uppercase mb-1">Benefit Header</label>
                          <input
                            type="text"
                            value={benefit.title}
                            onChange={(e) => {
                              const updated = [...benefits];
                              updated[bIdx].title = e.target.value;
                              setBenefits(updated);
                            }}
                            className="w-full p-2 bg-zinc-950 border border-zinc-850 rounded-lg text-white text-xs font-bold font-sans"
                            placeholder="E.g. Lifetime Support"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-zinc-500 uppercase mb-1">Elaboration</label>
                          <textarea
                            rows={2}
                            value={benefit.description}
                            onChange={(e) => {
                              const updated = [...benefits];
                              updated[bIdx].description = e.target.value;
                              setBenefits(updated);
                            }}
                            className="w-full p-2 bg-zinc-950 border border-zinc-850 rounded-lg text-white text-[11px] resize-none leading-normal font-sans"
                            placeholder="E.g. Receive lifetime upgrades for free..."
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* SECTION 6: Client Reviews */}
            <div className="space-y-4 pt-4 border-t border-zinc-800/80">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#00aaff] font-extrabold flex items-center gap-1.5 font-sans">
                    <Star size={14} className="text-[#00aaff]" />
                    <span>Part 6:</span> High-Polish Client Reviews
                  </h4>
                  <p className="text-zinc-500 text-[11px] mt-1">Configure client statements to auto-list as review cards.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setReviews([...reviews, { name: '', designation: '', review: '', rating: 5 }])}
                  className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-[#00aaff] font-bold rounded-lg text-xs transition flex items-center gap-1"
                >
                  <Plus size={10} /> Add Review Card
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.length === 0 ? (
                  <div className="col-span-full py-4 text-zinc-500 text-xs italic">
                    No custom buyer reviews drafted. Standard social proofs will render by default.
                  </div>
                ) : (
                  reviews.map((rev, rIdx) => (
                    <div key={rIdx} className="border border-zinc-850 p-4 rounded-xl space-y-3 relative font-sans bg-transparent">
                      <button
                        type="button"
                        onClick={() => setReviews(reviews.filter((_, i) => i !== rIdx))}
                        className="absolute top-3 right-3 text-zinc-650 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[9px] font-bold text-zinc-500 uppercase mb-1">Client Name</label>
                          <input
                            type="text"
                            value={rev.name}
                            onChange={(e) => {
                              const updated = [...reviews];
                              updated[rIdx].name = e.target.value;
                              setReviews(updated);
                            }}
                            className="w-full p-2 bg-zinc-950 border border-zinc-850 rounded-lg text-white font-bold text-xs"
                            placeholder="E.g. Tanvir Rahman"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-bold text-zinc-500 uppercase mb-1">Role / Designation</label>
                          <input
                            type="text"
                            value={rev.designation}
                            onChange={(e) => {
                              const updated = [...reviews];
                              updated[rIdx].designation = e.target.value;
                              setReviews(updated);
                            }}
                            className="w-full p-2 bg-zinc-950 border border-zinc-850 rounded-lg text-white text-xs whitespace-nowrap"
                            placeholder="E.g., Corporate CEO"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="sm:col-span-1">
                          <label className="block text-[9px] font-bold text-zinc-500 uppercase mb-1">Stars (1-5)</label>
                          <select
                            value={rev.rating}
                            onChange={(e) => {
                              const updated = [...reviews];
                              updated[rIdx].rating = parseInt(e.target.value) || 5;
                              setReviews(updated);
                            }}
                            className="w-full p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-xs select-none"
                          >
                            <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                            <option value="4">⭐⭐⭐⭐ (4)</option>
                            <option value="3">⭐⭐⭐ (3)</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[9px] font-bold text-zinc-500 uppercase mb-1 font-sans">Review Statement</label>
                          <textarea
                            rows={1}
                            value={rev.review}
                            onChange={(e) => {
                              const updated = [...reviews];
                              updated[rIdx].review = e.target.value;
                              setReviews(updated);
                            }}
                            className="w-full p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-xs resize-none"
                            placeholder="E.g. Fast, responsive, secure backend..."
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* Form actions Row */}
          <div className="pt-6 border-t border-zinc-800 flex justify-end gap-3 bg-transparent">
            <button 
              type="button"
              onClick={resetForm} 
              className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-white font-bold rounded-xl transition text-sm text-center"
            >
              Cancel
            </button>
            <button 
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-lg active:scale-95 text-sm"
            >
              <Save size={16} /> {editingProject ? 'Update Product & Plans' : 'Save Product'}
            </button>
          </div>
        </div>
      )}

      {/* Projects Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 && !showForm && (
          <div className="col-span-full py-24 bg-[#111] rounded-3xl border border-[#222] border-dashed text-center">
             <ImageIcon size={64} className="text-gray-800 mx-auto mb-4 animate-bounce" />
             <h3 className="text-xl font-bold text-gray-500">No products configured yet</h3>
             <button onClick={() => setShowForm(true)} className="mt-4 text-blue-500 font-bold hover:underline">Create First Product Option</button>
          </div>
        )}

        {projects.map((project, index) => {
          const isHidden = project.status === 'Hidden';
          const isFeatured = project.isFeatured !== false;

          // Quick toggle status directly from list view
          const handleToggleStatus = (pId: string) => {
            const updated = projects.map(p => 
              p.id === pId 
                ? { ...p, status: (p.status === 'Hidden' ? 'Active' : 'Hidden') as 'Active' | 'Hidden' } 
                : p
            );
            setProjects(updated);
            updateFeaturedProjects(updated);
          };

          // Quick toggle featured directly from list view
          const handleToggleFeatured = (pId: string) => {
            const updated = projects.map(p => 
              p.id === pId 
                ? { ...p, isFeatured: !p.isFeatured } 
                : p
            );
            setProjects(updated);
            updateFeaturedProjects(updated);
          };

          return (
            <div 
              key={project.id} 
              className={`bg-[#111] rounded-2xl border transition-all shadow-xl flex flex-col relative w-full overflow-hidden ${
                isHidden 
                  ? 'border-dashed border-red-500/20' 
                  : 'border-[#222] hover:border-[#00aaff]/40'
              }`}
            >
              <div className={`aspect-[16/10] relative overflow-hidden bg-zinc-950 transition-all ${isHidden ? 'opacity-50 grayscale' : ''}`}>
                {project.screenshot ? (
                  <img src={project.screenshot} alt={project.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a] text-gray-700">
                    <ImageIcon size={48} />
                  </div>
                )}

                {/* Top overlay badges */}
                <div className="absolute top-3 left-3 flex gap-1.5 z-10">
                  <span className="text-[9px] font-extrabold bg-[#00aaff]/10 border border-[#00aaff]/25 px-2 py-0.5 rounded text-[#00aaff] uppercase tracking-wider backdrop-blur-md">
                    {project.category || 'Digital Item'}
                  </span>
                </div>
              </div>

              {/* Top right actions overlay */}
              <div className="absolute top-3 right-3 flex gap-1.5 z-10">
                <button
                  onClick={() => handleToggleStatus(project.id)}
                  title="Click to toggle status"
                  className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-[#333] shadow-md transition-all active:scale-95 ${
                    isHidden 
                      ? 'bg-rose-950/80 hover:bg-rose-900/90 text-rose-400' 
                      : 'bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-400'
                  }`}
                >
                  {isHidden ? '🔴 Hidden' : '🟢 Live'}
                </button>

                <button
                  onClick={() => handleToggleFeatured(project.id)}
                  title="Click to toggle featured placement on Home"
                  className={`p-1 rounded-md border border-[#333] shadow-md transition-all active:scale-95 flex items-center justify-center ${
                    isFeatured
                      ? 'bg-amber-950/80 text-amber-400 hover:bg-amber-900/95'
                      : 'bg-zinc-950/80 text-zinc-650 hover:text-zinc-400'
                  }`}
                >
                  <Star size={10} fill={isFeatured ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="p-5 flex-grow flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-lg font-bold text-white truncate my-0 w-full">
                    {project.name}
                  </h3>
                  <span className="text-xs font-mono font-black text-[#00aaff] text-right px-1 pt-0.5 select-all shrink-0">
                    {project.plans && project.plans.length > 0 
                      ? project.plans[0].price 
                      : (project.price || '৳4,999')}
                  </span>
                </div>
                <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed mb-4 flex-grow">{project.description}</p>
                
                {/* Package Plans summary list indicator */}
                <div className="flex flex-wrap gap-1.5 mb-4 bg-zinc-950/80 p-2 rounded-xl border border-zinc-850">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest pt-0.5 px-1 shrink-0">Tiers:</span>
                  {project.plans && project.plans.length > 0 ? (
                    project.plans.map((p, pIdx) => (
                      <span key={p.id} className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                        p.status === 'Hidden'
                          ? 'bg-red-950/50 text-red-500 line-through'
                          : p.isFeatured
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-[#1a1a1a] text-zinc-300'
                      }`}>
                        {p.name} ({p.price})
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-zinc-500 italic pb-0.5">None. Standard pricing applies.</span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-zinc-400 text-xs mb-4 border-t border-zinc-800/80 pt-3">
                  <span className="flex items-center gap-1">
                    <Eye size={14} className="text-blue-400" />
                    <span>{project.views || 0}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart size={14} className="text-red-400" />
                    <span>{project.likes || 0}</span>
                  </span>
                  {project.highResTourLink && (
                    <span className="ml-auto text-[9px] uppercase font-bold tracking-wider text-emerald-450 bg-emerald-500/10 px-1.5 py-0.5 rounded-sm">
                      Tour Link Set
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleStartEdit(project)}
                    className="flex-1 py-2 bg-[#222] hover:bg-[#333] text-white font-bold rounded-lg transition text-xs"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="p-2 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white rounded-lg transition"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="flex gap-1 ml-auto">
                    <button onClick={() => moveProject(index, 'up')} className="p-1 px-2 bg-[#222] hover:bg-[#333] text-white rounded disabled:opacity-30" disabled={index === 0}>
                      <ChevronUp size={14} />
                    </button>
                    <button onClick={() => moveProject(index, 'down')} className="p-1 px-2 bg-[#222] hover:bg-[#333] text-white rounded disabled:opacity-30" disabled={index === projects.length - 1}>
                      <ChevronDown size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
