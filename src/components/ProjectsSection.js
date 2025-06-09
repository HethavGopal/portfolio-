'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { ChevronDown, ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Sandbox",
    description: "AI-powered, collaborative code editor (1400+ stars)",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
    technologies: ["React", "Node.js", "WebRTC", "Monaco Editor"],
    year: "2024",
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 2,
    title: "Arceus",
    description: "Distributed training marketplace to democratize large AI models",
    image: "https://images.unsplash.com/photo-1518186233392-c232efbf2373?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
    technologies: ["Python", "PyTorch", "Docker", "Kubernetes"],
    year: "2024",
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 3,
    title: "General Agents",
    description: "Product engineering, general-purpose computer control agents",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
    technologies: ["Python", "OpenAI API", "Selenium", "Computer Vision"],
    year: "2024",
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 4,
    title: "Axiom",
    description: "IDE for UWaterloo's formal proofs programming language",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
    technologies: ["TypeScript", "LSP", "Tree-sitter", "Electron"],
    year: "2024",
    github: "https://github.com",
    demo: "https://demo.com"
  }
];

export default function ProjectsSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === 'dark';

  return (
    <div id="projects" className="min-h-screen w-full relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-thin tracking-wide"
            style={{ color: isDark ? 'white' : 'black' }}
          >
            Projects
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-30 mx-auto mt-4"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-1 gap-y-4 justify-items-center">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative transition-all duration-300 hover:scale-[1.02] w-full max-w-sm"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-lg mb-4 aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay on hover */}
                <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
                  hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                } flex items-center justify-center gap-4`}>
                  <button 
                    className="p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
                    onClick={() => window.open(project.demo, '_blank')}
                  >
                    <ExternalLink size={20} className="text-white" />
                  </button>
                  <button 
                    className="p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
                    onClick={() => window.open(project.github, '_blank')}
                  >
                    <Github size={20} className="text-white" />
                  </button>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 
                    className="text-lg font-light tracking-wide"
                    style={{ color: isDark ? 'white' : 'black' }}
                  >
                    {project.title}
                  </h3>
                  <span className="text-lg font-light" style={{ color: isDark ? '#666' : '#999' }}>
                    — {project.year}
                  </span>
                </div>
                
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
                >
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 py-1 text-xs rounded-md ${
                        isDark 
                          ? 'bg-white/10 text-white/70' 
                          : 'bg-black/10 text-black/70'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center space-y-2">
        <span 
          className="text-xs font-light tracking-wide"
          style={{ color: mounted && theme === 'dark' ? '#94a3b8' : '#64748b' }}
        >
          Contact
        </span>
        <ChevronDown 
          size={16} 
          className="animate-bounce"
          style={{ color: mounted && theme === 'dark' ? '#94a3b8' : '#64748b' }}
        />
      </div>
    </div>
  );
} 