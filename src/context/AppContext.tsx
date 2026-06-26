import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

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
  imageUrl: string;
}

export interface ProductPlan {
  id: string;
  name: string; // e.g., "STD", "PRO", "DEV"
  price: string; // e.g., "৳4,999"
  buttonText?: string; // e.g., "Order Standard"
  features: string[]; // custom list of features
  status?: 'Active' | 'Hidden';
  isFeatured?: boolean; // Most Popular
}

export interface FeaturedProject {
  id: string;
  name: string;
  description: string;
  screenshot: string; // Base64 or URL
  liveLink: string;
  price?: string; // e.g. "৳4,999" (legacy or default value)
  regularPrice?: string; // e.g. "৳6,000"
  discountPrice?: string; // e.g. "৳4,999"
  category?: string; // category tag, e.g. "E-Commerce"
  features?: string[]; // e.g. ["Responsive Design", "Fast Loading"]
  orderLink?: string; // custom link or whatsapp template
  views: number;
  likes: number;
  highResTourLink?: string;
  gallery?: string[];
  status?: 'Active' | 'Hidden';
  isFeatured?: boolean;
  plans?: ProductPlan[];
  rating?: number;
  technologies?: string[];
  coreFeatures?: { title: string; description: string; icon: string }[];
  benefits?: { icon: string; title: string; description: string }[];
  reviews?: { name: string; designation: string; review: string; rating: number }[];
}

