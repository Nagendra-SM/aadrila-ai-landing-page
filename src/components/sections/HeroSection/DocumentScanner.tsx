import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DocumentCard from "./DocumentCard";
import { useThrottledResize } from "../../../hooks/useThrottledResize";

type DocumentType = "license" | "invoice" | "doc";

interface Document {
  id: number;
  type: DocumentType;
}

const documents: Document[] = [
  { id: 1, type: "license" },
  { id: 2, type: "doc" },
  { id: 3, type: "invoice" },
];

const POSITIONS = {
  center: { x: 0, y: 0, rotate: 0, scale: 1.5, zIndex: 10, blur: 0, opacity: 1 },
  left: { x: -250, y: 30, rotate: 0, scale: 0.9, zIndex: 1, blur: 2, opacity: 0.6 },
  right: { x: 250, y: 30, rotate: 0, scale: 0.9, zIndex: 1, blur: 2, opacity: 0.6 },
};

const getResponsivePositions = (width: number) => {
  if (width < 1024) {
    return {
      center: { ...POSITIONS.center, scale: 1.3 },
      left: { ...POSITIONS.left, x: -120, scale: 0.8 },
      right: { ...POSITIONS.right, x: 120, scale: 0.8 },
    };
  }
  return POSITIONS;
};

const DocumentScanner = () => {
  const [rotation, setRotation] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const { width } = useThrottledResize(150);
  
  const isMobile = useMemo(() => width < 1024, [width]);
  const positions = useMemo(() => getResponsivePositions(width), [width]);

  useEffect(() => {
    const initTimer = setTimeout(() => {
      setIsInitialized(true);
    }, 500);

    const rotateInterval = setInterval(() => {
      setRotation((prev) => prev + 1);
    }, 3000);

    return () => {
      clearTimeout(initTimer);
      clearInterval(rotateInterval);
    };
  }, []);

  const getPosition = useCallback((docIndex: number) => {
    if (!isInitialized) {
      if (docIndex === 0) return positions.center;
      if (docIndex === 1) return positions.left;
      return positions.right;
    }

    const positionIndex = (docIndex - rotation % 3 + 3) % 3;
    
    if (positionIndex === 0) return positions.center;
    if (positionIndex === 1) return positions.left;
    return positions.right;
  }, [isInitialized, rotation, positions]);

  const glowAnimation = useMemo(() => ({
    scale: [1, 1.15, 1],
    opacity: [0.15, 0.25, 0.15],
  }), []);

  const glowTransition = useMemo(() => ({
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const
  }), []);

  return (
    <div 
      className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] flex items-center justify-center"
      data-testid="document-scanner"
    >
      {!isMobile && (
        <motion.div
          className="absolute w-64 sm:w-72 md:w-80 h-64 sm:h-72 md:h-80 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, hsl(var(--wave-color)) 0%, transparent 70%)"
          }}
          animate={glowAnimation}
          transition={glowTransition}
        />
      )}

      {/* Document container */}
      <div className="relative w-full max-w-[600px] h-[250px] sm:h-[300px] md:h-[350px] flex items-center justify-center px-4">
        <AnimatePresence>
          {documents.map((doc, index) => {
            const position = getPosition(index);
            const isCenter = position === positions.center;
            
            return (
              <motion.div
                key={doc.id}
                className="absolute"
                style={{
                  zIndex: position.zIndex,
                }}
                initial={{ 
                  x: 0,
                  y: 100,
                  rotate: 0,
                  opacity: 0,
                  scale: 0.8
                }}
                animate={{ 
                  x: position.x,
                  y: position.y,
                  rotate: position.rotate,
                  opacity: position.opacity,
                  scale: position.scale,
                  filter: `blur(${position.blur}px)`,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <DocumentCard
                  type={doc.type}
                  isScanning={isCenter && isInitialized}
                  delay={index * 0.1}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default memo(DocumentScanner);
