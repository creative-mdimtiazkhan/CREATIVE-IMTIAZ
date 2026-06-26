import Profile from '../components/Profile';
import About from '../components/About';
import FeaturedProjects from '../components/FeaturedProjects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import HomeCards from '../components/HomeCards';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

export default function Home() {
  return (
    <div className="pb-20">
      <Profile />
      <About />
      <FeaturedProjects />
      <Skills />
      <Contact />
      <HomeCards />
      <FloatingWhatsApp />
    </div>
  );
}