export interface AppOrder {
  id: string; // e.g. "#ORD-123456"
  productId: string;
  productName: string;
  productPrice: string;
  productScreenshot?: string;
  fullName: string;
  email: string;
  phone: string;
  paymentMethod: string; // "bKash" | "Nagad" | "Rocket"
  transactionId: string;
  companyName?: string;
  whatsappNumber?: string;
  additionalNotes?: string;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  createdAt: string;
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
  featuredProjects: FeaturedProject[];
  orders?: AppOrder[];
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
  homeCards: [],
  featuredProjects: [
    {
      id: 'default-1',
      name: 'Premium Website Package',
      description: 'E-Commerce Website Modern Online Store with Admin Panel. Fully customized shopping experience, user authentication, inventory management, dynamic filtering, and integration with modern payment gateways.',
      screenshot: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
      liveLink: '#',
      highResTourLink: '',
      price: '৳4,999',
      regularPrice: '৳6,000',
      discountPrice: '৳4,999',
      category: 'E-Commerce',
      features: ['Responsive Design', 'Fast Loading', 'Secure System'],
      orderLink: 'https://wa.me/8801700000000?text=Hi!%2520I%2520want%2520to%2520order%2520the%2520Premium%252520Website%252520Package%252525',
      views: 1210,
      likes: 350,
      gallery: [],
      status: 'Active',
      isFeatured: true,
      rating: 5,
      technologies: ['React', 'Vite', 'Tailwind', 'Node.js', 'MongoDB'],
      coreFeatures: [
        { title: 'Responsive Design', description: 'Looks pixels perfect on smartphones, tablets, laptops and large desktop monitors.', icon: 'Layout' },
        { title: 'Fast Loading', description: 'Guarantees sub-second render times, optimized bundles and lightweight code structure.', icon: 'Zap' },
        { title: 'Secure System', description: 'Equipped with end-to-end data encryption, JWT token authorization and state security.', icon: 'Shield' }
      ],
      benefits: [
        { icon: 'Laptop', title: 'Modern Clean Design', description: 'Sleek, eye-safe twilight aesthetic crafted by professional designers.' },
        { icon: 'Lock', title: 'Data Privacy Guard', description: 'Strict local or dynamic storage policies keeping user records safe.' }
      ],
      reviews: [
        { name: 'Arif Rahman', designation: 'Founder, BDShop', review: 'This e-commerce template works brilliantly! The checkout integration is fast and clean.', rating: 5 },
        { name: 'Mariam Begum', designation: 'Product Specialist', review: 'A solid standard of codebase, highly commented and easy to extend.', rating: 5 }
      ],
      plans: [
        {
          id: 'plan-1-std',
          name: 'STD',
          price: '৳4,999',
          buttonText: 'Order STD Package',
          features: ['Full Source Code', 'Domain Configuration', 'WhatsApp Support', 'Responsive Design', 'Fast Loading'],
          status: 'Active',
          isFeatured: false
        },
        {
          id: 'plan-1-pro',
          name: 'PRO',
          price: '৳7,999',
          buttonText: 'Order PRO Package',
          features: ['Premium Dashboard', 'Priority Support', 'SEO Setup', 'Full Source Code', 'Domain Configuration', 'WhatsApp Support', 'Hosting Setup', 'Custom Dashboard'],
          status: 'Active',
          isFeatured: true
        },
        {
          id: 'plan-1-dev',
          name: 'DEV',
          price: '৳12,999',
          buttonText: 'Order DEV Package',
          features: ['Full Developer Access', 'Database Package', 'API Integration', 'Premium Dashboard', 'Priority Support', 'SEO Setup', 'Full Source Code', 'Domain Configuration', 'WhatsApp Support', 'Hosting Setup', 'Custom Dashboard', 'Unlimited Revisions'],
          status: 'Active',
          isFeatured: false
        }
      ]
    },
    {
      id: 'default-2',
      name: 'Agency Website Template',
      description: 'Professional Business Portfolio Website designed for startups, freelancers, and creative design agencies. Featuring animated micro-interactions, dark aesthetic mode, and lightweight code.',
      screenshot: 'https://images.unsplash.com/photo-1541462608141-2ff580ee0a3b?q=80&w=600&auto=format&fit=crop',
      liveLink: '#',
      highResTourLink: '',
      price: '৳2,999',
      regularPrice: '৳4,500',
      discountPrice: '৳2,999',
      category: 'Agency',
      features: ['Mobile Friendly', 'Modern UI Design', 'SEO Optimized'],
      orderLink: 'https://wa.me/8801700000000?text=Hi!%2520I%2520want%2520to%2520order%2520the%2520Agency%252520Website%252520Template%252525',
      views: 940,
      likes: 182,
      gallery: [],
      status: 'Active',
      isFeatured: true,
      rating: 4.8,
      technologies: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
      coreFeatures: [
        { title: 'Mobile Friendly', description: 'Engineered from mobile-first principles with lightweight responsive viewport components.', icon: 'Smartphone' },
        { title: 'Modern UI Design', description: 'Features fluid dark/twilight styles with premium glassmorphic cards and glowing lines.', icon: 'Sparkles' },
        { title: 'SEO Optimized', description: 'Pre-rendered headings with semantic tags to help rank higher on search engines easily.', icon: 'Search' }
      ],
      benefits: [
        { icon: 'Heart', title: 'Client Satisfaction', description: 'Polished client presentation layouts ensuring immediate brand trust.' },
        { icon: 'Star', title: 'Dynamic Customization', description: 'Flexible layouts allow replacing content or themes within minutes.' }
      ],
      reviews: [
        { name: 'Sabbir Ahmed', designation: 'Creative Director', review: 'Amazing agency look, clients absolutely love it. Animations are smooth and reliable.', rating: 5 }
      ],
      plans: [
        {
          id: 'plan-2-std',
          name: 'STD',
          price: '৳2,999',
          buttonText: 'Order STD Pack',
          features: ['Mobile Friendly', 'Modern UI Design', 'SEO Optimized', '1 Business Day Delivery'],
          status: 'Active',
          isFeatured: false
        },
        {
          id: 'plan-2-pro',
          name: 'PRO',
          price: '৳4,999',
          buttonText: 'Order PRO Pack',
          features: ['Mobile Friendly', 'Modern UI Design', 'SEO Optimized', '3 Business Day Delivery', 'Premium Customizations', 'WhatsApp Support'],
          status: 'Active',
          isFeatured: true
        },
        {
          id: 'plan-2-dev',
          name: 'DEV',
          price: '৳8,999',
          buttonText: 'Order DEV Pack',
          features: ['Mobile Friendly', 'Modern UI Design', 'SEO Optimized', '5 Business Day Delivery', 'Full React Source Code', 'Self-Hosted Guide', 'API Integration'],
          status: 'Active',
          isFeatured: false
        }
      ]
    }
  ],
  orders: []
};

