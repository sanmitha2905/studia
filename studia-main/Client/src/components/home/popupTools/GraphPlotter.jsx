import { useEffect, useRef, useState } from "react";

const GraphPlotter = () => {
  const functionLibrary = {
    Trigonometry: {
      Sine: "Math.sin(x)",
      Cosine: "Math.cos(x)",
      Tangent: "Math.tan(x)",
      Secant: "1 / Math.cos(x)",
      Cosecant: "1 / Math.sin(x)",
      Cotangent: "1 / Math.tan(x)",
    },
    Polynomial: {
      "Linear (x)": "x",
      "Parabola (x²)": "x * x",
      "Cubic (x³)": "x * x * x",
    },
    Exponential: {
      "e^x": "Math.exp(x)",
      "2^x": "Math.pow(2, x)",
      "10^x": "Math.pow(10, x)",
    },
    Logarithmic: {
      "ln(x)": "Math.log(x)",
      "log10(x)": "Math.log10(x)",
    },
    Miscellaneous: {
      "|x|": "Math.abs(x)",
      Floor: "Math.floor(x)",
      Ceiling: "Math.ceil(x)",
      Step: "Math.floor(x * 2)",
    },
  };

  const [category, setCategory] = useState("Trigonometry");
  const [func, setFunc] = useState("Math.sin(x)");
  const [debouncedFunc, setDebouncedFunc] = useState(func);
  const [error, setError] = useState(null);

  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  /* ---------- Debounce expression ---------- */
  useEffect(() => {
    const t = setTimeout(() => setDebouncedFunc(func), 120);
    return () => clearTimeout(t);
  }, [func]);

  /* ---------- Responsive canvas ---------- */
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      canvas.width = container.clientWidth;
      canvas.height = 420;
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ---------- Graph rendering ---------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let plotFn;
    try {
      plotFn = new Function("x", "Math", `return ${debouncedFunc}`);
      setError(null);
    } catch {
      setError("Invalid expression");
      return;
    }

    const w = canvas.width;
    const h = canvas.height;

    let xScale = 25;
    if (category === "Exponential") xScale = 35;
    if (category === "Logarithmic") xScale = 35;

    // Desmos-style background
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, "rgba(20, 30, 50, 1)");
    gradient.addColorStop(1, "rgba(15, 25, 45, 1)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    /* Fine grid lines (Desmos style) */
    ctx.strokeStyle = "rgba(100, 150, 180, 0.1)";
    ctx.lineWidth = 0.5;
    for (let i = -50; i <= 50; i++) {
      const x = w / 2 + i * xScale;
      if (x >= 0 && x <= w) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
    }
    for (let i = -50; i <= 50; i++) {
      const y = h / 2 + i * xScale;
      if (y >= 0 && y <= h) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    }

    /* Thicker major grid (every 5 units) */
    ctx.strokeStyle = "rgba(100, 150, 180, 0.2)";
    ctx.lineWidth = 1;
    for (let i = -50; i <= 50; i += 5) {
      const x = w / 2 + i * xScale;
      if (x >= 0 && x <= w) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
    }
    for (let i = -50; i <= 50; i += 5) {
      const y = h / 2 + i * xScale;
      if (y >= 0 && y <= h) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    }

    /* Axes with subtle color */
    const centerY = h / 2;
    ctx.strokeStyle = "rgba(200, 200, 200, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(w, centerY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();

    /* Auto scale Y */
    let maxY = 1;
    for (let px = 0; px < w; px += 4) {
      const x = (px - w / 2) / xScale;
      try {
        if (category === "Logarithmic" && x <= 0) continue;
        const y = plotFn(x, Math);
        if (isFinite(y)) maxY = Math.max(maxY, Math.abs(y));
      } catch {}
    }

    const yScale = (h / 2) / Math.min(maxY, 10);

    /* Plot function with smooth curve */
    ctx.strokeStyle = "#00d9ff";
    ctx.lineWidth = 2.8;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 6;
    ctx.shadowColor = "rgba(0, 217, 255, 0.4)";
    ctx.beginPath();

    let first = true;

    for (let px = 0; px < w; px++) {
      const x = (px - w / 2) / xScale;

      if (category === "Logarithmic" && x <= 0) {
        first = true;
        continue;
      }

      let y;
      try {
        y = plotFn(x, Math);
        if (!isFinite(y) || Math.abs(y) > 1000) {
          first = true;
          continue;
        }
      } catch {
        first = true;
        continue;
      }

      const py = centerY - y * yScale;
      if (first) {
        ctx.moveTo(px, py);
        first = false;
      } else {
        ctx.lineTo(px, py);
      }
    }

    ctx.stroke();
    ctx.shadowBlur = 0;

    /* Axis labels - Desmos style */
    ctx.fillStyle = "rgba(180, 180, 200, 0.9)";
    ctx.font = "12px 'Segoe UI', -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    
    // X-axis labels
    for (let i = -5; i <= 5; i++) {
      if (i === 0) continue;
      const px = w / 2 + i * xScale;
      if (px >= 10 && px <= w - 10) {
        ctx.fillText(i.toString(), px, centerY + 10);
      }
    }
    
    // Y-axis labels
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (let i = -4; i <= 4; i++) {
      if (i === 0) continue;
      const py = centerY - i * xScale;
      if (py >= 10 && py <= h - 10) {
        ctx.fillText(i.toString(), w / 2 - 10, py);
      }
    }
    
    // Origin label
    ctx.fillStyle = "rgba(200, 200, 220, 0.8)";
    ctx.font = "bold 13px 'Segoe UI', -apple-system, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("0", w / 2 - 8, centerY + 12);

    /* Axis tick marks - Desmos style */
    ctx.strokeStyle = "rgba(180, 180, 200, 0.6)";
    ctx.lineWidth = 1;
    for (let i = -5; i <= 5; i++) {
      if (i === 0) continue;
      // X-axis ticks
      const px = w / 2 + i * xScale;
      ctx.beginPath();
      ctx.moveTo(px, centerY - 3);
      ctx.lineTo(px, centerY + 3);
      ctx.stroke();
      
      // Y-axis ticks
      const py = centerY - i * xScale;
      ctx.beginPath();
      ctx.moveTo(w / 2 - 3, py);
      ctx.lineTo(w / 2 + 3, py);
      ctx.stroke();
    }
  }, [debouncedFunc, category]);

  return (
    <div 
      ref={containerRef} 
      className="flex flex-col gap-3 p-3 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl h-full"
    >
      {/* Category Select */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Function Category
        </label>
        <select
          value={category}
          onChange={(e) => {
            const cat = e.target.value;
            setCategory(cat);
            setFunc(Object.values(functionLibrary[cat])[0]);
          }}
          className="w-full p-2 rounded-lg bg-slate-800 text-slate-100 border border-slate-600 outline-none hover:border-cyan-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-400 transition-all duration-200 cursor-pointer font-medium text-sm"
        >
          {Object.keys(functionLibrary).map((c) => (
            <option key={c} className="bg-slate-900">{c}</option>
          ))}
        </select>
      </div>

      {/* Function Select */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Select Function
        </label>
        <select
          value={func}
          onChange={(e) => setFunc(e.target.value)}
          className="w-full p-2 rounded-lg bg-slate-800 text-slate-100 border border-slate-600 outline-none hover:border-cyan-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-400 transition-all duration-200 cursor-pointer font-medium text-sm"
        >
          {Object.entries(functionLibrary[category]).map(([k, v]) => (
            <option key={k} className="bg-slate-900" value={v}>{k}</option>
          ))}
        </select>
      </div>

      {/* Custom Expression Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Custom Expression
        </label>
        <input
          value={func}
          onChange={(e) => setFunc(e.target.value)}
          placeholder="Math.sin(x)"
          className="w-full p-2 rounded-lg bg-slate-800 text-slate-100 placeholder-slate-500 border border-slate-600 outline-none hover:border-cyan-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-400 transition-all duration-200 font-mono text-xs"
        />
      </div>

      {/* Canvas Container - Desmos Style */}
      <div className="flex-1 rounded-lg border border-slate-700 bg-slate-900 p-0 shadow-xl overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-2 rounded-lg bg-red-900/30 border border-red-700/50">
          <p className="text-red-300 text-xs font-semibold">{error}</p>
        </div>
      )}
    </div>
  );
};

export default GraphPlotter;
