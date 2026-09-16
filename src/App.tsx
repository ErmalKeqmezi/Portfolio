import { useEffect } from 'react';
import Background from './components/Background';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Terminal from './components/Terminal';

export default function App() {
  useEffect(() => {
    const raf = requestAnimationFrame(() => document.body.classList.add('loaded'));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <Background />
      <ScrollProgress />
      <CustomCursor />

      <Nav />

      <main className="wrap">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Education />
        <Skills />
        <Contact />
        <Footer />
      </main>

      <Terminal />
    </>
  );
}
