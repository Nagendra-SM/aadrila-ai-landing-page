import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import circleImage from "../../../assets/circle.png";
import dotGroupImage from "../../../assets/dot-group.png";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'MANSI SHUKLA',
    role: 'Co-Founder',
    description: 'For this time-constrained generation in a NOW economy, we would want to play our parts. We intend to make Banking not feel out of place.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
  },
  {
    id: 2,
    name: 'JESSICA WILLIAMS',
    role: 'CEO & Founder',
    description: 'Leading with vision and passion to transform the future of document management and bring innovative solutions to our clients worldwide.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
  },
  {
    id: 3,
    name: 'DAVID THOMPSON',
    role: 'Chief Technology Officer',
    description: 'Driving technological innovation and excellence, ensuring our platform stays at the forefront of industry standards and best practices.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
  },
];

const MeetOurTeam = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
  };

  const getVisibleMembers = () => {
    const prev = activeIndex === 0 ? teamMembers.length - 1 : activeIndex - 1;
    const next = activeIndex === teamMembers.length - 1 ? 0 : activeIndex + 1;
    return [prev, activeIndex, next];
  };

  const visibleIndices = getVisibleMembers();

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-white py-8 md:py-24 overflow-hidden"
    >
      <div className="absolute top-10 left-0 w-48 h-48 md:w-[500px] md:h-[500px] opacity-20 pointer-events-none">
        <img
          src={circleImage}
          alt=""
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="absolute top-32 right-4 md:right-16 w-20 h-24 md:w-40 md:h-48 opacity-40 pointer-events-none">
        <img
          src={dotGroupImage}
          alt=""
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold font-raleway text-hero-subtitle tracking-normal mb-4">
            Meet our team
          </h2>
          <p className="text-gradient-custom text-xs md:text-lg lg:text-2xl font-normal max-w-3xl mx-auto leading-relaxed tracking-normal font-manrope px-4 md:px-0">
            Meet our passionate and talented team, committed to delivering exceptional
            results, driving innovation, and transforming your vision into reality.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center items-center gap-4 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevious}
            className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-hero-title text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors cursor-pointer"
            aria-label="Previous team member"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-hero-title text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors cursor-pointer"
            aria-label="Next team member"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        </motion.div>

        <div className="flex justify-center items-end gap-2 md:gap-8 mb-8 min-h-[140px] md:min-h-[220px] px-4">
          {visibleIndices.map((memberIndex, position) => {
            const isActive = position === 1;
            const member = teamMembers[memberIndex];

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isActive ? 1 : 0.5,
                  y: 0,
                  scale: isActive ? 1.1 : 0.7,
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex-shrink-0"
              >
                <motion.div
                  whileHover={{ scale: isActive ? 1.15 : 0.75 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`rounded-full overflow-hidden border-4 ${
                    isActive ? 'border-title shadow-2xl' : 'border-hero-title'
                  } ${isActive ? 'w-24 h-24 md:w-40 md:h-40' : 'w-16 h-16 md:w-28 md:h-28'}`}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-16 md:border-l-20 border-l-transparent border-r-16 md:border-r-20 border-r-transparent border-b-16 md:border-b-20 border-b-blue-600" />

              <div className="bg-hero-title rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 shadow-2xl text-center text-white flex flex-col items-center justify-center gap-4 mx-4 md:mx-0">
                <h3 className="text-lg md:text-2xl lg:text-4xl font-bold mb-2 text-white font-raleway">
                  {teamMembers[activeIndex].name}
                </h3>
                <p className="text-title text-sm md:text-lg lg:text-2xl font-normal tracking-normal leading-relaxed mb-4 md:mb-6 font-manrope">
                  {teamMembers[activeIndex].role}
                </p>
                <p className="text-xs md:text-sm text-white font-normal tracking-normal leading-relaxed max-w-2xl mx-auto">
                  {teamMembers[activeIndex].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeam;
