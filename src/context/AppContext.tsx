import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export interface ClientMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  date: string;
}

export interface Skill {
  id: string;
  title: string;
  level: string;
  description: string;
  visible: boolean;
}

export interface ProjectImage {
  id: string;
  desktop: string;
  mobile: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  regularPrice: string;
  discountPrice: string;
  images: ProjectImage[];
}

export interface HomeCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
}

export interface AppState {
  isAdmin: boolean;
  profile: {
    imageUrl: string;
    name: string;
    bio: string;
    workType: string;
  };
  about: string;
  contact: {
    gmail: string;
    phone: string;
    whatsapp: string;
  };
  socialLinks: SocialLink[];
  messages: ClientMessage[];
  skills: Skill[];
  projects: Project[];
  homeCards: HomeCard[];
}

const defaultState: AppState = {
  isAdmin: false,
  profile: {
    imageUrl: '',
    name: 'MD IMTIAZ KHAN',
    bio: 'Passionate developer building modern websites, eCommerce platforms, and digital solutions.',
    workType: 'Web Developer'
  },
  about: 'I am a highly motivated web developer with expertise in creating dynamic, responsive, and user-friendly websites. I specialize in both front-end and back-end development, ensuring seamless performance across all devices.\n\nMy focus is on delivering clean code, modern designs, and great user experiences.',
  contact: {
    gmail: 'mdimtiazkhan560@gmail.com',
    phone: '+880 1xxxxxxxxx',
    whatsapp: '+880 1xxxxxxxxx'
  },
  socialLinks: [
    { id: '1', platform: 'Facebook', url: '#' },
    { id: '2', platform: 'YouTube', url: '#' }
  ],
  messages: [],
  skills: [
    {
      id: '1',
      title: 'HTML & CSS',
      level: 'Expert',
      description: 'Clean, semantic, and responsive design',
      visible: true
    },
    {
      id: '2',
      title: 'React.js',
      level: 'Advanced',
      description: 'Building modern and fast single-page applications',
      visible: true
    }
  ],
  projects: [],
  homeCards: []
};

interface AppContextType {
  state: AppState;
  loginState: (isAdmin: boolean) => void;
  updateProfile: (profile: AppState['profile']) => void;
  updateAbout: (about: string) => void;
  updateContact: (contact: AppState['contact']) => void;
  updateSocialLinks: (links: SocialLink[]) => void;
  addMessage: (msg: Omit<ClientMessage, 'id' | 'date'>) => void;
  updateSkills: (skills: Skill[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateHomeCards: (cards: HomeCard[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('portfolioData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultState, ...parsed };
      } catch (e) {
        console.error('Failed to parse local storage data');
      }
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(state));
  }, [state]);

  const loginState = (isAdmin: boolean) => setState(prev => ({ ...prev, isAdmin }));
  const updateProfile = (profile: AppState['profile']) => setState(prev => ({ ...prev, profile }));
  const updateAbout = (about: string) => setState(prev => ({ ...prev, about }));
  const updateContact = (contact: AppState['contact']) => setState(prev => ({ ...prev, contact }));
  const updateSocialLinks = (socialLinks: SocialLink[]) => setState(prev => ({ ...prev, socialLinks }));
  
  const updateSkills = (skills: Skill[]) => setState(prev => ({ ...prev, skills }));
  const updateProjects = (projects: Project[]) => setState(prev => ({ ...prev, projects }));
  const updateHomeCards = (homeCards: HomeCard[]) => setState(prev => ({ ...prev, homeCards }));

  const addMessage = (msg: Omit<ClientMessage, 'id' | 'date'>) => {
    const newMessage: ClientMessage = {
      ...msg,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
    };
    setState(prev => ({ ...prev, messages: [newMessage, ...(prev.messages || [])] }));
  };

  return (
    <AppContext.Provider value={{ state, loginState, updateProfile, updateAbout, updateContact, updateSocialLinks, addMessage, updateSkills, updateProjects, updateHomeCards }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
