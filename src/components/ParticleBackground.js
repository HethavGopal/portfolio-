'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

const ParticleBackground = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);
  const materialRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 4); // Move back for larger view

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create dot sphere geometry
    const POINT_COUNT = 35000; // Increased for denser dots
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(POINT_COUNT * 3);
    
    for (let i = 0; i < POINT_COUNT; i++) {
      // Create points on a sphere surface
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = 2 * Math.PI * Math.random();
      const r = 1 + (Math.random() - 0.5) * 0.15; // More radius variation for texture
      
      positions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = r * Math.cos(theta);
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Shader material with noise animation
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        isDark: { value: theme === 'dark' ? 1.0 : 0.0 }
      },
      vertexShader: `
        precision highp float;
        uniform float time;
        varying vec3 vPos;
        varying float vPattern;
        
        // Simple noise function
        float noise(vec3 p) {
          return fract(sin(dot(p, vec3(12.9898, 78.233, 54.53))) * 43758.5453);
        }
        
        void main() {
          vPos = position;
          
          // Create wave patterns instead of random noise
          float wave1 = sin(time * 0.5 + position.x * 3.0 + position.y * 2.0) * 0.5 + 0.5;
          float wave2 = sin(time * 0.3 + position.z * 4.0 + length(position.xy) * 2.0) * 0.5 + 0.5;
          vPattern = wave1 * wave2;
          
          // Very gentle pulsing motion
          vec3 p = position * (1.0 + 0.01 * sin(time * 0.4 + length(position) * 2.0));
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = 2.5 + vPattern * 2.0; // Pattern-based size variation
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform float isDark;
        varying vec3 vPos;
        varying float vPattern;
        
        void main() {
          // Create circular points
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;
          
          // Pattern-based alpha with smooth transitions
          float alpha = (1.0 - dist * 2.0) * (0.4 + vPattern * 0.6);
          
          if (isDark > 0.5) {
            // White dots on dark background with pattern-based visibility
            gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * 0.9);
          } else {
            // Dark dots on light background with pattern-based visibility
            gl_FragColor = vec4(0.1, 0.1, 0.1, alpha * 0.7);
          }
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    
    // Position and scale the sphere - top right and bigger
    points.scale.setScalar(2.5); // Make it bigger
    points.position.set(2, 1, 0); // Move to top right
    
    scene.add(points);

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;
    materialRef.current = material;

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !rendererRef.current || !materialRef.current) return;
      
      materialRef.current.uniforms.time.value += 0.003; // Much slower time progression
      
      // Very slow, smooth rotation
      points.rotation.y += 0.0008;
      points.rotation.x += 0.0005;
      
      rendererRef.current.render(sceneRef.current, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!rendererRef.current) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      
      if (geometry) geometry.dispose();
      if (material) material.dispose();
    };
  }, []);

  // Update theme
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.isDark.value = theme === 'dark' ? 1.0 : 0.0;
    }
  }, [theme]);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 -z-10"
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
      }}
    />
  );
};

export default ParticleBackground; 