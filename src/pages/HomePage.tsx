import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { Experience } from '../components/Experience';
import { Projects } from '../components/Projects';
import { MCPLab } from '../components/MCPLab';
import { McpDemo } from '../components/McpDemo';
import { DesignSystem } from '../components/DesignSystem';
import { Testimonials } from '../components/Testimonials';
import { Certifications } from '../components/Certifications';
import { Writing } from '../components/Writing';
import { Contact } from '../components/Contact';

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <MCPLab />
      <McpDemo />
      <DesignSystem />
      <Testimonials />
      <Certifications />
      <Writing />
      <Contact />
    </>
  );
}
