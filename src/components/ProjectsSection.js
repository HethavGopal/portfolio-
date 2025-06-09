'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const projects = [
  {
    id: 1,
    title: "EcoTracker Pro",
    subtitle: "Sustainability Platform",
    description: "A comprehensive platform that helps users monitor their carbon footprint, set environmental goals, and connect with eco-conscious communities worldwide.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb",
    technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
    year: "2024",
    featured: true
  },
  {
    id: 2,
    title: "Neural Finance AI",
    subtitle: "AI Investment Advisor",
    description: "Machine learning powered financial advisor that analyzes market trends and provides personalized investment recommendations using advanced algorithms.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb",
    technologies: ["Python", "TensorFlow", "FastAPI", "React"],
    year: "2024",
    featured: false
  },
  {
    id: 3,
    title: "CloudSync Platform",
    subtitle: "Team Collaboration",
    description: "Real-time collaboration platform for distributed teams with advanced file sharing, project management, and seamless integration capabilities.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb",
    technologies: ["Next.js", "AWS", "PostgreSQL", "Redis"],
    year: "2023",
    featured: true
  },
  {
    id: 4,
    title: "MindSpace VR",
    subtitle: "Virtual Wellness",
    description: "Immersive virtual reality meditation application that creates personalized zen environments for stress relief and mental wellness enhancement.",
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb",
    technologies: ["Unity", "C#", "WebXR", "Three.js"],
    year: "2024",
    featured: false
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
    <div id="projects" className="min-h-screen w-full relative z-10 pt-8 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 
            className="text-5xl md:text-6xl font-thin tracking-wide mb-4"
            style={{ color: isDark ? 'white' : 'black' }}
          >
            Featured Work
          </h2>
          <div className={`h-px w-24 mx-auto ${isDark ? 'bg-white' : 'bg-black'} opacity-30 mb-6`}></div>
          <p 
            className="text-lg font-light max-w-2xl mx-auto leading-relaxed"
            style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
          >
            Selected projects showcasing technical excellence and creative problem-solving
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-32">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={project.id}
                className={`group relative transition-all duration-700 ${
                  isEven ? 'md:pr-32' : 'md:pl-32'
                }`}
                style={{
                  animationDelay: `${index * 200}ms`
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Container */}
                <div className={`relative flex flex-col md:flex-row gap-8 items-center ${
                  isEven ? '' : 'md:flex-row-reverse'
                }`}>
                  
                  {/* Image Section */}
                  <div className="relative flex-1 max-w-lg">
                    <div className="relative overflow-hidden rounded-2xl group-hover:shadow-2xl transition-all duration-500">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Overlay */}
                      <div className={`absolute inset-0 transition-all duration-500 ${
                        hoveredProject === project.id 
                          ? 'bg-black/20' 
                          : 'bg-transparent'
                      }`}></div>
                      
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            isDark 
                              ? 'bg-white/20 text-white border border-white/30' 
                              : 'bg-black/20 text-black border border-black/30'
                          } backdrop-blur-sm`}>
                            Featured
                          </span>
                        </div>
                      )}
                      
                      {/* Year Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          isDark 
                            ? 'bg-black/40 text-white' 
                            : 'bg-white/40 text-black'
                        } backdrop-blur-sm`}>
                          {project.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 space-y-6">
                    
                    {/* Project Info */}
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <h3 
                          className="text-3xl md:text-4xl font-light tracking-tight"
                          style={{ color: isDark ? 'white' : 'black' }}
                        >
                          {project.title}
                        </h3>
                        <p 
                          className="text-lg font-light"
                          style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
                        >
                          {project.subtitle}
                        </p>
                      </div>
                      
                      <p 
                        className="text-base leading-relaxed max-w-lg"
                        style={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)' }}
                      >
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-3">
                      <h4 
                        className="text-sm font-medium tracking-wide uppercase"
                        style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}
                      >
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                              isDark 
                                ? 'bg-white/10 text-white hover:bg-white/20' 
                                : 'bg-black/10 text-black hover:bg-black/20'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-2">
                      <button 
                        className={`group inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                          isDark 
                            ? 'bg-white text-black hover:bg-white/90 hover:scale-105' 
                            : 'bg-black text-white hover:bg-black/90 hover:scale-105'
                        } shadow-lg hover:shadow-xl`}
                      >
                        View Project
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                      
                      <button 
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium border transition-all duration-300 hover:scale-105 ${
                          isDark 
                            ? 'border-white/30 text-white hover:bg-white/10' 
                            : 'border-black/30 text-black hover:bg-black/10'
                        }`}
                      >
                        Source Code
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Connecting Line */}
                {index < projects.length - 1 && (
                  <div className={`absolute bottom-0 ${isEven ? 'right-0' : 'left-0'} w-px h-16 ${
                    isDark ? 'bg-white/20' : 'bg-black/20'
                  } transform translate-y-16`}></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-32">
          <div className="space-y-6">
            <h3 
              className="text-2xl font-light"
              style={{ color: isDark ? 'white' : 'black' }}
            >
              Interested in working together?
            </h3>
            <p 
              className="text-lg max-w-xl mx-auto"
              style={{ color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
            >
              I'm always open to discussing new opportunities and innovative projects.
            </p>
            <button 
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-white text-black hover:bg-white/90' 
                  : 'bg-black text-white hover:bg-black/90'
              } shadow-lg hover:shadow-xl`}
            >
              Start a Conversation
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Section Separator */}
        <div className="mt-20 flex justify-center">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-20"></div>
        </div>
      </div>
    </div>
  );
} 