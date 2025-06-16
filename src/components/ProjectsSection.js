'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { ChevronDown, ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import vettAI from '../assets/vettAI.png';
import uwbookhub from '../assets/UWHub.png';
import forecast from '../assets/forecast.png';
import nexight from '../assets/nexight.png';

const projects = [
  {
    id: 1,
    title: "VettAI",
    description: "AI-powered mock interview platform with real-time voice interaction and instant feedback for technical interviews",
    image: vettAI,
    technologies: ["Next.js", "React", "TailwindCSS", "Vapi API", "Firebase"],
    year: "2024",
    github: "https://github.com/HethavGopal/vettai",
    demo: "https://ai-interview-ten-ruby.vercel.app"
  },
  {
    id: 2,
    title: "UWBookHub",
    description: "Full-stack textbook marketplace for UWaterloo students with peer-to-peer transactions",
    image: uwbookhub,
    technologies: ["React", "Node.js", "MongoDB", "Firebase", "Docker"],
    year: "2024",
    github: "https://github.com/HethavGopal/UWBookHubNew",
    demo: "https://uwmarketplace.vercel.app/"
  },
  {
    id: 3,
    title: "Nexight AI",
    description: "AI-powered business automation tools for local businesses offering intelligent chatbots, lead generation etc...",
    image: nexight,
    technologies: ["Next.js", "React", "TailwindCSS", "OpenAI", "Node.js"],
    year: "2024",
    github: "https://github.com/HethavGopal/nexight",
    demo: "https://nexightai.com"
  },
  {
    id: 4,
    title: "ForeCast Analytics",
    description: "Interactive analytics dashboard for real-time sales data visualization and revenue forecasting",
    image: forecast,
    technologies: ["React", "Flask", "Chart.js", "NextUI", "TensorFlow"],
    year: "2024",
    github: "https://github.com/HethavGopal/ForeCast",
    demo: ""
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 justify-items-center">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative transition-all duration-300 hover:scale-[1.02] w-full max-w-[600px]"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-lg mb-4 aspect-video">
                {project.id !== 4 ? (
                  <Image
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={index === 0}
                    quality={95}
                    fill
                  />
                ) : (
                  <div className="w-full h-full bg-[#0F172A] p-3 flex flex-col">
                    {/* Top Navigation */}
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-800/50">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 px-2 py-1 rounded-md bg-green-500/10 border border-green-500/20">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-[11px] font-medium text-green-500">LIVE</span>
                        </div>
                        <div className="h-4 w-px bg-gray-800"></div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[11px] text-gray-400">Refresh Rate:</span>
                          <span className="text-[11px] text-gray-200">30s</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 text-[11px]">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-400">Last Update:</span>
                          <span className="text-gray-200 font-medium">2m ago</span>
                        </div>
                        <button className="w-6 h-6 rounded-md bg-gray-800/50 hover:bg-gray-800 transition-colors flex items-center justify-center">
                          <div className="w-3.5 h-3.5 text-gray-400">⚙️</div>
                        </button>
                      </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-12 gap-3 flex-1">
                      {/* Left Column - Main Chart */}
                      <div className="col-span-8 bg-gray-800/20 rounded-xl p-3 backdrop-blur-sm border border-gray-700/30">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-sm font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Revenue Forecast</h3>
                            <div className="flex items-center mt-1">
                              <p className="text-[11px] text-gray-400">30-day projection</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2 px-2 py-1 rounded-md bg-gray-800/50">
                              <div className="flex items-center space-x-1">
                                <div className="w-1.5 h-1.5 bg-green-500/70 rounded-full"></div>
                                <span className="text-[11px] text-gray-300">Actual</span>
                              </div>
                              <div className="h-3 w-px bg-gray-700"></div>
                              <div className="flex items-center space-x-1">
                                <div className="w-1.5 h-1.5 bg-blue-500/70 rounded-full"></div>
                                <span className="text-[11px] text-gray-300">Predicted</span>
                              </div>
                            </div>
                            <button className="w-6 h-6 rounded-md bg-gray-800/50 hover:bg-gray-800 transition-colors flex items-center justify-center">
                              <div className="w-3.5 h-3.5 text-gray-400">↗️</div>
                            </button>
                          </div>
                        </div>
                        
                        {/* Chart Area */}
                        <div className="relative">
                          <div className="absolute -left-2 top-0 bottom-0 flex flex-col justify-between text-[10px] text-gray-500">
                            <span>$20K</span>
                            <span>$15K</span>
                            <span>$10K</span>
                            <span>$5K</span>
                          </div>
                          <div className="h-[140px] ml-8 grid grid-cols-24 gap-1 items-end">
                            {Array(24).fill(0).map((_, i) => (
                              <div key={i} className="relative h-full">
                                <div 
                                  className={i < 14 ? 'bg-green-500/20' : 'bg-blue-500/20'}
                                  style={{ 
                                    height: `${40 + Math.sin(i/3) * 15}%`,
                                    width: '100%',
                                    borderRadius: '2px'
                                  }}
                                >
                                  <div 
                                    className={i < 14 ? 'bg-green-500' : 'bg-blue-500'}
                                    style={{ 
                                      height: '60%',
                                      width: '100%',
                                      position: 'absolute',
                                      bottom: 0,
                                      opacity: 0.3,
                                      borderRadius: '2px'
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="ml-8 mt-2 grid grid-cols-24 gap-1">
                            {Array(24).fill(0).map((_, i) => (
                              <div key={i} className="text-center text-[9px] text-gray-500">
                                {i + 1}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Stats */}
                      <div className="col-span-4 space-y-3">
                        {/* Top Stats */}
                        <div className="bg-gray-800/20 rounded-xl p-3 backdrop-blur-sm border border-gray-700/30">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-[11px] text-gray-400">Current Revenue</div>
                            <div className="px-1.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                              <span className="text-[10px] text-green-400">+18.5%</span>
                            </div>
                          </div>
                          <div className="text-xl font-semibold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                            $17,293
                          </div>
                          <div className="flex items-center mt-2">
                            <div className="text-[11px] text-gray-400">vs last month:</div>
                            <div className="text-[11px] text-green-400 ml-1">+$2,685</div>
                          </div>
                        </div>

                        {/* Middle Stats */}
                        <div className="bg-gray-800/20 rounded-xl p-3 backdrop-blur-sm border border-gray-700/30">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-[11px] text-gray-400">Forecast Accuracy</div>
                            <div className="text-[11px] text-blue-400">High</div>
                          </div>
                          <div className="flex items-end space-x-1">
                            <div className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">96%</div>
                          </div>
                          <div className="w-full h-1 bg-gray-800 rounded-full mt-2 overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                              style={{ width: '96%' }}
                            ></div>
                          </div>
                        </div>

                        {/* Bottom Stats */}
                        <div className="bg-gray-800/20 rounded-xl p-3 backdrop-blur-sm border border-gray-700/30">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-[11px] text-gray-400">Top Products</div>
                          </div>
                          <div className="space-y-2">
                            <div className="p-2 rounded-md bg-gray-800/50">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                  <div className="text-[11px] text-gray-200">Product A</div>
                                </div>
                                <div className="text-[11px] text-green-400">+$8.5k</div>
                              </div>
                              <div className="mt-1 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full rounded-full bg-green-500/30" style={{ width: '85%' }}></div>
                              </div>
                            </div>
                            <div className="p-2 rounded-md bg-gray-800/50">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                  <div className="text-[11px] text-gray-200">Product B</div>
                                </div>
                                <div className="text-[11px] text-blue-400">+$6.2k</div>
                              </div>
                              <div className="mt-1 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full rounded-full bg-blue-500/30" style={{ width: '65%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
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