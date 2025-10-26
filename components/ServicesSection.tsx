import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MartexIcon, UserIcon, SendIcon } from './Icons';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const cardHoverVariant = {
  y: -8,
  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  transition: { type: 'spring', stiffness: 300 }
};

// --- Custom Visual Components ---

const WebsiteVisual = () => (
  <motion.div className="w-full h-full bg-gray-100 rounded-2xl p-4 flex gap-2 overflow-hidden border border-gray-200">
    <div className="w-full h-full flex flex-col gap-2 relative">
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
      </div>
      <motion.div
        className="flex-grow flex flex-col gap-2 min-h-0"
        variants={{
          animate: { transition: { staggerChildren: 0.2 } }
        }}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={{ initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 } }} className="h-4 w-1/3 bg-white rounded border border-gray-200" />
        <motion.div variants={{ initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 } }} className="h-10 w-full bg-white rounded border border-gray-200" />
        <motion.div variants={{ initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 } }} className="h-4 w-2/3 bg-white rounded border border-gray-200" />
        <motion.div variants={{ initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 } }} className="h-4 w-full bg-white rounded border border-gray-200" />
      </motion.div>
    </div>
    <div className="w-2 h-full bg-gray-200 rounded-full relative">
      <motion.div 
        className="w-full h-1/3 bg-gray-400 rounded-full absolute top-0 left-0"
        animate={{ y: ['0%', '200%'] }}
        transition={{ duration: 1, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
    </div>
  </motion.div>
);

const ChatbotVisual = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Fix: Changed NodeJS.Timeout to number for browser compatibility.
        let timers: (number | NodeJS.Timeout)[] = [];
        const sequence = () => {
            timers.push(setTimeout(() => setStep(1), 0)); // User msg
            timers.push(setTimeout(() => setStep(2), 1500)); // Bot typing
            timers.push(setTimeout(() => setStep(3), 3500)); // Bot response
            timers.push(setTimeout(() => {
                setStep(0); // Reset visual
                timers.push(setTimeout(sequence, 500)); // Restart sequence
            }, 5500));
        };

        timers.push(setTimeout(sequence, 500)); // Initial start

        return () => timers.forEach(clearTimeout);
    }, []);

    const dotVariants = {
      start: { y: "0%" },
      end: { y: "-50%" },
    };
    const dotTransition = {
      duration: 0.4,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut',
    } as const;

    return (
        <div className="w-full h-full bg-gray-100 rounded-2xl p-4 flex flex-col justify-end gap-2 border border-gray-200 overflow-hidden">
             <AnimatePresence>
                {step >= 1 && (
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 20 }} 
                        className="self-end flex items-center gap-2 max-w-[80%]"
                    >
                        <p className="bg-black text-white text-[10px] rounded-2xl px-3 py-1.5 leading-tight">Can you book a flight?</p>
                        <UserIcon className="h-6 w-6 bg-gray-200 text-gray-500 rounded-full p-1 flex-shrink-0"/>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {(step === 2 || step === 3) && (
                     <motion.div 
                         initial={{ opacity: 0, x: -50 }}
                         animate={{ opacity: 1, x: 0 }}
                         exit={{ opacity: 0, x: -50 }}
                         transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
                         className="self-start flex items-center gap-2 max-w-[80%]"
                     >
                        <MartexIcon className="h-6 w-6 bg-white text-black rounded-full p-1 border border-gray-200 flex-shrink-0"/>
                        
                        <AnimatePresence mode="wait">
                            {step === 2 && (
                                <motion.div
                                    key="typing"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center"
                                >
                                    <motion.div 
                                      className="flex items-center justify-center gap-1 bg-white rounded-2xl px-3 py-2 border border-gray-200"
                                      initial="start"
                                      animate="end"
                                    >
                                       <motion.span variants={dotVariants} transition={dotTransition} className="w-1 h-1 bg-gray-400 rounded-full" />
                                       <motion.span variants={dotVariants} transition={{ ...dotTransition, delay: 0.1 }} className="w-1 h-1 bg-gray-400 rounded-full" />
                                       <motion.span variants={dotVariants} transition={{ ...dotTransition, delay: 0.2 }} className="w-1 h-1 bg-gray-400 rounded-full" />
                                    </motion.div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="response"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
                                    className="flex items-center"
                                >
                                     <p className="bg-white text-black text-[10px] rounded-2xl px-3 py-1.5 leading-tight border border-gray-200">Absolutely! Where to?</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


const ARVRVisual = () => {
    const scanlineKeyframes = `
      @keyframes scanline {
        0% { transform: translateY(-100%); opacity: 0; }
        20% { opacity: 0.15; }
        80% { opacity: 0.15; }
        100% { transform: translateY(200%); opacity: 0; }
      }
    `;

    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden relative group" style={{ perspective: '800px' }}>
            <style>{scanlineKeyframes}</style>
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-500 group-hover:opacity-30"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=1200&auto=format&fit=crop")',
                    filter: 'blur(2px)',
                    transform: 'scale(1.1)'
                }}
            />
            {/* Scanline Effect */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent" style={{ animation: 'scanline 4s ease-in-out infinite' }}/>
            
            {/* 3D Hologram */}
            <motion.div
                className="w-24 h-24 relative"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
                <motion.div 
                    className="absolute inset-0"
                    animate={{ z: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Outer Ring */}
                    <div className="absolute w-24 h-24 border-2 border-cyan-400/50 rounded-full" style={{ transform: 'rotateX(75deg)', filter: 'drop-shadow(0 0 6px #22d3ee)' }} />
                    {/* Inner Ring */}
                    <div className="absolute w-16 h-16 top-4 left-4 border border-purple-400/50 rounded-full" style={{ transform: 'rotateX(-75deg)', filter: 'drop-shadow(0 0 4px #c084fc)' }} />
                    {/* Core Object */}
                     <div className="absolute w-8 h-8 top-8 left-8 bg-cyan-400/30 rounded-lg" style={{ transform: 'rotateX(45deg) rotateY(45deg)', backdropFilter: 'blur(2px)' }} />
                </motion.div>
            </motion.div>
        </div>
    );
};

const FashionProductCardVertical: React.FC<{ imageUrl: string }> = ({ imageUrl }) => (
    <div className="flex-shrink-0 h-40 w-full bg-white rounded-xl p-2 border border-gray-200 shadow-sm">
        <div className="w-full h-28 bg-gray-200 rounded-lg mb-2 bg-cover bg-center" style={{ backgroundImage: `url("${imageUrl}")` }}></div>
        <div className="h-2 w-full bg-gray-300 rounded-full mb-1"></div>
        <div className="h-2 w-1/2 bg-gray-300 rounded-full"></div>
    </div>
);

const FashionVisual = () => {
    const products = [
        { imageUrl: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=800&auto=format&fit=crop' },
        { imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop' },
        { imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop' },
        { imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop' },
    ];

    return (
        <div className="w-full h-full bg-gray-100 rounded-2xl border border-gray-200 p-4 overflow-hidden">
             <div className="relative w-full h-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
                    <div className="absolute left-0 top-0 w-full h-max flex flex-col animate-marquee-y group-hover:pause">
                        <div className='flex flex-col gap-4 pb-4'>
                            {products.map((product, i) => <FashionProductCardVertical key={`a-${i}`} imageUrl={product.imageUrl} />)}
                        </div>
                        <div className='flex flex-col gap-4 pb-4'>
                            {products.map((product, i) => <FashionProductCardVertical key={`b-${i}`} imageUrl={product.imageUrl} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const UIUXVisual = () => {
    const [isOrdered, setIsOrdered] = useState(false);

    useEffect(() => {
        const toggle = () => setIsOrdered(prev => !prev);
        const intervalId = setInterval(toggle, 1000);
        const timerId = setTimeout(() => setIsOrdered(true), 250);
        return () => {
            clearInterval(intervalId)
            clearTimeout(timerId)
        };
    }, []);

    const containerVariants = {
        disordered: { transition: { staggerChildren: 0.1, staggerDirection: -1 } },
        ordered: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    };

    const itemVariants = {
        disordered: (i: number) => ({ 
            opacity: 0, 
            y: (i % 2 === 0 ? 20 : -20),
            x: (i % 3 - 1) * 30,
            rotate: Math.random() * 40 - 20,
        }),
        ordered: {
            opacity: 1,
            y: 0,
            x: 0,
            rotate: 0,
            transition: { type: 'spring', stiffness: 150, damping: 20 }
        },
    };

    return (
        <motion.div 
            className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl border border-gray-200 p-4"
        >
            <motion.div 
                className="w-[150px] h-[120px] flex flex-col items-center gap-2"
                variants={containerVariants}
                initial="disordered"
                animate={isOrdered ? 'ordered' : 'disordered'}
            >
                <motion.div custom={0} variants={itemVariants} className="w-full h-12 bg-gray-300 rounded" />
                <motion.div custom={1} variants={itemVariants} className="w-3/4 h-4 bg-gray-300 rounded-sm" />
                <motion.div custom={2} variants={itemVariants} className="w-full h-3 bg-gray-200 rounded-sm" />
                <motion.div custom={3} variants={itemVariants} className="w-full h-3 bg-gray-200 rounded-sm" />
                <motion.div custom={4} variants={itemVariants} className="w-1/2 h-6 bg-black rounded-md mt-1" />
            </motion.div>
        </motion.div>
    );
};


const mediaMap: { [key: string]: { type: 'gif' | 'mp4', src: string } } = {
    "Website Development": { type: 'mp4', src: 'webdevelopment.mp4' },
    "AI Chatbots": { type: 'gif', src: 'ai chatbots.gif' },
    "AR / VR Experiences": { type: 'gif', src: 'ARVR2.gif' },
    "Fashion & Brand Websites": { type: 'mp4', src: 'Fashion & Brand Websites.mp4' },
    "UI / UX Design": { type: 'gif', src: 'uiux.gif' },
};

const ServiceCard: React.FC<{
    title: string;
    description: string;
    className?: string;
}> = ({ title, description, className }) => {
    const media = mediaMap[title];
    return (
        <motion.div
            className={`bg-white p-6 rounded-3xl border border-gray-200 flex flex-col overflow-hidden group ${className}`}
            variants={{...itemVariants, hover: cardHoverVariant}}
            whileHover="hover"
        >
            <div className="h-48 mb-6 rounded-2xl overflow-hidden">
               {media ? (
                   media.type === 'gif' ? (
                       <img src={`card videos/${media.src}`} alt={title} className="w-full h-full object-cover" />
                   ) : (
                       <video src={`card videos/${media.src}`} autoPlay muted loop className="w-full h-full object-cover" />
                   )
               ) : null}
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 flex-grow">{description}</p>
        </motion.div>
    );
};


const ServicesSection: React.FC = () => {
    const services = [
        { title: "Website Development", description: "Beautiful, fast, and responsive websites crafted for seamless performance and modern appeal.", className: "md:col-span-3" },
        { title: "AI Chatbots", description: "Smart, conversational assistants that handle your customers with precision and personality.", className: "md:col-span-2" },
        { title: "AR / VR Experiences", description: "Immersive environments that blend creativity with technology for stunning user engagement.", className: "md:col-span-2" },
        { title: "Fashion & Brand Websites", description: "Elegant, trend-driven designs that highlight products with class and simplicity.", className: "md:col-span-3" },
        { title: "UI / UX Design", description: "Interfaces built with empathy, clarity, and balance — every pixel has a purpose.", className: "md:col-span-5" },
    ];
    
    return (
        <motion.section 
            id="services"
            className="py-20 md:py-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container mx-auto px-4">
                <motion.div className="text-center mb-16" variants={itemVariants}>
                    <div className="inline-flex items-center bg-white border border-gray-200 rounded-full px-3 py-1 text-xs font-medium text-gray-600 mb-6">
                        <span className="mr-2">🔧</span>
                        SERVICES
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Our Services</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We offer a range of services to bring your digital vision to life.
                    </p>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-6xl mx-auto"
                    variants={sectionVariants}
                >
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            title={service.title}
                            description={service.description}
                            className={service.className}
                        />
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
};

export default ServicesSection;
