import Profile from '../components/Profile';
import About from '../components/About';
import Skills from '../components/Skills';
import HomeCards from '../components/HomeCards';
import Contact from '../components/Contact';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

export default function Home() {
  return (
    <div className="pb-20">
      <Profile />
      <About />
      <Skills />
      <HomeCards />
      <Contact />
      <FloatingWhatsApp />
    </div>
  );
}
