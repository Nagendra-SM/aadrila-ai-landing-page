import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { fadeInUpVariants, hoverLift } from "../../../utils/animations";

interface BlogCardProps {
  title: string;
  date: string;
  excerpt: string;
  delay?: number;
}

const BlogCard = ({ title, date, excerpt, delay = 0 }: BlogCardProps) => {
  const animationVariants = useMemo(() => fadeInUpVariants, []);
  const hoverAnimation = useMemo(() => hoverLift, []);

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={delay}
      variants={animationVariants}
      whileHover={hoverAnimation}
      className="bg-card rounded-xl p-4 sm:p-6 shadow-sm border border-border/50 cursor-pointer group flex flex-col h-full"
      data-testid="blog-card"
    >
      <h3 className="text-base sm:text-lg font-bold text-hero-subtitle mb-2 group-hover:text-primary transition-colors leading-tight font-raleway line-clamp-2">
        {title}
      </h3>
      <p className="text-[#719AD0] font-medium text-xs sm:text-sm mb-3 sm:mb-4">{date}</p>
      <p className="text-foreground font-normal text-xs sm:text-sm leading-relaxed line-clamp-3">
        {excerpt}
      </p>
      
      {/* Gradient bottom border */}
      <div className="mt-4 sm:mt-6 h-1 w-full rounded-full bg-gradient-to-r from-primary/20 via-[hsl(280,70%,80%)] to-[hsl(200,80%,80%)]" />
    </motion.article>
  );
};

export default memo(BlogCard);
