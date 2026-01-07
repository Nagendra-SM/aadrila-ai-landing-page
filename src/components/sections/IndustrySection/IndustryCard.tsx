import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { fadeInUpVariants } from "../../../utils/animations";

interface IndustryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const IndustryCard = ({ icon, title, description, delay = 0 }: IndustryCardProps) => {
  // Memoize animation configuration
  const animationVariants = useMemo(() => fadeInUpVariants, []);
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      custom={delay}
      variants={animationVariants}
      viewport={{ once: true, margin: "-100px" }}
      className="industry-card px-4 sm:px-6 py-8 sm:py-12 lg:py-16"
      data-testid="industry-card"
    >
      <div className="industry-icon">
        {icon}
      </div>
      <h3 className="text-xl sm:text-2xl lg:text-2xl font-semibold font-raleway text-hero-subtitle text-center mb-2 sm:mb-3">
        {title}
      </h3>
      <p className="text-center font-manrope font-medium text-sm sm:text-base lg:text-md text-[#696969] leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

// Memoize to prevent re-renders when parent re-renders
export default memo(IndustryCard);
