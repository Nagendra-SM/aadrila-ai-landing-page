import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "",
    message: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to local storage
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    const newSubmission = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now()
    };
    submissions.push(newSubmission);
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
    
    // Show success popup
    setShowPopup(true);
    
    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      inquiryType: "",
      message: "",
    });
    
    // Hide popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-0 overflow-hidden flex justify-center items-center"
    >
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 px-4 md:px-8 lg:px-12">
          {/* Left Content */}
          <div ref={contentRef} className="opacity-0 order-2 lg:order-1 mt-8 mb-2 lg:mt-0">
            <h2 className="text-hero-subtitle font-semibold font-raleway text-3xl md:text-5xl mb-4 md:mb-6">
              Contact Us
            </h2>
            <p className="font-manrope text-gradient-custom font-normal text-sm md:text-lg lg:text-xl mb-6 md:mb-12 max-w-md">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's.
            </p>

            {/* US Office */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-primary" />
                <h3 className="font-bold font-raleway text-sm md:text-md text-black underline">
                  U.S. Office
                </h3>
              </div>
              <p className="text-black font-normal text-xs md:text-sm font-manrope tracking-normal">
                Aadrila Technologies INC,
                <br />8 The Green, Ste R, in the City of Dover County of Kent
                Zip Code 19901.
              </p>
            </div>

            {/* India Office */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-primary" />
                <h3 className="font-bold font-raleway text-sm md:text-md text-black underline">
                  India Office
                </h3>
              </div>
              <p className="text-black font-normal text-xs md:text-sm font-manrope tracking-normal">
                Aadrila Technologies Private Limited,
                <br />
                Unit 707, Lotus Trade Centre, Sahakar Nagar, New Link Road, Near
                D.N.Nagar, Andheri West, Mumbai, Maharashtra 400053.
              </p>
            </div>
          </div>

          {/* Right Form */}
          <div ref={formRef} className="opacity-0 order-1 lg:order-2 lg:relative lg:top-20 lg:right-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-100/50 relative overflow-hidden"
            >
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
              <form onSubmit={handleSubmit} className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold font-raleway text-gray-900 mb-4 md:mb-6">
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div className="relative">
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-3 md:px-4 py-3 md:py-3.5 rounded-lg md:rounded-xl border border-[#959595] bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md text-sm md:text-base"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 md:px-4 py-3 md:py-3.5 rounded-lg md:rounded-xl border border-[#959595] bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md text-sm md:text-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 md:px-4 py-3 md:py-3.5 rounded-lg md:rounded-xl border border-[#959595] bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md text-sm md:text-base"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        name="company"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-3 md:px-4 py-3 md:py-3.5 rounded-lg md:rounded-xl border border-[#959595] bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md text-sm md:text-base"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-3 md:py-3.5 rounded-lg md:rounded-xl border border-[#959595] bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md appearance-none cursor-pointer text-sm md:text-base"
                    >
                      <option value="" className="text-gray-400">
                        Select Inquiry Type
                      </option>
                      <option value="sales" className="text-gray-900">
                        Sales Inquiry
                      </option>
                      <option value="support" className="text-gray-900">
                        Technical Support
                      </option>
                      <option value="partnership" className="text-gray-900">
                        Partnership
                      </option>
                      <option value="other" className="text-gray-900">
                        Other
                      </option>
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <textarea
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-3 md:py-3.5 rounded-lg md:rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md resize-none text-sm md:text-base"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.25)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full mt-4 md:mt-6 py-3 md:py-4 px-4 md:px-6 rounded-lg md:rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold font-raleway text-base md:text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl relative overflow-hidden group"
                >
                  <span className="relative z-10">Send Message</span>
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[hsl(205,70%,45%)] text-white py-6 md:py-10"
        >
          <div className="container px-4 md:px-8 lg:px-12">
            <p className="text-xs md:text-sm mb-2 md:mb-4">
              © 2025 by Aadrila Technologies Private Limited CIN
              U74999UP2017PTC094688
            </p>
            <p className="text-xs md:text-sm opacity-90">
              Registered Address: B-1, 127/K, Sector-K Aliganj, Lucknow,
              Lucknow,
              <br />
              Uttar Pradesh, India, 226024
            </p>
          </div>
        </motion.footer>
      </div>
      
      {/* Success Popup */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 max-w-md mx-4 md:mx-auto shadow-2xl border border-gray-100"
          >
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg md:text-2xl font-bold font-raleway text-gray-900 mb-2">
                Data Saved Successfully!
              </h3>
              <p className="text-sm md:text-base text-gray-600 font-manrope mb-4 md:mb-6">
                Your contact information has been saved and we'll get back to you soon.
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold font-raleway rounded-lg md:rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Footer;
