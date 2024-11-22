import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AboutUsPage = () => {
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Generate background elements
  const generateElements = (count, type) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: type === 'shape' ? Math.random() * 200 + 100 : Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
  };

  const shapes = generateElements(6, 'shape');
  const particles = generateElements(30, 'particle');
  const glowOrbs = generateElements(4, 'orb');

  // Add CSS styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .cosmic-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(125deg, #7dd3fc 0%, #e0f2fe 50%, #ddd6fe 100%);
        overflow: hidden;
        z-index: -1;
      }

      .particle {
        position: absolute;
        background: white;
        border-radius: 50%;
        pointer-events: none;
      }

      .glow-orb {
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle at center, 
          rgba(147, 51, 234, 0.15) 0%, 
          rgba(79, 70, 229, 0.15) 50%, 
          transparent 70%);
        filter: blur(20px);
      }

      .aurora {
        position: absolute;
        width: 200%;
        height: 200%;
        background: linear-gradient(
          45deg,
          rgba(76, 29, 149, 0.1) 0%,
          rgba(124, 58, 237, 0.1) 25%,
          rgba(219, 39, 119, 0.1) 50%,
          rgba(236, 72, 153, 0.1) 75%
        );
        filter: blur(60px);
        animation: rotateAurora 30s linear infinite;
        transform-origin: center;
      }

      @keyframes rotateAurora {
        from { transform: rotate(0deg) scale(1.5); }
        to { transform: rotate(360deg) scale(1.5); }
      }

      .glass-effect {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
      }

      .hover-scale {
        transition: transform 0.3s ease;
      }

      .hover-scale:hover {
        transform: scale(1.05);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <>
      <div className="cosmic-background">
        <div className="aurora" />
        
        {particles.map(particle => (
          <motion.div
            key={`particle-${particle.id}`}
            className="particle"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.left}%`,
              top: `${particle.top}%`
            }}
            animate={{
              y: [-20, 20],
              x: [-10, 10],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: particle.duration / 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {glowOrbs.map(orb => (
          <motion.div
            key={`orb-${orb.id}`}
            className="glow-orb"
            style={{
              width: orb.size * 2,
              height: orb.size * 2,
              left: `${orb.left}%`,
              top: `${orb.top}%`
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={pageVariants}
        className="relative min-h-screen overflow-hidden"
      >
        {shapes.map(shape => (
          <motion.div
            key={shape.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-200/20 to-purple-200/20 blur-xl"
            style={{
              width: shape.size,
              height: shape.size,
              left: `${shape.left}%`,
              top: `${shape.top}%`,
              zIndex: 0
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        <div className="relative z-10 p-6 space-y-16">
          <motion.h1 
            variants={itemVariants}
            className="text-5xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Know About Us
          </motion.h1>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col lg:flex-row items-center glass-effect rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 space-y-8 lg:space-y-0 lg:space-x-8"
          >
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                We strive to create a seamless connection between local vendors and customers, 
                empowering small businesses while providing convenience and quality to our community. 
                Our platform serves as a bridge, bringing together the best of local commerce with modern technology.
              </p>
            </div>
            <div className="lg:w-1/2">
              <motion.img 
                src="https://img.freepik.com/free-vector/business-team-putting-together-jigsaw-puzzle-isolated-flat-vector-illustration-cartoon-partners-working-connection-teamwork-partnership-cooperation-concept_74855-9814.jpg"
                alt="Mission illustration"
                className="rounded-lg shadow-lg hover-scale"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <div className="glass-effect p-6 rounded-xl hover-scale">
              <h3 className="text-2xl font-bold text-purple-600 mb-3">Innovation</h3>
              <p className="text-gray-700">Leveraging cutting-edge technology to provide the best possible experience for vendors and customers alike.</p>
            </div>
            <div className="glass-effect p-6 rounded-xl hover-scale">
              <h3 className="text-2xl font-bold text-blue-600 mb-3">Community</h3>
              <p className="text-gray-700">Building strong relationships between local businesses and customers to create a thriving marketplace.</p>
            </div>
            <div className="glass-effect p-6 rounded-xl hover-scale">
              <h3 className="text-2xl font-bold text-indigo-600 mb-3">Quality</h3>
              <p className="text-gray-700">Ensuring high standards and exceptional service in every transaction on our platform.</p>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="glass-effect p-8 rounded-2xl text-center"
          >
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Join Our Growing Community</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Whether you're a vendor looking to expand your reach or a customer seeking quality local products,
              we're here to help you succeed. Join us in building a stronger, more connected local economy.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default AboutUsPage;