const translations = {
  en: {
    // Nav & General
    "home": "Home",
    "projects": "Projects",
    "message": "Message",
    "contact_me": "Contact Me",
    "hire_me": "Hire Me",
    "about_me": "About Me",
    "contact_us": "Contact Us",
    "social_links": "Social Links",
    "email_us": "Email Us",
    "call_now": "Call Now",
    "chat_whatsapp": "Chat on WhatsApp",
    "featured_projects": "Featured Products",
    "skills": "Skills",
    "reviews": "Reviews",
    "admin_login": "Admin Login",
    
    // Details / Plans
    "regular_price": "Regular Price",
    "discount_price": "Discount Price",
    "live_demo": "Live Demo",
    "interactive": "Interactive",
    "full_tour": "Full Tour",
    "order_now": "Order Now",
    "benefits": "Benefits",
    "most_popular": "Most Popular",
    "tech_stack": "Tech Stack",
    "client_reviews": "Client Reviews",
    "packages": "Available Packages",

    // Contact form & inputs
    "name_label": "Your Name",
    "email_label": "Your Email / Gmail",
    "phone_label": "Your Phone Number (e.g. 017xxxxxxxx)",
    "msg_label": "Write your requirements or message details...",
    "send_msg_btn": "Send Message Safely",
    "sent_success": "Thank you! Your package enquiry and contact message has been recorded.",
    "submitting": "Submitting...",

    // Checkout
    "checkout_title": "Order Checkout Panel",
    "billing_info": "1. Billing & Contact Information",
    "company_optional": "Company Name (Optional)",
    "wa_optional": "WhatsApp Number (Optional)",
    "add_notes": "Additional Requirements / Instructions",
    "payment_info": "2. Verify Package Payment",
    "payment_instructions": "Make payment to our personal merchant accounts below, then copy the Transaction ID to submit.",
    "select_method": "Select Payment Channel",
    "payment_method_required": "Please select a payment method",
    "transaction_id": "8-Digit Transaction ID (TrxID)",
    "submit_order": "Submit Completed Order",

    // Order Success
    "order_success": "Order Placed Successfully!",
    "order_success_desc": "Thank you for your order. We are reviewing your payment and will be in touch shortly.",
    "order_id": "Order ID",
    "back_to_home": "Back to Home",

    // Auth & Admin
    "admin_pass": "Admin Secure Credentials",
    "enter_pass": "Enter Passphrase key",
    "signing_in": "Signing In..."
  },
  bn: {
    // Nav & General
    "home": "হোম",
    "projects": "প্রজেক্ট",
    "message": "মেসেজ",
    "contact_me": "যোগাযোগ করুন",
    "hire_me": "কাজের জন্য যোগাযোগ",
    "about_me": "আমার সম্পর্কে",
    "contact_us": "যোগাযোগ করুন",
    "social_links": "সামাজিক লিংক",
    "email_us": "ইমেইল করুন",
    "call_now": "কল করুন",
    "chat_whatsapp": "হোয়াটসঅ্যাপে চ্যাট করুন",
    "featured_projects": "ফিচার্ড প্রজেক্টসমূহ",
    "skills": "দক্ষতাসমূহ",
    "reviews": "রিভিউসমূহ",
    "admin_login": "এডমিন লগইন",

    // Details / Plans
    "regular_price": "সাধারণ মূল্য",
    "discount_price": "ডিসকাউন্ট মূল্য",
    "live_demo": "লাইভ ডেমো",
    "interactive": "ইন্টারেক্টিভ",
    "full_tour": "সম্পূর্ণ ট্যুর",
    "order_now": "এখনই অর্ডার করুন",
    "benefits": "সুবিধাসমূহ",
    "most_popular": "সবচেয়ে জনপ্রিয়",
    "tech_stack": "টেকনোলজি স্ট্যাক",
    "client_reviews": "ক্লায়েন্ট রিভিউসমূহ",
    "packages": "উপলব্ধ প্যাকেজসমূহ",

    // Contact form & inputs
    "name_label": "আপনার নাম",
    "email_label": "আপনার ইমেইল/জিমেইল",
    "phone_label": "আপনার ফোন নম্বর (যেমনঃ 017xxxxxxxx)",
    "msg_label": "আপনার প্রজেক্টের প্রয়োজনীয় ডকুমেন্টস বা মেসেজ লিখুন...",
    "send_msg_btn": "নিরাপদে মেসেজ পাঠান",
    "sent_success": "ধন্যবাদ! আপনার প্যাকেজ অনুসন্ধান এবং যোগাযোগের মেসেজটি রেকর্ড করা হয়েছে।",
    "submitting": "পাঠানো হচ্ছে...",

    // Checkout
    "checkout_title": "অর্ডার চেকআউট প্যানেল",
    "billing_info": "১. বিলিং এবং যোগাযোগের তথ্য",
    "company_optional": "কোম্পানির নাম (ঐচ্ছিক)",
    "wa_optional": "হোয়াটসঅ্যাপ নম্বর (ঐচ্ছিক)",
    "add_notes": "অতিরিক্ত প্রয়োজনীয়তা / নির্দেশনা",
    "payment_info": "২. প্যাকেজ পেমেন্ট যাচাই করুন",
    "payment_instructions": "নিচের যেকোনো পার্সোনাল মার্চেন্ট অ্যাকাউন্টে পেমেন্ট করুন এবং ট্রানজেকশন আইডি কপি করে অর্ডার সাবমিট করুন।",
    "select_method": "পেমেন্ট চ্যানেল সিলেক্ট করুন",
    "payment_method_required": "দয়া করে পেমেন্ট মেথড সিলেক্ট করুন",
    "transaction_id": "৮-ডিজিট ট্রানজেকশন নম্বর (TrxID)",
    "submit_order": "অর্ডার সম্পন্ন করুন",

    // Order Success
    "order_success": "অর্ডার সফলভাবে সম্পন্ন হয়েছে!",
    "order_success_desc": "আপনার অর্ডারের জন্য ধন্যবাদ। আমরা আপনার পেমেন্ট যাচাই করে খুব দ্রুত যোগাযোগ করব।",
    "order_id": "অর্ডার আইডি",
    "back_to_home": "হোমে ফিরে যান",

    // Auth & Admin
    "admin_pass": "এডমিন সিকিউর পাসওয়ার্ড",
    "enter_pass": "সিকিউরিটি কোড দিন",
    "signing_in": "লগইন হচ্ছে..."
  }
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
  updateFeaturedProjects: (projects: FeaturedProject[]) => void;
  incrementFeaturedProjectViews: (id: string) => void;
  toggleFeaturedProjectLike: (id: string) => void;
  addOrder: (order: Omit<AppOrder, 'id' | 'createdAt' | 'status'>) => string;
  updateOrderStatus: (orderId: string, status: AppOrder['status']) => void;
  deleteOrder: (orderId: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  language: 'en' | 'bn';
  setLanguage: (lang: 'en' | 'bn') => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const hasToken = typeof window !== 'undefined' && (
      localStorage.getItem('adminToken') === 'true' || 
      sessionStorage.getItem('adminToken') === 'true'
    );
    return { ...defaultState, isAdmin: hasToken };
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const [theme, setThemeState] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    }
    return 'dark';
  });

  const [language, setLanguageState] = useState<'en' | 'bn'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as 'en' | 'bn') || 'en';
    }
    return 'en';
  });

  // Apply theme class to document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const setLanguage = (lang: 'en' | 'bn') => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const langDict = translations[language] || translations.en;
    return langDict[key as keyof typeof langDict] || key;
  };

  // Initial load from Supabase or LocalStorage
  useEffect(() => {
    async function loadInitialData() {
      const hasToken = localStorage.getItem('adminToken') === 'true' || sessionStorage.getItem('adminToken') === 'true';
      // 1. Try Supabase
      try {
        const { data, error } = await supabase
          .from('app_state')
          .select('data')
          .limit(1)
          .single();

        if (data && data.data) {
          const loadedData = data.data;
          const mergedFeatured = (loadedData.featuredProjects && loadedData.featuredProjects.length > 0)
            ? loadedData.featuredProjects
            : defaultState.featuredProjects;
          setState({ 
            ...defaultState, 
            ...loadedData, 
            featuredFeatured: undefined, // Clears any potential legacy fields safely
            featuredProjects: mergedFeatured,
            orders: loadedData.orders || [],
            isAdmin: hasToken 
          });
          setIsLoaded(true);
          return;
        }
      } catch (e) {
        console.warn('Supabase fetch failed, falling back to localStorage:', e);
      }

      // 2. Fallback to LocalStorage
      const saved = localStorage.getItem('portfolioData');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const mergedFeatured = (parsed.featuredProjects && parsed.featuredProjects.length > 0)
            ? parsed.featuredProjects
            : defaultState.featuredProjects;
          setState({ 
            ...defaultState, 
            ...parsed, 
            featuredProjects: mergedFeatured,
            orders: parsed.orders || [],
            isAdmin: hasToken 
          });
        } catch (e) {
          console.error('Failed to parse local storage data');
        }
      }
      setIsLoaded(true);
    }

    loadInitialData();
  }, []);

  // Real-time listener for postgres changes on app_state table
  useEffect(() => {
    const channel = supabase
      .channel('app_state_postgres_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'app_state'
        },
        async (payload) => {
          console.log('Real-time database update detected:', payload);
          try {
            const { data, error } = await supabase
              .from('app_state')
              .select('data')
              .limit(1)
              .single();

            if (data && data.data) {
              const loadedData = data.data;
              const hasToken = localStorage.getItem('adminToken') === 'true' || sessionStorage.getItem('adminToken') === 'true';
              const mergedFeatured = (loadedData.featuredProjects && loadedData.featuredProjects.length > 0)
                ? loadedData.featuredProjects
                : defaultState.featuredProjects;

              setState(prev => ({
                ...prev,
                ...loadedData,
                featuredProjects: mergedFeatured,
                orders: loadedData.orders || [],
                isAdmin: hasToken
              }));
            }
          } catch (err) {
            console.error('Error handling real-time reload:', err);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Save to Supabase and LocalStorage persists
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem('portfolioData', JSON.stringify(state));

    async function syncToSupabase() {
      try {
        // We use a single record with ID 1 for simple app state persistence
        const { error } = await supabase
          .from('app_state')
          .upsert({ id: 1, data: state }, { onConflict: 'id' });
        
        if (error) {
          // If table doesn't exist, this will fail gracefully
          if (error.code === 'PGRST116' || error.code === '42P01') {
            console.warn('Supabase table "app_state" not found. Using localStorage only.');
          } else {
            console.error('Supabase sync error:', error);
          }
        }
      } catch (e) {
        console.error('Supabase sync exception:', e);
      }
    }

    // Debounce or just sync on changes
    const timeout = setTimeout(syncToSupabase, 1000);
    return () => clearTimeout(timeout);
  }, [state, isLoaded]);

  const loginState = (isAdmin: boolean) => setState(prev => ({ ...prev, isAdmin }));
  const updateProfile = (profile: AppState['profile']) => setState(prev => ({ ...prev, profile }));
  const updateAbout = (about: string) => setState(prev => ({ ...prev, about }));
  const updateContact = (contact: AppState['contact']) => setState(prev => ({ ...prev, contact }));
  const updateSocialLinks = (socialLinks: SocialLink[]) => setState(prev => ({ ...prev, socialLinks }));
  
  const updateSkills = (skills: Skill[]) => setState(prev => ({ ...prev, skills }));
  const updateProjects = (projects: Project[]) => setState(prev => ({ ...prev, projects }));
  const updateHomeCards = (homeCards: HomeCard[]) => setState(prev => ({ ...prev, homeCards }));
  const updateFeaturedProjects = (featuredProjects: FeaturedProject[]) => setState(prev => ({ ...prev, featuredProjects }));

  const incrementFeaturedProjectViews = (id: string) => {
    setState(prev => ({
      ...prev,
      featuredProjects: (prev.featuredProjects || []).map(p => 
        p.id === id ? { ...p, views: (p.views || 0) + 1 } : p
      )
    }));
  };

  const toggleFeaturedProjectLike = (id: string) => {
    const likedKey = `liked_project_${id}`;
    const alreadyLiked = localStorage.getItem(likedKey);
    
    if (alreadyLiked) {
      localStorage.removeItem(likedKey);
      setState(prev => ({
        ...prev,
        featuredProjects: (prev.featuredProjects || []).map(p => 
          p.id === id ? { ...p, likes: Math.max(0, (p.likes || 0) - 1) } : p
        )
      }));
    } else {
      localStorage.setItem(likedKey, 'true');
      setState(prev => ({
        ...prev,
        featuredProjects: (prev.featuredProjects || []).map(p => 
          p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p
        )
      }));
    }
  };

  const addMessage = (msg: Omit<ClientMessage, 'id' | 'date'>) => {
    const newMessage: ClientMessage = {
      ...msg,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
    };
    setState(prev => ({ ...prev, messages: [newMessage, ...(prev.messages || [])] }));
  };

  const addOrder = (orderData: Omit<AppOrder, 'id' | 'createdAt' | 'status'>) => {
    const orderId = `#ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: AppOrder = {
      ...orderData,
      id: orderId,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    setState(prev => ({
      ...prev,
      orders: [newOrder, ...(prev.orders || [])]
    }));
    return orderId;
  };

  const updateOrderStatus = (orderId: string, status: AppOrder['status']) => {
    setState(prev => ({
      ...prev,
      orders: (prev.orders || []).map(o => o.id === orderId ? { ...o, status } : o)
    }));
  };

  const deleteOrder = (orderId: string) => {
    setState(prev => ({
      ...prev,
      orders: (prev.orders || []).filter(o => o.id !== orderId)
    }));
  };

  return (
    <AppContext.Provider value={{
      state,
      loginState,
      updateProfile,
      updateAbout,
      updateContact,
      updateSocialLinks,
      addMessage,
      updateSkills,
      updateProjects,
      updateHomeCards,
      updateFeaturedProjects,
      incrementFeaturedProjectViews,
      toggleFeaturedProjectLike,
      addOrder,
      updateOrderStatus,
      deleteOrder,
      theme,
      toggleTheme,
      language,
      setLanguage,
      t
    }}>
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
