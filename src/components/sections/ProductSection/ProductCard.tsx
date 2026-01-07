import { useEffect, useRef, useMemo, memo } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import circleImage from "../../../assets/circle.png";
import { hoverScale, tapScale } from "../../../utils/animations";

gsap.registerPlugin(ScrollTrigger);

interface ProductCardProps {
  badge: string;
  badgeColor: "orange" | "blue" | "brown";
  title: string;
  features: string[];
  benefits: string[];
  image: string;
  imageAlt: string;
  reversed?: boolean;
}

const ProductCard = ({
  badge,
  title,
  features,
  benefits,
  image,
  imageAlt,
  reversed = false,
}: ProductCardProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content
      gsap.fromTo(
        contentRef.current,
        { x: reversed ? 100 : -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true, // Only play once for performance
          },
        }
      );

      // Animate image
      gsap.fromTo(
        imageRef.current,
        { x: reversed ? -100 : 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true, // Only play once for performance
          },
        }
      );
    });

    return () => ctx.revert();
  }, [reversed]);

  // Memoize hover animations
  const buttonHover = useMemo(() => hoverScale, []);
  const buttonTap = useMemo(() => tapScale, []);
  const imageHover = useMemo(() => ({ scale: 1.02, y: -5 }), []);
  const imageTransition = useMemo(() => ({ duration: 0.3 }), []);
  const badgeInitial = useMemo(() => ({ scale: 0.9, opacity: 0 }), []);
  const badgeAnimate = useMemo(() => ({ scale: 1, opacity: 1 }), []);
  const badgeTransition = useMemo(() => ({ delay: 0.3 }), []);

  const Content = useMemo(() => (
    <div ref={contentRef} className="opacity-0">
      <motion.span
        initial={badgeInitial}
        whileInView={badgeAnimate}
        viewport={{ once: true }}
        transition={badgeTransition}
        className={`inline-block rounded-full leading-5 font-manrope font-bold tracking-normal text-base sm:text-lg md:text-xl bg-gradient-badge mb-4 sm:mb-6`}
      >
        {badge}
      </motion.span>

      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-raleway leading-tight md:leading-12 font-bold text-hero-subtitle mb-6 sm:mb-8">
        {title}
      </h3>

      <div className="mb-6">
        <h4 className="font-bold font-raleway text-lg sm:text-xl tracking-normal text-foreground mb-2 sm:mb-3">Features:</h4>
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-foreground text-sm sm:text-base leading-6 sm:leading-8 tracking-normal font-manrope font-normal">•</span>
              <span className="text-sm sm:text-base leading-6 sm:leading-8 tracking-normal font-manrope font-normal text-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h4 className="font-bold font-raleway text-lg sm:text-xl tracking-normal text-foreground mb-2 sm:mb-3">Benefits:</h4>
        <ul className="space-y-2 text-muted-foreground">
          {benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-foreground text-sm sm:text-base leading-6 sm:leading-8 tracking-normal font-manrope font-normal">•</span>
              <span className="text-sm sm:text-base leading-6 sm:leading-8 tracking-normal font-manrope font-normal text-muted-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 md:gap-8">
        <motion.button
          whileHover={buttonHover}
          whileTap={buttonTap}
          className={`px-6 sm:px-8 py-3 rounded-full bg-hero-title text-white transition-all font-semibold text-base sm:text-lg md:text-xl leading-5 tracking-normal font-raleway w-full sm:w-auto`}
          data-testid="product-learn-more"
        >
          Learn More
        </motion.button>
        <motion.button
          whileHover={buttonHover}
          whileTap={buttonTap}
          className="px-6 sm:px-8 py-3 rounded-full bg-hero-title text-white transition-all font-semibold text-base sm:text-lg md:text-xl leading-5 tracking-normal font-raleway w-full sm:w-auto"
          data-testid="product-schedule-demo"
        >
          Schedule a Demo
        </motion.button>
      </div>
    </div>
  ), [badge, title, features, benefits, buttonHover, buttonTap, badgeInitial, badgeAnimate, badgeTransition]);

  const ImageBlock = useMemo(() => (
    <div ref={imageRef} className="relative opacity-0  flex justify-center items-center">
      {/* Background circle */}
      <div className={`absolute ${reversed ? "-left-10 sm:-left-16 md:-left-20" : "-right-10 sm:-right-16 md:-right-20"} top-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] md:w-[700px] h-[300px] sm:h-[500px] md:h-[700px] pointer-events-none opacity-30`}>
        <img src={circleImage} alt="" className="w-full h-full object-contain" aria-hidden="true" />
      </div>
      <motion.div
        whileHover={imageHover}
        transition={imageTransition}
        className="relative z-10 rounded-2xl overflow-hidden"
      >
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-auto max-w-xs sm:max-w-md md:max-w-xl mx-auto"
          loading="lazy"
        />
      </motion.div>
    </div>
  ), [image, imageAlt, reversed, imageHover, imageTransition]);

  return (
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 xl:gap-80 items-center py-12 md:py-16 lg:py-24 ${reversed ? "lg:flex-row-reverse" : ""}`}>
      {reversed ? (
        <>
          <div className="order-2 lg:order-1">{ImageBlock}</div>
          <div className="order-1 lg:order-2">{Content}</div>
        </>
      ) : (
        <>
          {Content}
          {ImageBlock}
        </>
      )}
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders
export default memo(ProductCard);
