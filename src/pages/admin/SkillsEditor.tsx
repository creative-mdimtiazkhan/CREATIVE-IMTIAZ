import { useState } from 'react';
import { Skill, useAppContext } from '../../context/AppContext';
import { Save, Plus, Trash2, Edit2, Check, X } from 'lucide-react';

export default function SkillsEditor() {
  const { state, updateSkills } = useAppContext();
  const [skills, setSkills] = useState<Skill[]>(state.skills || []);
  const [success, setSuccess] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      title: 'New Skill',
      level: 'Beginner',
      description: 'Skill description',
      visible: true
    };
    setSkills([newSkill, ...skills]);
    setEditingId(newSkill.id); // Open in edit mode immediately
  };

  const handleUpdateSkill = (id: string, field: keyof Skill, value: any) => {
    setSkills(skills.map(skill => skill.id === id ? { ...skill, [field]: value } : skill));
  };

  const handleDeleteSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const handleSubmit = () => {
    updateSkills(skills);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-[#111] rounded-2xl border border-[#222] p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">My Skills</h2>
          <button 
            onClick={handleAddSkill}
            className="flex items-center gap-2 px-4 py-2 bg-[#00aaff] hover:bg-[#0088cc] text-white rounded-lg transition text-sm font-bold"
          >
            <Plus size={16} /> Add Skill
          </button>
        </div>
        
        {success && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-500 text-sm p-3 rounded-xl mb-6">
            Skills updated successfully!
          </div>
        )}

        <div className="space-y-4 mb-8">
          {skills.length === 0 ? (
            <p className="text-center py-6 text-gray-500">No skills added yet.</p>
          ) : (
            skills.map((skill) => (
              <div key={skill.id} className="bg-[#1e1e1e] p-5 rounded-xl border border-[#333] shadow-md transition-all hover:bg-[#222]">
                
                {editingId === skill.id ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Skill Name</label>
                        <input 
                          type="text" 
                          value={skill.title}
                          onChange={(e) => handleUpdateSkill(skill.id, 'title', e.target.value)}
                          className="w-full p-3 bg-[#111] border border-[#444] rounded-lg focus:ring-2 focus:ring-[#00aaff] focus:border-transparent outline-none transition text-white" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Level</label>
                        <select 
                          value={skill.level}
                          onChange={(e) => handleUpdateSkill(skill.id, 'level', e.target.value)}
                          className="w-full p-3 bg-[#111] border border-[#444] rounded-lg focus:ring-2 focus:ring-[#00aaff] focus:border-transparent outline-none transition text-white appearance-none"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
                      <input 
                        type="text" 
                        value={skill.description}
                        onChange={(e) => handleUpdateSkill(skill.id, 'description', e.target.value)}
                        className="w-full p-3 bg-[#111] border border-[#444] rounded-lg focus:ring-2 focus:ring-[#00aaff] focus:border-transparent outline-none transition text-white" 
                      />
                    </div>
                    <div className="flex justify-end pt-2 border-t border-[#333]">
                      <button 
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 text-sm font-medium transition"
                      >
                        <Check size={16} /> Done
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-white m-0">{skill.title}</h3>
                        <span className="text-xs font-semibold px-2 py-1 bg-[#00aaff]/10 text-[#00aaff] rounded-md">{skill.level}</span>
                      </div>
                      <p className="text-gray-400 text-sm m-0">{skill.description}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <label className="flex items-center cursor-pointer gap-2 mr-2">
                        <input 
                          type="checkbox" 
                          checked={skill.visible}
                          onChange={(e) => handleUpdateSkill(skill.id, 'visible', e.target.checked)}
                          className="w-4 h-4 rounded text-[#00aaff] focus:ring-[#00aaff] bg-gray-700 border-gray-600"
                        />
                        <span className="text-xs text-gray-400">Visible</span>
                      </label>
                      <button 
                        onClick={() => setEditingId(skill.id)}
                        className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition"
                        title="Edit Skill"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition"
                        title="Delete Skill"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="pt-4 border-t border-[#222]">
          <button 
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-[#00aaff] hover:bg-[#0088cc] text-white font-bold rounded-xl transition shadow-lg"
          >
            <Save size={20} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
