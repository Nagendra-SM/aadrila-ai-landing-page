import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  tagline: string;
  heading: string;
  centered?: boolean;
  headingFirst?: boolean;
  className?: string;
}

const SectionHeading = ({ tagline, heading, centered = false, headingFirst = false, className = "" }: SectionHeadingProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate first element
      const firstElement = headingFirst ? headingRef.current : taglineRef.current;
      const secondElement = headingFirst ? taglineRef.current : headingRef.current;

      gsap.fromTo(
        firstElement,
        { x: centered ? 0 : -80, y: centered ? 30 : 0, opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        secondElement,
        { x: centered ? 0 : -100, y: centered ? 30 : 0, opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [centered, headingFirst]);

  return (
    <div ref={containerRef} className={`${centered ? "text-center" : ""} ${className}`}>
      {headingFirst ? (
        <>
          <h2 ref={headingRef} className="opacity-0 font-semibold text-5xl text-center text-hero-subtitle tracking-normal font-raleway mb-4">
            {heading}
          </h2>
          <p ref={taglineRef} className="text-gradient-custom font-bold text-2xl tracking-normal opacity-0 font-manrope">
            {tagline}
          </p>
        </>
      ) : (
        <>
          <p ref={taglineRef} className="text-gradient-custom font-bold text-2xl tracking-normal mb-4 opacity-0 font-manrope">
            {tagline}
          </p>
          <h2 ref={headingRef} className="opacity-0 font-semibold text-5xl text-center text-hero-subtitle tracking-normal font-raleway">
            {heading}
          </h2>
        </>
      )}
    </div>
  );
};

export default SectionHeading;
