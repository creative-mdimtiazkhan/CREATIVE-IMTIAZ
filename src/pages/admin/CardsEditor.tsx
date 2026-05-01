import React, { useState, useRef } from 'react';
import { HomeCard, useAppContext } from '../../context/AppContext';
import { Trash2, Save, ImageIcon, ChevronUp, ChevronDown } from 'lucide-react';

export default function CardsEditor() {
  const { state, updateHomeCards } = useAppContext();
  const [cards, setCards] = useState<HomeCard[]>(state.homeCards || []);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const newCard: HomeCard = {
          id: Date.now().toString(),
          imageUrl: reader.result as string
        };
        const newCards = [...cards, newCard];
        setCards(newCards);
        // Automatically update context as well, so preview works immediately
        updateHomeCards(newCards);
      };
      reader.readAsDataURL(file);
    }
    // reset input so the same image can be added again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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

  const handleSaveBtnClick = () => {
    updateHomeCards(cards);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#111] p-6 rounded-2xl border border-[#222]">
        <div>
          <h2 className="text-2xl font-bold">Card Manager</h2>
          <p className="text-gray-500 text-sm mt-1">Manage simple image cards displayed at the bottom of your home page</p>
        </div>
        <button 
          onClick={handleSaveBtnClick}
          className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-lg"
        >
          <Save size={20} /> Save Cards
        </button>
      </div>

      {success && (
        <div className="bg-green-500/10 border border-green-500/50 text-green-500 text-sm p-4 rounded-xl animate-in fade-in">
          Cards saved successfully! They will persist on reload and show on the homepage.
        </div>
      )}

      {/* Grid Layout */}
      <div className="flex flex-wrap gap-6">
        {cards.map((card, index) => (
          <div key={card.id} className="w-[300px] h-[180px] bg-[#111] rounded-[10px] overflow-hidden group hover:shadow-xl hover:shadow-blue-500/10 transition-all flex flex-col relative border border-[#222]">
            {card.imageUrl ? (
              <img src={card.imageUrl} alt="Card Preview" className="w-[300px] h-[180px] object-cover" />
            ) : (
              <div className="w-[300px] h-[180px] flex items-center justify-center bg-[#1a1a1a] text-gray-700">
                <ImageIcon size={48} />
              </div>
            )}
            
            {/* Overlay Info on Hover */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
              <div className="flex gap-2">
                <button 
                  onClick={() => handleDelete(card.id)}
                  className="flex-1 p-2 bg-red-600 hover:bg-red-700 text-white font-bold text-center rounded-lg transition"
                >
                  <Trash2 size={16} className="mx-auto" />
                </button>
                <div className="flex gap-1 ml-auto">
                  <button onClick={() => moveCard(index, 'up')} className="p-2 bg-[#222] hover:bg-[#333] text-white rounded-lg disabled:opacity-50" disabled={index === 0}>
                    <ChevronUp size={16} />
                  </button>
                  <button onClick={() => moveCard(index, 'down')} className="p-2 bg-[#222] hover:bg-[#333] text-white rounded-lg disabled:opacity-50" disabled={index === cards.length - 1}>
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Button */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-[300px] h-[180px] rounded-[10px] border-2 border-dashed border-[#aaa] hover:border-black hover:text-black dark:border-[#333] dark:hover:border-white dark:hover:text-white bg-[#eee] dark:bg-[#111] flex justify-center items-center cursor-pointer transition-all text-[40px] text-[#777]"
        >
          <span>+</span>
        </div>
      </div>
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        className="hidden" 
        accept="image/*" 
      />
    </div>
  );
}
