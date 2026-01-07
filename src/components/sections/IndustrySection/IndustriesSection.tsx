import { useEffect, useRef, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IndustryCard from "./IndustryCard";
import { InsuranceIcon, LendingIcon, HealthcareIcon } from "./IndustryIcons";
import circleImage from "../../../assets/circle.png";
import dotGroup from "../../../assets/dot-group.png";
import dotGroup3 from "../../../assets/dot-group3.png";

gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    icon: <InsuranceIcon />,
    title: "Insurance",
    description: "Automate claims processing with accurate document validation.",
  },
  {
    icon: <LendingIcon />,
    title: "Lending",
    description: "Ensure faster loan approvals with fraud detection and instant verification.",
  },
  {
    icon: <HealthcareIcon />,
    title: "Healthcare",
    description: "Streamline patient record management and ensure compliance with HIPAA standards.",
  },
];

const IndustriesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate tagline from left
      gsap.fromTo(
        taglineRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true, // Only play once for performance
          },
        }
      );

      // Animate heading from left with slight delay
      gsap.fromTo(
        headingRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true, // Only play once for performance
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-32 overflow-hidden bg-background"
      data-testid="industries-section"
    >
      {/* Background decorative circle */}
      <div className="absolute -left-32 sm:-left-20 md:-left-10 top-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] pointer-events-none opacity-80">
        <img
          src={circleImage}
          alt=""
          className="w-full h-full object-contain"
          aria-hidden="true"
          loading="lazy"
        />
      </div>

      {/* Dot pattern - top right */}
      <div className="absolute right-40 sm:right-60 md:right-80 top-20 sm:top-16 w-24 sm:w-32 md:w-40 lg:w-52 pointer-events-none opacity-60">
        <img
          src={dotGroup3}
          alt=""
          className="w-full h-auto"
          aria-hidden="true"
          loading="lazy"
        />
      </div>

      {/* Dot pattern - bottom right */}
      <div className="absolute right-0 bottom-16 sm:bottom-20 w-32 sm:w-48 md:w-64 lg:w-80 pointer-events-none opacity-50">
        <img
          src={dotGroup}
          alt=""
          className="w-full h-auto"
          aria-hidden="true"
          loading="lazy"
        />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 lg:mb-20">
          <p ref={taglineRef} className="mb-4 opacity-0 text-gradient-custom font-manrope font-bold text-xl sm:text-2xl lg:text-2xl tracking-normal">
            AI-driven innovation for growth.
          </p>
          <h2 ref={headingRef} className="text-hero-subtitle opacity-0 font-semibold text-3xl sm:text-4xl lg:text-5xl tracking-normal font-raleway leading-tight">
            Industries We Empower
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-24 max-w-5xl mx-auto sm:ml-8 md:ml-12 lg:ml-48">
          {/* Card positions matching the reference */}
          <div className="lg:mt-64 sm:mt-12 md:mt-24">
            <IndustryCard
              icon={industries[0].icon}
              title={industries[0].title}
              description={industries[0].description}
              delay={0.2}
            />
          </div>
          <div className="lg:mt-2 sm:mt-6 md:mt-12">
            <IndustryCard
              icon={industries[1].icon}
              title={industries[1].title}
              description={industries[1].description}
              delay={0.35}
            />
          </div>
          <div className="lg:mt-[-200px] sm:mt-8">
            <IndustryCard
              icon={industries[2].icon}
              title={industries[2].title}
              description={industries[2].description}
              delay={0.5}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Memoize to prevent unnecessary re-renders
export default memo(IndustriesSection);
