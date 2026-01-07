import { motion } from "framer-motion";
import { useMemo, memo } from "react";
import LicenseImg from "../../../assets/License.png";
import InvoiceImg from "../../../assets/Invoice.png";
import DocImg from "../../../assets/Doc.png";
import { useThrottledIsMobile } from "../../../hooks/useThrottledResize";

type DocumentType = "license" | "invoice" | "doc";

interface DocumentCardProps {
  type: DocumentType;
  isScanning: boolean;
  delay?: number;
}

const documentImages: Record<DocumentType, string> = {
  license: LicenseImg,
  invoice: InvoiceImg,
  doc: DocImg,
};

const DocumentCard = ({ type, isScanning, delay = 0 }: DocumentCardProps) => {
  const isMobile = useThrottledIsMobile(1024);
  const isTablet = useThrottledIsMobile(768);

  const cardAnimation = useMemo(() => 
    isScanning 
      ? { scale: [1, 1.02, 1] } 
      : isMobile 
        ? { y: [0, -3, 0] } 
        : { y: [0, -6, 0] },
  [isScanning, isMobile]);

  const cardTransition = useMemo(() => ({ 
    duration: isScanning ? 2 : (isMobile ? 3 : 4),
    repeat: Infinity, 
    ease: "easeInOut" as const,
    delay: delay * 0.5
  }), [isScanning, isMobile, delay]);

  const shadowAnimation = useMemo(() => 
    isScanning ? { opacity: [0.1, 0.2, 0.1] } : {},
  [isScanning]);

  const scanLineAnimation = useMemo(() => ({
    top: ["0%", "100%", "0%"]
  }), []);

  const scanLineTransition = useMemo(() => ({
    duration: 1.8,
    repeat: Infinity,
    ease: "linear" as const
  }), []);

  const dropShadowFilter = useMemo(() =>
    isScanning 
      ? `drop-shadow(0 15px 15px hsl(var(--scan-line) / ${isMobile ? '0.2' : '0.3'}))`
      : `drop-shadow(0 10px 10px hsl(var(--document-shadow) / ${isMobile ? '0.15' : '0.2'}))`,
  [isScanning, isMobile]);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <motion.div
        className="w-40 h-52 sm:w-48 sm:h-64 md:w-56 md:h-72 rounded-xl sm:rounded-2xl relative overflow-hidden"
        style={{
          filter: dropShadowFilter
        }}
        animate={cardAnimation}
        transition={cardTransition}
      >
        <img 
          src={documentImages[type]} 
          alt={`${type} document`}
          className="w-full h-full object-contain"
          loading="lazy"
        />
        
        {isScanning && !isMobile && (
          <motion.div
            className="absolute left-0 right-0 h-1 sm:h-1.5 bg-linear-to-r from-transparent via-scan to-transparent"
            style={{
              boxShadow: "0 0 15px 4px hsl(var(--scan-line) / 0.6)"
            }}
            initial={{ top: "0%" }}
            animate={scanLineAnimation}
            transition={scanLineTransition}
          />
        )}
        
      </motion.div>
      
      {!isTablet && (
        <motion.div 
          className="absolute -bottom-4 left-8 right-8 h-4 sm:h-6 md:h-8 rounded-full blur-xl"
          style={{ background: "hsl(var(--document-shadow) / 0.15)" }}
          animate={shadowAnimation}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

export default memo(DocumentCard);
