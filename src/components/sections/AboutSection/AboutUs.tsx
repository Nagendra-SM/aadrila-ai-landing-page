import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu } from "lucide-react";

interface VisionMissionCardProps {
  title: string;
  description: string;
  isReversed?: boolean;
  isMobile?: boolean;
}

const VisionMissionCard = ({
  title,
  description,
  isReversed = false,
  isMobile = false,
}: VisionMissionCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  if (isMobile) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-xl p-6 mx-auto max-w-md"
      >
        <div className="flex flex-col items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-hero-title flex items-center justify-center shadow-lg shrink-0">
            <Cpu
              className="w-6 h-6 text-white"
              strokeWidth={1.5}
            />
          </div>
          <h3 className="text-xl font-bold text-hero-subtitle font-raleway text-center">
            {title}
          </h3>
        </div>
        <p className="text-sm font-medium font-manrope text-foreground leading-relaxed">
          {description}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex items-center gap-6 md:gap-8 p-3.5 ${
        isReversed ? "flex-row-reverse" : "flex-row"
      } w-full max-w-4xl mx-auto bg-[#FFFFFF80] ${
        isReversed
          ? "rounded-tr-[500px] rounded-br-[500px]"
          : "rounded-tl-[500px] rounded-bl-[500px]"
      } `}
      style={{ boxShadow: "0px 0px 20px 0px #0000001F" }}
    >
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="flex-shrink-0"
      >
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-hero-title flex items-center justify-center shadow-lg">
          <Cpu
            className="w-8 h-8 md:w-10 md:h-10 text-white"
            strokeWidth={1.5}
          />
        </div>
      </motion.div>

      <div
        className={`flex justify-center items-center ${
          isReversed ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <h3 className="text-xl md:text-2xl leading-10 tracking-normal font-bold text-hero-subtitle mb-2 font-raleway">
          {title}
        </h3>
        <div
          className={`w-1 h-16 bg-orange-500 ${isReversed ? "mr-4" : "mr-4"}`}
        />
        <p className="text-sm md:text-base font-medium font-manrope tracking-normal text-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const AboutUs = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section className="relative md:min-h-screen py-8 md:py-24 overflow-hidden">
      <div className="absolute top-0 right-0 h-full w-2 opacity-60" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: -30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-8 md:mb-24"
        >
          <div className="inline-block bg-white rounded-2xl shadow-xl px-6 py-6 md:px-16 md:py-10">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold font-raleway text-hero-subtitle tracking-normal mb-3">
              About Us
            </h2>
            <p className="text-gradient-custom font-manrope text-sm md:text-xl font-normal tracking-normal">
              Meet the Minds Shaping Document Automation.
            </p>
          </div>
        </motion.div>

        <div className="md:space-y-24">
          <div className="block md:hidden space-y-8">
            <VisionMissionCard
              title="Our Mission"
              description="To redefine document management with cutting-edge technology that ensures accuracy, efficiency, and trust."
              isMobile
            />
            <VisionMissionCard
              title="Our Vision"
              description="To redefine document management with cutting-edge technology that ensures accuracy, efficiency, and trust."
              isMobile
            />
          </div>
          <div className="hidden md:block md:space-y-24">
            <div className="relative top-0 right-80">
              <VisionMissionCard
                title="Our Mission"
                description="To redefine document management with cutting-edge technology that ensures accuracy, efficiency, and trust."
                isReversed
              />
            </div>
            <div className="relative top-0 left-80">
              <VisionMissionCard
                title="Our Vision"
                description="To redefine document management with cutting-edge technology that ensures accuracy, efficiency, and trust."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
