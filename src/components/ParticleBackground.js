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
  const pointsRef = useRef(null);
  const trailRef = useRef(null);
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
    const POINT_COUNT = 18000; // Reduced from 35000 for less density
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

    // Create ambient floating particles
    const AMBIENT_COUNT = 3000;
    const ambientGeometry = new THREE.BufferGeometry();
    const ambientPositions = new Float32Array(AMBIENT_COUNT * 3);
    const ambientVelocities = new Float32Array(AMBIENT_COUNT * 3);
    const ambientLifetimes = new Float32Array(AMBIENT_COUNT);
    
    for (let i = 0; i < AMBIENT_COUNT; i++) {
      // Scatter particles around the sphere area
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 3;
      
      ambientPositions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 4;
      ambientPositions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      ambientPositions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 2;
      
      // Slow random movement
      ambientVelocities[i * 3] = (Math.random() - 0.5) * 0.002;
      ambientVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      ambientVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
      
      ambientLifetimes[i] = Math.random() * 1000;
    }
    
    ambientGeometry.setAttribute('position', new THREE.BufferAttribute(ambientPositions, 3));
    ambientGeometry.setAttribute('velocity', new THREE.BufferAttribute(ambientVelocities, 3));
    ambientGeometry.setAttribute('lifetime', new THREE.BufferAttribute(ambientLifetimes, 1));

    // Create trailing particles geometry
    const TRAIL_COUNT = 6000; // Reduced for subtlety
    const trailGeometry = new THREE.BufferGeometry();
    const trailPositions = new Float32Array(TRAIL_COUNT * 3);
    const trailVelocities = new Float32Array(TRAIL_COUNT * 3);
    const trailLifetimes = new Float32Array(TRAIL_COUNT);
    
    for (let i = 0; i < TRAIL_COUNT; i++) {
      // Start particles from the bottom-right area of the sphere
      const angle = (Math.random() - 0.5) * Math.PI * 0.4; // Moderate spread
      const radius = 0.9 + Math.random() * 0.2;
      
      // Position at bottom-right of sphere
      trailPositions[i * 3] = radius * 0.7; // Right side
      trailPositions[i * 3 + 1] = radius * -0.5; // Bottom area
      trailPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      
      // Consistent rightward flow
      trailVelocities[i * 3] = 0.008 + Math.random() * 0.004; // Rightward
      trailVelocities[i * 3 + 1] = -0.002 - Math.random() * 0.002; // Slight downward
      trailVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001; // Minimal z variation
      
      trailLifetimes[i] = Math.random() * 400; // Longer cycle for smoother effect
    }
    
    trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
    trailGeometry.setAttribute('velocity', new THREE.BufferAttribute(trailVelocities, 3));
    trailGeometry.setAttribute('lifetime', new THREE.BufferAttribute(trailLifetimes, 1));

    // Shader material with noise animation
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        isDark: { value: theme === 'dark' ? 1.0 : 0.0 },
        globalOpacity: { value: 1.0 }
      },
      vertexShader: `
        precision highp float;
        uniform float time;
        varying vec3 vPos;
        varying float vPattern;
        varying float vGlow;
        
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
          
          // Subtle pulsing glow based on distance from center
          float distFromCenter = length(position);
          vGlow = sin(time * 0.8 + distFromCenter * 2.0) * 0.3 + 0.7;
          
          // Very gentle pulsing motion with enhanced glow effect
          vec3 p = position * (1.0 + 0.01 * sin(time * 0.4 + length(position) * 2.0));
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = (2.5 + vPattern * 2.0) * vGlow; // Glow affects size
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform float isDark;
        uniform float globalOpacity;
        varying vec3 vPos;
        varying float vPattern;
        varying float vGlow;
        
        void main() {
          // Create circular points
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;
          
          // Pattern-based alpha with glow enhancement
          float alpha = (1.0 - dist * 2.0) * (0.4 + vPattern * 0.6) * vGlow * globalOpacity;
          
          if (isDark > 0.5) {
            // White dots with subtle blue glow in dark mode
            vec3 color = mix(vec3(1.0, 1.0, 1.0), vec3(0.8, 0.9, 1.0), vGlow * 0.3);
            gl_FragColor = vec4(color, alpha * 0.9);
          } else {
            // Dark particles with subtle glow in light mode
            gl_FragColor = vec4(0.0, 0.0, 0.0, alpha * 2.5);
          }
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    // Trail material with flowing effect
    const trailMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        isDark: { value: theme === 'dark' ? 1.0 : 0.0 },
        globalOpacity: { value: 1.0 }
      },
      vertexShader: `
        precision highp float;
        uniform float time;
        attribute vec3 velocity;
        attribute float lifetime;
        varying float vAlpha;
        varying float vProgress;
        
        void main() {
          float life = mod(time * 50.0 + lifetime, 500.0); // Slower, longer cycle
          vProgress = life / 500.0;
          
          // Simple position animation flowing right
          vec3 pos = position + velocity * life;
          
          // Gentle gravity effect
          pos.y += -0.0001 * life * life;
          pos.x += sin(time * 0.2 + lifetime) * 0.005; // Subtle wave motion
          
          // Smooth fade in and out
          float fadeStart = 0.2;
          float fadeEnd = 0.8;
          if (vProgress < fadeStart) {
            vAlpha = vProgress / fadeStart;
          } else if (vProgress > fadeEnd) {
            vAlpha = (1.0 - vProgress) / (1.0 - fadeEnd);
          } else {
            vAlpha = 1.0;
          }
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = 1.5 + vAlpha * 1.5; // Smaller, subtle particles
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform float isDark;
        uniform float globalOpacity;
        varying float vAlpha;
        varying float vProgress;
        
        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;
          
          float alpha = (1.0 - dist * 2.0) * vAlpha * globalOpacity;
          
          if (isDark > 0.5) {
            // Subtle white trail particles
            gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * 0.3);
          } else {
            // Subtle dark trail particles
            gl_FragColor = vec4(0.2, 0.2, 0.2, alpha * 0.25);
          }
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    // Ambient floating particles material
    const ambientMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        isDark: { value: theme === 'dark' ? 1.0 : 0.0 },
        spherePosition: { value: new THREE.Vector3(0, 0, 0) },
        globalOpacity: { value: 1.0 }
      },
      vertexShader: `
        precision highp float;
        uniform float time;
        uniform vec3 spherePosition;
        attribute vec3 velocity;
        attribute float lifetime;
        varying float vAlpha;
        varying float vDistance;
        
        void main() {
          float life = mod(time * 30.0 + lifetime, 1200.0);
          
          // Animate position with attraction to sphere
          vec3 pos = position + velocity * life;
          
          // Attraction force toward sphere
          vec3 toSphere = spherePosition - pos;
          float distToSphere = length(toSphere);
          vec3 attraction = normalize(toSphere) * (1.0 / (distToSphere + 1.0)) * 0.0008;
          pos += attraction * life;
          
          // Gentle floating motion
          pos.y += sin(time * 0.2 + lifetime) * 0.01;
          pos.x += cos(time * 0.15 + lifetime) * 0.008;
          
          vDistance = distToSphere;
          vAlpha = 1.0 - (life / 1200.0);
          vAlpha *= smoothstep(5.0, 2.0, distToSphere); // Fade based on distance from sphere
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = 1.0 + vAlpha * 1.5;
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform float isDark;
        uniform float globalOpacity;
        varying float vAlpha;
        varying float vDistance;
        
        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;
          
          float alpha = (1.0 - dist * 2.0) * vAlpha * globalOpacity;
          
          if (isDark > 0.5) {
            // Subtle white ambient particles
            gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * 0.15);
          } else {
            // Subtle dark ambient particles
            gl_FragColor = vec4(0.3, 0.3, 0.3, alpha * 0.1);
          }
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    // Create two particle systems - one behind text, one in front
    const pointsBack = new THREE.Points(geometry, material);
    const pointsFront = new THREE.Points(geometry.clone(), material.clone());
    
    // Create trail system
    const trailPoints = new THREE.Points(trailGeometry, trailMaterial);
    
    // Create ambient particle system
    const ambientPoints = new THREE.Points(ambientGeometry, ambientMaterial);
    
        // Responsive sphere sizing - edge always takes 65% of screen width
    const VISIBLE_WIDTH_PERCENTAGE = 0.65; // 65% of screen width should show the sphere edge
    
    const getResponsiveValues = () => {
      const aspect = camera.aspect;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Calculate world dimensions
      const distance = 4;
      const vFOV = camera.fov * Math.PI / 180;
      const worldHeight = 2 * Math.tan(vFOV / 2) * distance;
      const worldWidth = worldHeight * aspect;
      
      // Calculate sphere size so that 65% of its diameter equals the desired screen width
      const desiredVisibleWidth = worldWidth * VISIBLE_WIDTH_PERCENTAGE;
      const sphereDiameter = desiredVisibleWidth / VISIBLE_WIDTH_PERCENTAGE; // Full diameter
      const sphereRadius = sphereDiameter / 2;
      
      // Position sphere so its left edge starts slightly off-screen left
      // and 65% of its width is visible
      const leftX = -worldWidth * 0.5 + (sphereRadius * 0.1); // Start slightly off left edge
      
      return {
        scale: {
          x: sphereRadius,
          y: sphereRadius, // Keep perfect circle
          z: sphereRadius
        },
        position: leftX
      };
    };
    
    const { scale: backScale, position: leftPosition } = getResponsiveValues();
    pointsBack.scale.set(backScale.x, backScale.y, backScale.z);
    pointsBack.position.set(leftPosition, 0, -1); // Left side, behind the text
    
    const frontScale = {
      x: backScale.x * 0.92, // Slightly smaller for front layer
      y: backScale.y * 0.92,
      z: backScale.z * 0.92
    };
    pointsFront.scale.set(frontScale.x, frontScale.y, frontScale.z);
    pointsFront.position.set(leftPosition, 0, -2); // Move front particles behind content too
    
    // Position trail relative to the sphere
    trailPoints.scale.set(backScale.x, backScale.y, backScale.z);
    trailPoints.position.set(leftPosition, 0, -1.5); // Move trail behind content too
    
    // Position ambient particles to float around the sphere area
    ambientPoints.scale.set(backScale.x * 0.8, backScale.y * 0.8, backScale.z * 0.8);
    ambientPoints.position.set(leftPosition, 0, -3); // Further behind content
    
         // Make front particles much more transparent so text is readable
     // Override the fragment shader for front particles to be more transparent
     pointsFront.material.fragmentShader = pointsFront.material.fragmentShader.replace(
       'gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * 0.9);',
       'gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * 0.15);'
     ).replace(
       'gl_FragColor = vec4(0.1, 0.1, 0.1, alpha * 0.7);',
       'gl_FragColor = vec4(0.1, 0.1, 0.1, alpha * 0.1);'
     );
     pointsFront.material.needsUpdate = true;
    
    scene.add(pointsBack);
    scene.add(pointsFront);
    scene.add(trailPoints);
    scene.add(ambientPoints);

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;
    materialRef.current = material;
    pointsRef.current = { back: pointsBack, front: pointsFront };
    trailRef.current = trailPoints;

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !rendererRef.current || !materialRef.current) return;
      
      materialRef.current.uniforms.time.value += 0.003; // Much slower time progression
      
      // Update both particle systems
      if (pointsRef.current.front && pointsRef.current.front.material) {
        pointsRef.current.front.material.uniforms.time.value += 0.003;
      }
      
      // Update trail animation
      if (trailRef.current && trailRef.current.material) {
        trailRef.current.material.uniforms.time.value += 0.003;
      }
      
      // Update ambient particles
      if (ambientPoints && ambientPoints.material) {
        ambientPoints.material.uniforms.time.value += 0.003;
        // Update sphere position for attraction effect
        ambientPoints.material.uniforms.spherePosition.value.copy(pointsBack.position);
      }
      
      // Very slow, smooth rotation for both spheres
      pointsBack.rotation.y += 0.0008;
      pointsBack.rotation.x += 0.0005;
      
      pointsFront.rotation.y -= 0.0006; // Rotate in opposite direction for more depth
      pointsFront.rotation.x -= 0.0004;
      
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
      
      // Recalculate responsive values for new screen size
      const { scale: newScale, position: newPosition } = getResponsiveValues();
      
      // Update sphere positions and scales to maintain percentage-based sizing
      if (pointsRef.current.back) {
        pointsRef.current.back.position.x = newPosition;
        pointsRef.current.back.scale.set(newScale.x, newScale.y, newScale.z);
      }
      if (pointsRef.current.front) {
        pointsRef.current.front.position.x = newPosition;
        pointsRef.current.front.scale.set(
          newScale.x * 0.92,
          newScale.y * 0.92,
          newScale.z * 0.92
        );
      }
      if (trailRef.current) {
        trailRef.current.position.x = newPosition;
        trailRef.current.scale.set(newScale.x, newScale.y, newScale.z);
      }
      if (ambientPoints) {
        ambientPoints.position.x = newPosition;
        ambientPoints.scale.set(newScale.x * 0.8, newScale.y * 0.8, newScale.z * 0.8);
      }
    };

    window.addEventListener('resize', handleResize);

    // Scroll-based zoom effect and opacity reduction - maintains percentage-based sizing
    const handleScroll = () => {
      if (!pointsRef.current || !trailRef.current) return;
      
      const scrollY = window.scrollY;
      const maxScroll = 1000; // Adjust this value as needed
      const scrollProgress = Math.min(scrollY / maxScroll, 1);
      
      // Calculate opacity reduction when scrolling past home section
      const homeHeight = window.innerHeight; // Assuming home section is full screen height
      const fadeStartScroll = homeHeight * 0.3; // Start fading at 30% of home section
      const fadeEndScroll = homeHeight * 0.8; // Fully faded at 80% of home section
      
      let opacity = 1.0;
      if (scrollY > fadeStartScroll) {
        if (scrollY >= fadeEndScroll) {
          opacity = 0.65; // Minimum opacity for content sections (65% visibility)
        } else {
          // Linear fade from 1.0 to 0.65
          const fadeProgress = (scrollY - fadeStartScroll) / (fadeEndScroll - fadeStartScroll);
          opacity = 1.0 - (fadeProgress * 0.35); // Fade from 1.0 to 0.65
        }
      }
      
             // Apply opacity to all particle systems via shader uniforms
       if (pointsRef.current.back && pointsRef.current.back.material.uniforms) {
         pointsRef.current.back.material.uniforms.globalOpacity.value = opacity;
       }
       if (pointsRef.current.front && pointsRef.current.front.material.uniforms) {
         pointsRef.current.front.material.uniforms.globalOpacity.value = opacity * 0.5; // Front particles even more transparent
       }
       if (trailRef.current && trailRef.current.material.uniforms) {
         trailRef.current.material.uniforms.globalOpacity.value = opacity * 0.7; // Trail particles moderately transparent
       }
       if (ambientPoints && ambientPoints.material.uniforms) {
         ambientPoints.material.uniforms.globalOpacity.value = opacity * 0.3; // Ambient particles very transparent
       }
      
      // Get base responsive scale
      const { scale: baseResponsiveScale } = getResponsiveValues();
      
      // Scale from 100% to 140% of base responsive size based on scroll
      const minScaleMultiplier = 1.0;
      const maxScaleMultiplier = 1.4;
      const scaleMultiplier = minScaleMultiplier + (maxScaleMultiplier - minScaleMultiplier) * scrollProgress;
      
      const scaledSize = {
        x: baseResponsiveScale.x * scaleMultiplier,
        y: baseResponsiveScale.y * scaleMultiplier,
        z: baseResponsiveScale.z * scaleMultiplier
      };
      
      pointsRef.current.back.scale.set(scaledSize.x, scaledSize.y, scaledSize.z);
      
      // Scale front sphere slightly differently for depth effect
      const frontScaleMultiplier = scaleMultiplier * 0.92;
      pointsRef.current.front.scale.set(
        baseResponsiveScale.x * frontScaleMultiplier,
        baseResponsiveScale.y * frontScaleMultiplier,
        baseResponsiveScale.z * frontScaleMultiplier
      );
      
      // Scale trail to match
      trailRef.current.scale.set(scaledSize.x, scaledSize.y, scaledSize.z);
      
      // Scale ambient particles to match
      if (ambientPoints) {
        ambientPoints.scale.set(scaledSize.x * 0.8, scaledSize.y * 0.8, scaledSize.z * 0.8);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      
      if (geometry) geometry.dispose();
      if (trailGeometry) trailGeometry.dispose();
      if (material) material.dispose();
      if (trailMaterial) trailMaterial.dispose();
      if (ambientMaterial) ambientMaterial.dispose();
    };
  }, []);

  // Update theme
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.isDark.value = theme === 'dark' ? 1.0 : 0.0;
    }
    if (trailRef.current && trailRef.current.material) {
      trailRef.current.material.uniforms.isDark.value = theme === 'dark' ? 1.0 : 0.0;
    }
    // Update ambient particles theme
    if (sceneRef.current) {
      const ambientPoints = sceneRef.current.children.find(child => 
        child.material && child.material.uniforms && child.material.uniforms.spherePosition
      );
      if (ambientPoints && ambientPoints.material) {
        ambientPoints.material.uniforms.isDark.value = theme === 'dark' ? 1.0 : 0.0;
      }
    }
  }, [theme]);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 -z-20"
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        pointerEvents: 'none'
      }}
    />
  );
};

export default ParticleBackground; 