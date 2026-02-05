"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface LightPillarProps {
  topColor?: string;
  bottomColor?: string;
  intensity?: number;
  rotationSpeed?: number;
  interactive?: boolean;
  className?: string;
  glowAmount?: number;
  pillarWidth?: number;
  pillarHeight?: number;
  noiseIntensity?: number;
  mixBlendMode?: React.CSSProperties["mixBlendMode"];
  pillarRotation?: number;
  quality?: "low" | "medium" | "high";
}

const LightPillar: React.FC<LightPillarProps> = ({
  topColor = "#5227FF",
  bottomColor = "#FF9FFC",
  intensity = 1.0,
  rotationSpeed = 0.3,
  interactive = false,
  className = "",
  glowAmount = 0.005,
  pillarWidth = 3.0,
  pillarHeight = 0.4,
  noiseIntensity = 0.5,
  mixBlendMode = "screen",
  pillarRotation = 0,
  quality = "high",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const geometryRef = useRef<THREE.PlaneGeometry | null>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const timeRef = useRef<number>(0);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);

  // Check WebGL support
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      setWebGLSupported(false);
    }
  }, []);

  useEffect(() => {
    if (!(containerRef.current && webGLSupported)) {
      return;
    }

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const isLowEndDevice =
      isMobile ||
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

    let effectiveQuality = quality;
    if (isLowEndDevice && quality === "high") {
      effectiveQuality = "medium";
    }
    if (isMobile && quality !== "low") {
      effectiveQuality = "low";
    }

    const qualitySettings = {
      low: {
        iterations: 24,
        waveIterations: 1,
        pixelRatio: 0.5,
        precision: "mediump",
        stepMultiplier: 1.5,
      },
      medium: {
        iterations: 40,
        waveIterations: 2,
        pixelRatio: 0.65,
        precision: "mediump",
        stepMultiplier: 1.2,
      },
      high: {
        iterations: 80,
        waveIterations: 4,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        precision: "highp",
        stepMultiplier: 1.0,
      },
    };

    const settings =
      qualitySettings[effectiveQuality] || qualitySettings.medium;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference:
          effectiveQuality === "low" ? "low-power" : "high-performance",
        precision: settings.precision,
        stencil: false,
        depth: false,
      });
    } catch (error) {
      console.error("Failed to create WebGL renderer:", error);
      setWebGLSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(settings.pixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Convert hex colors to RGB
    const parseColor = (hex: string): THREE.Vector3 => {
      const color = new THREE.Color(hex);
      return new THREE.Vector3(color.r, color.g, color.b);
    };

    // Shader material
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform vec3 uTopColor;
      uniform vec3 uBottomColor;
      uniform float uIntensity;
      uniform bool uInteractive;
      uniform float uGlowAmount;
      uniform float uPillarWidth;
      uniform float uPillarHeight;
      uniform float uNoiseIntensity;
      uniform float uPillarRotation;
      uniform float uRotCos;
      uniform float uRotSin;
      uniform float uPillarRotCos;
      uniform float uPillarRotSin;
      uniform float uWaveSin[4];
      uniform float uWaveCos[4];
      varying vec2 vUv;

      const float PI = 3.141592653589793;
      const float EPSILON = 0.001;
      const float E = 2.71828182845904523536;

      float noise(vec2 coord) {
        vec2 r = (E * sin(E * coord));
        return fract(r.x * r.y * (1.0 + coord.x));
      }

      void main() {
        vec2 fragCoord = vUv * uResolution;
        vec2 uv = (fragCoord * 2.0 - uResolution) / uResolution.y;
        
        // Apply 2D rotation to UV coordinates using pre-computed values
        uv = vec2(
          uv.x * uPillarRotCos - uv.y * uPillarRotSin,
          uv.x * uPillarRotSin + uv.y * uPillarRotCos
        );

        vec3 origin = vec3(0.0, 0.0, -10.0);
        vec3 direction = normalize(vec3(uv, 1.0));

        float maxDepth = 50.0;
        float depth = 0.1;

        // Use pre-computed rotation values (or mouse-based)
        float rotCos = uRotCos;
        float rotSin = uRotSin;
        if(uInteractive && length(uMouse) > 0.0) {
          float mouseAngle = uMouse.x * PI * 2.0;
          rotCos = cos(mouseAngle);
          rotSin = sin(mouseAngle);
        }

        vec3 color = vec3(0.0);
        
        const int ITERATIONS = ${settings.iterations};
        const int WAVE_ITERATIONS = ${settings.waveIterations};
        const float STEP_MULT = ${settings.stepMultiplier.toFixed(1)};
        
        for(int i = 0; i < ITERATIONS; i++) {
          vec3 pos = origin + direction * depth;
          
          // Inline rotation: pos.xz *= rotMat
          float newX = pos.x * rotCos - pos.z * rotSin;
          float newZ = pos.x * rotSin + pos.z * rotCos;
          pos.x = newX;
          pos.z = newZ;

          // Apply vertical scaling and wave deformation
          vec3 deformed = pos;
          deformed.y *= uPillarHeight;
          deformed = deformed + vec3(0.0, uTime, 0.0);
          
          // Inlined wave deformation
          float frequency = 1.0;
          float amplitude = 1.0;
          for(int j = 0; j < WAVE_ITERATIONS; j++) {
            // Inline rotation: deformed.xz *= rot(0.4) using pre-computed
            float wx = deformed.x * uWaveCos[j] - deformed.z * uWaveSin[j];
            float wz = deformed.x * uWaveSin[j] + deformed.z * uWaveCos[j];
            deformed.x = wx;
            deformed.z = wz;
            
            float phase = uTime * float(j) * 2.0;
            vec3 oscillation = cos(deformed.zxy * frequency - phase);
            deformed += oscillation * amplitude;
            frequency *= 2.0;
            amplitude *= 0.5;
          }
          
          // Calculate distance field using cosine pattern
          vec2 cosinePair = cos(deformed.xz);
          float fieldDistance = length(cosinePair) - 0.2;
          
          // Radial boundary constraint (inlined blendMax)
          float radialBound = length(pos.xz) - uPillarWidth;
          float k = 4.0;
          float h = max(k - abs(-radialBound - (-fieldDistance)), 0.0);
          fieldDistance = -(min(-radialBound, -fieldDistance) - h * h * 0.25 / k);
          
          fieldDistance = abs(fieldDistance) * 0.15 + 0.01;

          vec3 gradient = mix(uBottomColor, uTopColor, smoothstep(15.0, -15.0, pos.y));
          color += gradient / fieldDistance;

          if(fieldDistance < EPSILON || depth > maxDepth) break;
          depth += fieldDistance * STEP_MULT;
        }

        // Normalize by pillar width to maintain consistent glow regardless of size
        float widthNormalization = uPillarWidth / 3.0;
        color = tanh(color * uGlowAmount / widthNormalization);
        
        // Add noise postprocessing
        float rnd = noise(gl_FragCoord.xy);
        color -= rnd / 15.0 * uNoiseIntensity;
        
        gl_FragColor = vec4(color * uIntensity, 1.0);
      }
    `;

    // Pre-compute wave rotation values
    const waveAngle = 0.4;
    const waveSinValues = new Float32Array(4);
    const waveCosValues = new Float32Array(4);
    for (let i = 0; i < 4; i++) {
      waveSinValues[i] = Math.sin(waveAngle);
      waveCosValues[i] = Math.cos(waveAngle);
    }

    // Pre-compute pillar rotation
    const pillarRotRad = (pillarRotation * Math.PI) / 180.0;
    const pillarRotCos = Math.cos(pillarRotRad);
    const pillarRotSin = Math.sin(pillarRotRad);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
        uMouse: { value: mouseRef.current },
        uTopColor: { value: parseColor(topColor) },
        uBottomColor: { value: parseColor(bottomColor) },
        uIntensity: { value: intensity },
        uInteractive: { value: interactive },
        uGlowAmount: { value: glowAmount },
        uPillarWidth: { value: pillarWidth },
        uPillarHeight: { value: pillarHeight },
        uNoiseIntensity: { value: noiseIntensity },
        uPillarRotation: { value: pillarRotation },
        uRotCos: { value: 1.0 },
        uRotSin: { value: 0.0 },
        uPillarRotCos: { value: pillarRotCos },
        uPillarRotSin: { value: pillarRotSin },
        uWaveSin: { value: waveSinValues },
        uWaveCos: { value: waveCosValues },
      },
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });
    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    geometryRef.current = geometry;
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse interaction - throttled for performance
    let mouseMoveTimeout: number | null = null;
    const handleMouseMove = (event: MouseEvent) => {
      if (!interactive) {
        return;
      }

      if (mouseMoveTimeout) {
        return;
      }

      mouseMoveTimeout = window.setTimeout(() => {
        mouseMoveTimeout = null;
      }, 16); // ~60fps throttle

      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current.set(x, y);
    };

    if (interactive) {
      container.addEventListener("mousemove", handleMouseMove, {
        passive: true,
      });
    }

    // Animation loop with fixed timestep
    let lastTime = performance.now();
    const targetFPS = effectiveQuality === "low" ? 30 : 60;
    const frameTime = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (
        !(
          materialRef.current &&
          rendererRef.current &&
          sceneRef.current &&
          cameraRef.current
        )
      ) {
        return;
      }

      const deltaTime = currentTime - lastTime;

      if (deltaTime >= frameTime) {
        timeRef.current += 0.016 * rotationSpeed;
        materialRef.current.uniforms.uTime.value = timeRef.current;

        // Pre-compute rotation on CPU
        const rotAngle = timeRef.current * 0.3;
        materialRef.current.uniforms.uRotCos.value = Math.cos(rotAngle);
        materialRef.current.uniforms.uRotSin.value = Math.sin(rotAngle);

        rendererRef.current.render(sceneRef.current, cameraRef.current);
        lastTime = currentTime - (deltaTime % frameTime);
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    // Handle resize with debouncing
    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }

      resizeTimeout = window.setTimeout(() => {
        if (
          !(rendererRef.current && materialRef.current && containerRef.current)
        ) {
          return;
        }
        const newWidth = containerRef.current.clientWidth;
        const newHeight = containerRef.current.clientHeight;
        rendererRef.current.setSize(newWidth, newHeight);
        materialRef.current.uniforms.uResolution.value.set(newWidth, newHeight);
      }, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
      if (materialRef.current) {
        materialRef.current.dispose();
      }
      if (geometryRef.current) {
        geometryRef.current.dispose();
      }

      rendererRef.current = null;
      materialRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      geometryRef.current = null;
      rafRef.current = null;
    };
  }, [
    topColor,
    bottomColor,
    intensity,
    rotationSpeed,
    interactive,
    glowAmount,
    pillarWidth,
    pillarHeight,
    noiseIntensity,
    pillarRotation,
    webGLSupported,
    quality,
  ]);

  if (!webGLSupported) {
    return (
      <div
        className={`absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black/10 text-gray-500 text-sm ${className}`}
        style={{ mixBlendMode }}
      >
        WebGL not supported
      </div>
    );
  }

  return (
    <div
      className={`absolute top-0 left-0 h-full w-full ${className}`}
      ref={containerRef}
      style={{ mixBlendMode }}
    />
  );
};

export default LightPillar;
