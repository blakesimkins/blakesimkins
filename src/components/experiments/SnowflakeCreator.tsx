"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface SnowflakeConfig {
  points: number;
  branchAngle: number;
  size: number;
  complexity: number;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  is3D: boolean;
  rotationX: number;
  rotationY: number;
}

const defaults: SnowflakeConfig = {
  points: 6,
  branchAngle: 30,
  size: 150,
  complexity: 2,
  primaryColor: "#A7C7E7",
  secondaryColor: "#FFFFFF",
  backgroundColor: "#667eea",
  is3D: false,
  rotationX: 25,
  rotationY: 15,
};

export default function SnowflakeCreator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [config, setConfig] = useState<SnowflakeConfig>({ ...defaults });

  const drawSnowflake = useCallback((cfg: SnowflakeConfig) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = cfg.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    function drawBranch(length: number, depth: number, maxDepth: number) {
      if (depth > maxDepth) return;
      ctx!.beginPath();
      ctx!.moveTo(0, 0);
      ctx!.lineTo(length, 0);
      ctx!.stroke();

      if (depth < maxDepth) {
        const subLength = length * 0.6;
        const subAngle = cfg.branchAngle * (Math.PI / 180);

        ctx!.save();
        ctx!.translate(length * 0.7, 0);
        ctx!.rotate(subAngle);
        drawBranch(subLength, depth + 1, maxDepth);
        ctx!.restore();

        ctx!.save();
        ctx!.translate(length * 0.7, 0);
        ctx!.rotate(-subAngle);
        drawBranch(subLength, depth + 1, maxDepth);
        ctx!.restore();
      }
    }

    function drawLayer(
      size: number,
      opacity: number,
      lineWidth: number,
      gradient: CanvasGradient
    ) {
      const angleStep = (2 * Math.PI) / cfg.points;
      ctx!.globalAlpha = opacity;
      ctx!.strokeStyle = gradient;
      ctx!.lineWidth = lineWidth;
      for (let i = 0; i < cfg.points; i++) {
        ctx!.save();
        ctx!.rotate(i * angleStep);
        drawBranch(size, 0, cfg.complexity);
        ctx!.restore();
      }
      ctx!.globalAlpha = 1;
    }

    if (cfg.is3D) {
      const layers = 5;
      const rotX = cfg.rotationX * (Math.PI / 180);
      const rotY = cfg.rotationY * (Math.PI / 180);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      for (let i = 0; i < layers; i++) {
        const depth = i / (layers - 1);
        const z = (depth - 0.5) * 0.8;
        const perspective = 1 / (1 - z * 0.3);
        const scale = (0.6 + depth * 0.4) * perspective;
        const layerSize = cfg.size * scale;
        const opacity = 0.3 + depth * 0.7;
        const lineWidth = 1 + depth * 2;
        const xOffset = z * sinY * 100 * perspective;
        const yOffset = z * sinX * 100 * perspective;

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, layerSize);
        gradient.addColorStop(0, cfg.primaryColor);
        gradient.addColorStop(1, cfg.secondaryColor);

        ctx.save();
        ctx.translate(xOffset, yOffset);

        const scaleX = cosY * perspective;
        const scaleY = cosX * perspective;
        const skewX = sinY * 0.5;
        const skewY = -sinX * 0.5;
        ctx.transform(scaleX, skewY, skewX, scaleY, 0, 0);

        if (i < layers - 1) {
          const shadowIntensity = 0.3 * (1 - depth);
          ctx.shadowColor = `rgba(0,0,0,${shadowIntensity})`;
          ctx.shadowBlur = 15 * scale;
          ctx.shadowOffsetX = sinY * 10;
          ctx.shadowOffsetY = sinX * 10;
        }

        drawLayer(layerSize, opacity, lineWidth, gradient);
        ctx.restore();
      }
    } else {
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, cfg.size);
      gradient.addColorStop(0, cfg.primaryColor);
      gradient.addColorStop(1, cfg.secondaryColor);
      drawLayer(cfg.size, 1, 2, gradient);
    }

    ctx.restore();
  }, []);

  useEffect(() => {
    drawSnowflake(config);
  }, [config, drawSnowflake]);

  function update(patch: Partial<SnowflakeConfig>) {
    setConfig((prev) => ({ ...prev, ...patch }));
  }

  function reset() {
    setConfig({ ...defaults });
  }

  function randomize() {
    const rc = () =>
      "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    const ri = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    setConfig({
      points: ri(3, 12),
      branchAngle: ri(0, 60),
      size: ri(50, 300),
      complexity: ri(1, 4),
      primaryColor: rc(),
      secondaryColor: rc(),
      backgroundColor: rc(),
      is3D: config.is3D,
      rotationX: ri(0, 90),
      rotationY: ri(-45, 45),
    });
  }

  return (
    <div className="space-y-6">
      <div className="snowflake-container">
        <canvas
          ref={canvasRef}
          id="snowflake-canvas"
          width={600}
          height={600}
          aria-label="Interactive snowflake visualization"
        />
      </div>

      <div className="controls-panel">
        <div className="controls-grid">
          {/* Points */}
          <div className="control-group">
            <label htmlFor="points" className="control-label">
              Points: <span className="control-value">{config.points}</span>
            </label>
            <input
              type="range"
              id="points"
              className="control-slider"
              min={3}
              max={12}
              value={config.points}
              onChange={(e) => update({ points: parseInt(e.target.value) })}
              aria-label="Number of symmetry points"
            />
          </div>

          {/* Branch Angle */}
          <div className="control-group">
            <label htmlFor="branch-angle" className="control-label">
              Branch Angle:{" "}
              <span className="control-value">{config.branchAngle}°</span>
            </label>
            <input
              type="range"
              id="branch-angle"
              className="control-slider"
              min={0}
              max={60}
              value={config.branchAngle}
              onChange={(e) => update({ branchAngle: parseInt(e.target.value) })}
              aria-label="Branch angle in degrees"
            />
          </div>

          {/* Size */}
          <div className="control-group">
            <label htmlFor="size" className="control-label">
              Size: <span className="control-value">{config.size}px</span>
            </label>
            <input
              type="range"
              id="size"
              className="control-slider"
              min={50}
              max={300}
              value={config.size}
              onChange={(e) => update({ size: parseInt(e.target.value) })}
              aria-label="Snowflake size in pixels"
            />
          </div>

          {/* Complexity */}
          <div className="control-group">
            <label htmlFor="complexity" className="control-label">
              Complexity:{" "}
              <span className="control-value">{config.complexity}</span>
            </label>
            <input
              type="range"
              id="complexity"
              className="control-slider"
              min={1}
              max={4}
              value={config.complexity}
              onChange={(e) =>
                update({ complexity: parseInt(e.target.value) })
              }
              aria-label="Complexity level"
            />
          </div>

          {/* 3D Toggle */}
          <div className="control-group">
            <label htmlFor="3d-toggle" className="toggle-label">
              <input
                type="checkbox"
                id="3d-toggle"
                className="toggle-checkbox"
                checked={config.is3D}
                onChange={(e) => update({ is3D: e.target.checked })}
                aria-label="Enable 3D mode"
              />
              <span className="toggle-switch" />
              <span className="toggle-text">3D Mode</span>
            </label>
          </div>

          {/* Rotation X (3D only) */}
          <div className={`control-group rotation-control${config.is3D ? " visible" : ""}`}>
            <label htmlFor="rotation-x" className="control-label">
              Rotate X:{" "}
              <span className="control-value">{config.rotationX}°</span>
            </label>
            <input
              type="range"
              id="rotation-x"
              className="control-slider"
              min={0}
              max={90}
              value={config.rotationX}
              onChange={(e) => update({ rotationX: parseInt(e.target.value) })}
              aria-label="X-axis rotation in degrees"
            />
          </div>

          {/* Rotation Y (3D only) */}
          <div className={`control-group rotation-control${config.is3D ? " visible" : ""}`}>
            <label htmlFor="rotation-y" className="control-label">
              Rotate Y:{" "}
              <span className="control-value">{config.rotationY}°</span>
            </label>
            <input
              type="range"
              id="rotation-y"
              className="control-slider"
              min={-45}
              max={45}
              value={config.rotationY}
              onChange={(e) => update({ rotationY: parseInt(e.target.value) })}
              aria-label="Y-axis rotation in degrees"
            />
          </div>

          {/* Primary Color */}
          <div className="control-group">
            <label htmlFor="primary-color" className="control-label">
              Primary Color
            </label>
            <input
              type="color"
              id="primary-color"
              className="control-color"
              value={config.primaryColor}
              onChange={(e) => update({ primaryColor: e.target.value })}
              aria-label="Primary snowflake color"
            />
          </div>

          {/* Secondary Color */}
          <div className="control-group">
            <label htmlFor="secondary-color" className="control-label">
              Secondary Color
            </label>
            <input
              type="color"
              id="secondary-color"
              className="control-color"
              value={config.secondaryColor}
              onChange={(e) => update({ secondaryColor: e.target.value })}
              aria-label="Secondary snowflake color"
            />
          </div>

          {/* Background Color */}
          <div className="control-group">
            <label htmlFor="background-color" className="control-label">
              Background
            </label>
            <input
              type="color"
              id="background-color"
              className="control-color"
              value={config.backgroundColor}
              onChange={(e) => update({ backgroundColor: e.target.value })}
              aria-label="Background color"
            />
          </div>

          {/* Reset */}
          <div className="control-group">
            <button onClick={reset} className="reset-button">
              Reset to Defaults
            </button>
          </div>

          {/* Randomize */}
          <div className="control-group">
            <button onClick={randomize} className="randomize-button">
              Randomize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
