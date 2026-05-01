import React, { useState, useRef } from 'react';
import { Project, ProjectImage, useAppContext } from '../../context/AppContext';
import { Plus, Trash2, Save, Image as ImageIcon, Monitor, Smartphone, X, ChevronRight } from 'lucide-react';

export default function ProjectsEditor() {
  const { state, updateProjects } = useAppContext();
  const [projects, setProjects] = useState<Project[]>(state.projects || []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [currentProject, setCurrentProject] = useState<Omit<Project, 'id'>>({
    name: '',
    description: '',
    regularPrice: '',
    discountPrice: '',
    images: []
  });

  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'desktop' | 'mobile') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      
      // If it's a new project or editing existing
      if (type === 'desktop') {
        // Find if there's an image item without desktop but has mobile, or just create new
        const lastImage = currentProject.images[currentProject.images.length - 1];
        if (lastImage && !lastImage.desktop) {
           const updatedImages = [...currentProject.images];
           updatedImages[updatedImages.length - 1] = { ...lastImage, desktop: base64 };
           setCurrentProject({ ...currentProject, images: updatedImages });
        } else {
           const newImg: ProjectImage = {
             id: Date.now().toString(),
             desktop: base64,
             mobile: ''
           };
           setCurrentProject({ ...currentProject, images: [...currentProject.images, newImg] });
        }
      } else {
        const lastImage = currentProject.images[currentProject.images.length - 1];
        if (lastImage && !lastImage.mobile) {
           const updatedImages = [...currentProject.images];
           updatedImages[updatedImages.length - 1] = { ...lastImage, mobile: base64 };
           setCurrentProject({ ...currentProject, images: updatedImages });
        } else {
           const newImg: ProjectImage = {
             id: Date.now().toString(),
             desktop: '',
             mobile: base64
           };
           setCurrentProject({ ...currentProject, images: [...currentProject.images, newImg] });
        }
      }
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (id: string) => {
    setCurrentProject({
      ...currentProject,
      images: currentProject.images.filter(img => img.id !== id)
    });
  };

  const handleSaveProject = () => {
    if (!currentProject.name || !currentProject.description) {
      alert('Name and Description are required');
      return;
    }

    let updatedProjects: Project[];
    if (editingProject) {
      updatedProjects = projects.map(p => p.id === editingProject.id ? { ...currentProject, id: p.id } : p);
    } else {
      updatedProjects = [{ ...currentProject, id: Date.now().toString() }, ...projects];
    }

    setProjects(updatedProjects);
    updateProjects(updatedProjects);
    resetForm();
  };

  const resetForm = () => {
    setCurrentProject({
      name: '',
      description: '',
      regularPrice: '',
      discountPrice: '',
      images: []
    });
    setEditingProject(null);
    setShowAddForm(false);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setCurrentProject(project);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      updateProjects(updated);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center bg-[#111] p-6 rounded-2xl border border-[#222]">
        <div>
          <h2 className="text-2xl font-bold">Project Management</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your dynamic projects portfolio</p>
        </div>
        {!showAddForm && (
          <button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-lg"
          >
            <Plus size={20} /> Add Project
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="bg-[#111] rounded-2xl border border-[#222] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="p-6 border-b border-[#222] flex justify-between items-center bg-[#1a1a1a]">
            <h3 className="text-lg font-bold">{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
            <button onClick={resetForm} className="text-gray-400 hover:text-white p-2">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Project Name</label>
                  <input 
                    type="text"
                    value={currentProject.name}
                    onChange={(e) => setCurrentProject({ ...currentProject, name: e.target.value })}
                    className="w-full p-4 bg-[#1a1a1a] border border-[#333] rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white font-medium"
                    placeholder="E.g. eCommerce Website"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Regular Price</label>
                    <input 
                      type="text"
                      value={currentProject.regularPrice}
                      onChange={(e) => setCurrentProject({ ...currentProject, regularPrice: e.target.value })}
                      className="w-full p-4 bg-[#1a1a1a] border border-[#333] rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white"
                      placeholder="৳5000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Discount Price</label>
                    <input 
                      type="text"
                      value={currentProject.discountPrice}
                      onChange={(e) => setCurrentProject({ ...currentProject, discountPrice: e.target.value })}
                      className="w-full p-4 bg-[#1a1a1a] border border-[#333] rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white text-blue-400 font-bold"
                      placeholder="৳2999"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea 
                  rows={6}
                  value={currentProject.description}
                  onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                  className="w-full p-4 bg-[#1a1a1a] border border-[#333] rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white resize-none"
                  placeholder="Describe the technical details, features and value of this project..."
                />
              </div>
            </div>

            <div className="pt-6 border-t border-[#222]">
              <h4 className="text-sm font-bold text-gray-400 mb-4 flex items-center gap-2">
                <ImageIcon size={18} /> Project Gallery (Desktop & Mobile Images)
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProject.images.map((img) => (
                  <div key={img.id} className="relative group bg-[#1a1a1a] border border-[#333] rounded-2xl overflow-hidden p-2 space-y-2 shadow-inner">
                    <button 
                      onClick={() => removeImage(img.id)}
                      className="absolute top-4 right-4 z-10 bg-red-600 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <Trash2 size={14} />
                    </button>
                    
                    <div className="space-y-2">
                      <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center border border-[#222]">
                        {img.desktop ? (
                          <img src={img.desktop} alt="Desktop" className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-gray-600 flex flex-col items-center">
                            <Monitor size={24} />
                            <span className="text-[10px] mt-1 uppercase font-bold tracking-wider">Desktop</span>
                          </div>
                        )}
                      </div>
                      <div className="aspect-[9/16] h-32 mx-auto bg-black rounded-lg overflow-hidden flex items-center justify-center border border-[#222]">
                        {img.mobile ? (
                          <img src={img.mobile} alt="Mobile" className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-gray-600 flex flex-col items-center">
                            <Smartphone size={24} />
                            <span className="text-[10px] mt-1 uppercase font-bold tracking-wider">Mobile</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="space-y-4">
                   <div 
                    onClick={() => desktopInputRef.current?.click()}
                    className="aspect-video bg-[#1a1a1a] border-2 border-dashed border-[#333] hover:border-blue-500 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all group p-4"
                  >
                    <div className="w-10 h-10 bg-[#222] group-hover:bg-blue-600/20 rounded-full flex items-center justify-center text-gray-500 group-hover:text-blue-500 transition-colors mb-2">
                      <Monitor size={20} />
                    </div>
                    <span className="text-xs font-bold text-gray-500 group-hover:text-blue-500">+ Desktop Image</span>
                    <input type="file" ref={desktopInputRef} onChange={(e) => handleImageUpload(e, 'desktop')} className="hidden" accept="image/*" />
                  </div>

                  <div 
                    onClick={() => mobileInputRef.current?.click()}
                    className="aspect-video bg-[#1a1a1a] border-2 border-dashed border-[#333] hover:border-blue-500 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all group p-4"
                  >
                    <div className="w-10 h-10 bg-[#222] group-hover:bg-blue-600/20 rounded-full flex items-center justify-center text-gray-500 group-hover:text-blue-500 transition-colors mb-2">
                      <Smartphone size={20} />
                    </div>
                    <span className="text-xs font-bold text-gray-500 group-hover:text-blue-500">+ Mobile Image</span>
                    <input type="file" ref={mobileInputRef} onChange={(e) => handleImageUpload(e, 'mobile')} className="hidden" accept="image/*" />
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-gray-500 mt-4 italic">* Tip: Add Desktop first then Mobile for professional gallery view.</p>
            </div>
          </div>

          <div className="p-6 bg-[#1a1a1a] border-t border-[#222] flex justify-end gap-3">
            <button onClick={resetForm} className="px-6 py-3 bg-[#222] hover:bg-[#333] text-white font-bold rounded-xl transition">
              Cancel
            </button>
            <button 
              onClick={handleSaveProject}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-lg"
            >
              <Save size={20} /> {editingProject ? 'Update Project' : 'Save Project'}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 && !showAddForm && (
          <div className="col-span-full py-20 bg-[#111] rounded-3xl border border-[#222] border-dashed text-center">
            <Briefcase size={64} className="text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-500">No Projects Yet</h3>
            <p className="text-gray-600 text-sm mt-2">Start by adding your first dynamic project</p>
            <button onClick={() => setShowAddForm(true)} className="mt-6 text-blue-500 hover:underline font-bold">Add One Now</button>
          </div>
        )}
        
        {projects.map((project) => (
          <div key={project.id} className="bg-[#111] rounded-3xl border border-[#222] overflow-hidden group hover:border-blue-500/50 transition-all shadow-xl">
            <div className="aspect-video bg-[#1a1a1a] relative overflow-hidden">
               {project.images.length > 0 ? (
                 <img src={project.images[0].desktop || project.images[0].mobile} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-gray-700">
                    <ImageIcon size={48} />
                 </div>
               )}
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
               <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-400 mb-1">
                     <Monitor size={12} />
                     <span>{project.images.length} Dynamic Views</span>
                  </div>
                  <h3 className="text-lg font-bold text-white truncate">{project.name}</h3>
               </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-blue-400 font-bold text-xl">{project.discountPrice || 'N/A'}</span>
                  {project.regularPrice && <span className="text-gray-500 text-sm line-through">{project.regularPrice}</span>}
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(project)}
                  className="flex-1 py-3 bg-[#1a1a1a] hover:bg-[#222] text-white font-bold rounded-xl border border-[#333] transition"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(project.id)}
                  className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition border border-transparent hover:border-red-500/20"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Briefcase({ size, className = "" }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
