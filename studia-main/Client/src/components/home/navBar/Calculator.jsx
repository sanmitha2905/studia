import { CalculatorIcon, X, Sigma, Equal, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ScientificCalculator from "../popupTools/ScientificCalculator";
import GraphPlotter from "../popupTools/GraphPlotter";
import UnitConverter from "../popupTools/UnitConverter";
import { Button } from "@/components/ui/button";

const Calculator = () => {
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 420, y: window.innerHeight - 585 });
  const [size, setSize] = useState({ width: 400, height: 565 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState(null);
  const dragStart = useRef({ x: 0, y: 0, startX: 0, startY: 0 });
  const resizeStart = useRef({ x: 0, y: 0, startWidth: 0, startHeight: 0, startPosX: 0, startPosY: 0 });
  const panelVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };
  useEffect(() => {
    const modal = document.getElementById("Calc_Modal");
    if (modal) {
      modal.showModal = () => setIsCalcOpen(true);
      modal.close = () => {
        setIsCalcOpen(false);
      };
    }
  }, []);
  const closeModal = () => {
    setIsCalcOpen(false);
  };

  // Drag handling
  const handleDragStart = (e) => {
    if (!isResizing) {
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        startX: position.x,
        startY: position.y,
      };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStart.current.x;
        const deltaY = e.clientY - dragStart.current.y;
        setPosition({
          x: dragStart.current.startX + deltaX,
          y: dragStart.current.startY + deltaY,
        });
      }

      if (isResizing && resizeHandle) {
        const deltaX = e.clientX - resizeStart.current.x;
        const deltaY = e.clientY - resizeStart.current.y;
        let newWidth = resizeStart.current.startWidth;
        let newHeight = resizeStart.current.startHeight;
        let newX = resizeStart.current.startPosX;
        let newY = resizeStart.current.startPosY;

        if (resizeHandle.includes('e')) newWidth = Math.max(300, resizeStart.current.startWidth + deltaX);
        if (resizeHandle.includes('w')) {
          newWidth = Math.max(300, resizeStart.current.startWidth - deltaX);
          newX = resizeStart.current.startPosX + deltaX;
        }
        if (resizeHandle.includes('s')) newHeight = Math.max(400, resizeStart.current.startHeight + deltaY);
        if (resizeHandle.includes('n')) {
          newHeight = Math.max(400, resizeStart.current.startHeight - deltaY);
          newY = resizeStart.current.startPosY + deltaY;
        }

        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeHandle(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, resizeHandle]);

  const handleResizeStart = (handle, e) => {
    e.preventDefault();
    setIsResizing(true);
    setResizeHandle(handle);
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      startWidth: size.width,
      startHeight: size.height,
      startPosX: position.x,
      startPosY: position.y,
    };
  };

  const getCursorStyle = (handle) => {
    const cursorMap = {
      'nw': 'nw-resize',
      'n': 'n-resize',
      'ne': 'ne-resize',
      'w': 'w-resize',
      'e': 'e-resize',
      'sw': 'sw-resize',
      's': 's-resize',
      'se': 'se-resize',
    };
    return cursorMap[handle] || 'pointer';
  };
  const [activeTool, setActiveTool] = useState("calculator");
  return (
    <>
      <Button
        size="icon"
        variant="secondary"
        className="bg-[var(--bg-sec)] hover:bg-[var(--bg-ter)] rounded-lg"
        onClick={() => {
          const modal = document.getElementById("Calc_Modal");
          modal && modal.showModal();
        }}
      >
        <CalculatorIcon />
      </Button>
      <motion.div
        id="Calc_Modal"
        variants={panelVariants}
        initial="hidden"
        animate={isCalcOpen ? "visible" : "hidden"}
        style={{
          position: "fixed",
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 9999,
          width: `${size.width}px`,
          height: `${size.height}px`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleDragStart}
      >
        <div className="bg-[var(--bg-primary)] p-4 rounded-3xl w-full h-full txt flex flex-col overflow-hidden relative shadow-2xl border border-[var(--bg-ter)]">
          {/* Resize Handles */}
          {isCalcOpen && (
            <>
              {['nw', 'ne', 'sw', 'se'].map((handle) => (
                <div
                  key={handle}
                  onMouseDown={(e) => handleResizeStart(handle, e)}
                  className="absolute w-3 h-3 z-50"
                  style={{
                    ...(handle === 'nw' && { top: 0, left: 0, cursor: getCursorStyle(handle) }),
                    ...(handle === 'ne' && { top: 0, right: 0, cursor: getCursorStyle(handle) }),
                    ...(handle === 'sw' && { bottom: 0, left: 0, cursor: getCursorStyle(handle) }),
                    ...(handle === 'se' && { bottom: 0, right: 0, cursor: getCursorStyle(handle) }),
                  }}
                />
              ))}
              {['n', 's', 'e', 'w'].map((handle) => (
                <div
                  key={handle}
                  onMouseDown={(e) => handleResizeStart(handle, e)}
                  className="absolute z-50"
                  style={{
                    ...(handle === 'n' && { top: 0, left: '10%', right: '10%', height: '4px', cursor: getCursorStyle(handle) }),
                    ...(handle === 's' && { bottom: 0, left: '10%', right: '10%', height: '4px', cursor: getCursorStyle(handle) }),
                    ...(handle === 'e' && { right: 0, top: '10%', bottom: '10%', width: '4px', cursor: getCursorStyle(handle) }),
                    ...(handle === 'w' && { left: 0, top: '10%', bottom: '10%', width: '4px', cursor: getCursorStyle(handle) }),
                  }}
                />
              ))}
            </>
          )}
          <div className="flex justify-between flex-wrap mb-4">
            <div className="flex gap-4">
              {["calculator", "graph", "unitconverter"].map((tool) => (
                <button
                  key={tool}
                  onClick={() => setActiveTool(tool)}
                  className={`txt-dim font-semibold transition border-b-2 p-1 pt-0
                      ${
                        activeTool === tool
                          ? "border-[var(--btn)] text-[var(--txt)]"
                          : "border-transparent hover:txt"
                      }`}
                >
                  {tool === "calculator" ? (
                    <div className="flex gap-2 items-center text-sm">
                      <Equal size={20} /> Calculator
                    </div>
                  ) : tool === "graph" ? (
                    <div className="flex gap-2 items-center text-sm">
                      <LineChart size={20} />
                      Graph
                    </div>
                  ) : tool === "unitconverter" ? (
                    <div className="flex gap-2 items-center text-sm">
                      <Sigma size={20} />
                      Converter
                    </div>
                  ) : (
                    ""
                  )}
                </button>
              ))}
            </div>

            <Button
              onClick={closeModal}
              variant="transparent"
              size="icon"
              className="hover:txt transition txt-dim"
            >
              <X size={20} />
            </Button>
          </div>
          <div className="flex-1 overflow-auto rounded-md min-h-[60vh]">
            {activeTool === "calculator" && <ScientificCalculator />}
            {activeTool === "graph" && <GraphPlotter />}
            {activeTool === "unitconverter" && <UnitConverter />}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Calculator;
