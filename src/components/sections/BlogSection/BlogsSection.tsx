import React, { useState, useMemo, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "../../common/SectionHeading";
import BlogCard from "./BlogCard";
import { useThrottledResize } from "../../../hooks/useThrottledResize";

const blogs = [
  {
    title: "How AI is Revolutionizing Document Management for Enterprises",
    date: "24 July, 2023",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and...",
  },
  {
    title: "Top 5 Fraud Prevention Strategies for Financial Institutions",
    date: "24 July, 2023",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and...",
  },
  {
    title: "The Future of OCR: From Basic Extraction to AI-Driven Intelligence",
    date: "24 July, 2023",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and...",
  },
  {
    title: "Automating Compliance: How AI Helps Financial Services Stay Ahead",
    date: "20 July, 2023",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and...",
  },
  {
    title: "Machine Learning in Healthcare: Document Processing Revolution",
    date: "18 July, 2023",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and...",
  },
];

const BlogsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Using throttled resize hook
  const { width } = useThrottledResize(150);
  
  // Memoize cards to show calculation
  const cardsToShow = useMemo(() => {
    if (width < 640) return 1; 
    if (width < 1024) return 2;
    return 3;
  }, [width]);
  
  const maxIndex = useMemo(() => Math.max(0, blogs.length - cardsToShow), [cardsToShow]);

  React.useEffect(() => {
    setCurrentIndex(0);
  }, [cardsToShow]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev - 1));
  }, [maxIndex]);

  const carouselAnimation = useMemo(() => ({
    x: `-${currentIndex * (100 / cardsToShow)}%`
  }), [currentIndex, cardsToShow]);

  const carouselTransition = useMemo(() => ({
    type: "spring" as const,
    stiffness: 300,
    damping: 30
  }), []);

  const buttonBaseClass = "w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[hsl(205,80%,45%)] text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-opacity";

  return (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-0 overflow-hidden" data-testid="blogs-section">

      <div className="container relative z-10 px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Mobile: Show only heading */}
        <div className="sm:hidden text-center mb-8">
          <h2 className="font-semibold text-3xl text-hero-subtitle tracking-normal font-raleway">
            Blogs
          </h2>
        </div>
        
        {/* Desktop/Tablet: Show full SectionHeading with tagline */}
        <div className="hidden sm:block">
          <SectionHeading
            headingFirst={true}
            heading="Blogs"
            tagline="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
            centered
            className="mb-8 sm:mb-12 md:mb-16 max-w-4xl mx-auto"
          />
        </div>

        {/* Blog Cards Carousel */}
        <div className="relative overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <motion.div
              animate={carouselAnimation}
              transition={carouselTransition}
              className="flex gap-4 sm:gap-8 lg:gap-16"
            >
              {blogs.map((blog, index) => (
                <div
                  key={index}
                  className="shrink-0 w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-21px)]"
                >
                  <BlogCard {...blog} delay={index * 0.1} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 md:mt-12">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={buttonBaseClass}
            data-testid="blog-prev-button"
            aria-label="Previous blogs"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={buttonBaseClass}
            data-testid="blog-next-button"
            aria-label="Next blogs"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default memo(BlogsSection);
