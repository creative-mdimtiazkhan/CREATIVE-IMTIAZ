import React, { useState, useRef } from 'react';
import { HomeCard, useAppContext } from '../../context/AppContext';
import { Plus, Trash2, Save, Image as ImageIcon, X, Edit2, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';

export default function CardsEditor() {
  const { state, updateHomeCards } = useAppContext();
  const [cards, setCards] = useState<HomeCard[]>(state.homeCards || []);
  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState<HomeCard | null>(null);
  const [currentCard, setCurrentCard] = useState<Omit<HomeCard, 'id'>>({
    title: '',
    description: '',
    imageUrl: '',
    buttonText: '',
    buttonLink: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [success, setSuccess] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentCard({ ...currentCard, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!currentCard.title || !currentCard.description) {
      alert('Title and Description are required');
      return;
    }

    let updatedCards: HomeCard[];
    if (editingCard) {
      updatedCards = cards.map(c => c.id === editingCard.id ? { ...currentCard, id: c.id } : c);
    } else {
      updatedCards = [...cards, { ...currentCard, id: Date.now().toString() }];
    }

    setCards(updatedCards);
    updateHomeCards(updatedCards);
    setSuccess(true);
    resetForm();
    setTimeout(() => setSuccess(false), 3000);
  };

  const resetForm = () => {
    setCurrentCard({
      title: '',
      description: '',
      imageUrl: '',
      buttonText: '',
      buttonLink: ''
    });
    setEditingCard(null);
    setShowForm(false);
  };

  const handleEdit = (card: HomeCard) => {
    setEditingCard(card);
    setCurrentCard(card);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this card?')) {
      const updated = cards.filter(c => c.id !== id);
      setCards(updated);
      updateHomeCards(updated);
    }
  };

  const moveCard = (index: number, direction: 'up' | 'down') => {
    const newCards = [...cards];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newCards.length) return;
    
    [newCards[index], newCards[targetIndex]] = [newCards[targetIndex], newCards[index]];
    setCards(newCards);
    updateHomeCards(newCards);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center bg-[#111] p-6 rounded-2xl border border-[#222]">
        <div>
          <h2 className="text-2xl font-bold">Card Manager</h2>
          <p className="text-gray-500 text-sm mt-1">Manage feature cards displayed on your home page</p>
        </div>
      </div>

      {success && (
        <div className="bg-green-500/10 border border-green-500/50 text-green-500 text-sm p-4 rounded-xl animate-in fade-in">
          Changes saved successfully!
        </div>
      )}

      {showForm && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
          {/* Form */}
          <div className="bg-[#111] rounded-2xl border border-[#222] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-[#222] flex justify-between items-center bg-[#1a1a1a]">
              <h3 className="text-lg font-bold">{editingCard ? 'Edit Card' : 'New Card Details'}</h3>
              <button onClick={resetForm} className="text-gray-400 hover:text-white p-2">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Card Title</label>
                  <input 
                    type="text"
                    value={currentCard.title}
                    onChange={(e) => setCurrentCard({ ...currentCard, title: e.target.value })}
                    className="w-full p-4 bg-[#1a1a1a] border border-[#333] rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white font-bold"
                    placeholder="E.g. Fast Performance"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                  <textarea 
                    rows={4}
                    value={currentCard.description}
                    onChange={(e) => setCurrentCard({ ...currentCard, description: e.target.value })}
                    className="w-full p-4 bg-[#1a1a1a] border border-[#333] rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white resize-none"
                    placeholder="A brief explanation of this feature..."
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Button Text (Optional)</label>
                    <input 
                      type="text"
                      value={currentCard.buttonText}
                      onChange={(e) => setCurrentCard({ ...currentCard, buttonText: e.target.value })}
                      className="w-full p-4 bg-[#1a1a1a] border border-[#333] rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white"
                      placeholder="E.g. Learn More"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Button Link (Optional)</label>
                    <input 
                      type="text"
                      value={currentCard.buttonLink}
                      onChange={(e) => setCurrentCard({ ...currentCard, buttonLink: e.target.value })}
                      className="w-full p-4 bg-[#1a1a1a] border border-[#333] rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white"
                      placeholder="E.g. #projects or /contact"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Icon / Image</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full aspect-video bg-[#1a1a1a] border-2 border-dashed border-[#333] hover:border-blue-500 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all group overflow-hidden"
                  >
                    {currentCard.imageUrl ? (
                      <img src={currentCard.imageUrl} alt="Preview" className="w-full h-full object-contain" />
                    ) : (
                      <>
                        <ImageIcon size={48} className="text-gray-700 group-hover:text-blue-500 transition-colors mb-2" />
                        <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">Click to upload image</span>
                      </>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#1a1a1a] border-t border-[#222] flex justify-end gap-3">
              <button onClick={resetForm} className="px-6 py-3 bg-[#222] hover:bg-[#333] text-white font-bold rounded-xl transition">
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-lg"
              >
                <Save size={20} /> {editingCard ? 'Update Card' : 'Save Card'}
              </button>
            </div>
          </div>

          {/* Live Preview */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest ml-1">Live Preview</h3>
            <div className="flex items-center justify-center p-12 bg-zinc-950 rounded-3xl border border-zinc-900 shadow-inner">
               <div className="bg-[#111] p-8 rounded-3xl border border-[#222] shadow-2xl max-w-sm w-full group transition-all hover:scale-[1.02]">
                  <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-600 transition-all group-hover:text-white">
                    {currentCard.imageUrl ? (
                      <img src={currentCard.imageUrl} alt="preview" className="w-10 h-10 object-contain" />
                    ) : (
                      <Plus size={32} />
                    )}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3">{currentCard.title || 'Card Title'}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8">
                    {currentCard.description || 'This is where your card description will appear. Talk about your feature or service here.'}
                  </p>
                  {currentCard.buttonText && (
                    <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-600/20">
                      {currentCard.buttonText}
                      <ExternalLink size={14} />
                    </div>
                  )}
               </div>
            </div>
            <p className="text-center text-[10px] text-gray-600 uppercase font-black tracking-tighter">This is how it will look on your home page</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-6">
        {/* Cards List */}
        {cards.map((card, index) => (
          <div key={card.id} className="w-[300px] h-[180px] bg-[#111] rounded-xl border border-[#222] overflow-hidden group hover:border-blue-500/30 transition-all shadow-xl flex flex-col relative">
            {card.imageUrl ? (
              <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a] text-gray-700">
                <ImageIcon size={48} />
              </div>
            )}
            
            {/* Overlay Info on Hover */}
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white truncate">{card.title}</h3>
                <p className="text-gray-400 text-xs line-clamp-2 mt-1">{card.description}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(card)}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition text-xs"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(card.id)}
                  className="p-2 bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white rounded-lg transition"
                >
                  <Trash2 size={16} />
                </button>
                <div className="flex flex-col gap-1 ml-auto">
                  <button onClick={() => moveCard(index, 'up')} className="text-gray-400 hover:text-white disabled:opacity-0" disabled={index === 0}>
                    <ChevronUp size={16} />
                  </button>
                  <button onClick={() => moveCard(index, 'down')} className="text-gray-400 hover:text-white disabled:opacity-0" disabled={index === cards.length - 1}>
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* ADD CARD BOX (From Request) */}
        {!showForm && (
          <div 
            onClick={() => {
              setShowForm(true);
              setTimeout(() => fileInputRef.current?.click(), 100);
            }}
            className="w-[300px] h-[180px] rounded-xl border-2 border-dashed border-[#aaa] hover:border-black hover:text-black dark:border-[#333] dark:hover:border-white dark:hover:text-white bg-[#eee] dark:bg-[#111] flex justify-center items-center cursor-pointer transition-all text-4xl text-[#777]"
          >
            <span>+</span>
          </div>
        )}
      </div>
    </div>
  );
}

function CreditCardIcon({ size, className = "" }: { size: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}
