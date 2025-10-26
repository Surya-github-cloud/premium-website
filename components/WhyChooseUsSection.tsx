import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useTime, useTransform } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.2
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

const DesignVisual = () => {
    const [isOrganized, setIsOrganized] = useState(false);
    const colors = ['#f87171', '#60a5fa', '#4ade80', '#fb923c', '#c084fc'];
    const numDots = 5;

    // A static set of random positions for chaos, so they don't jump on every re-render
    const chaosPositions = React.useMemo(() => 
        [...Array(numDots)].map(() => ({
            x: 75 + (Math.random() - 0.5) * 100,
            y: 50 + (Math.random() - 0.5) * 70,
        })),
        []
    );

    useEffect(() => {
        const toggle = () => setIsOrganized(prev => !prev);
        // Start organized after a short delay
        const initialTimer = setTimeout(() => setIsOrganized(true), 500);
        // Then toggle back and forth
        const interval = setInterval(toggle, 4000);
        return () => {
            clearInterval(interval);
            clearTimeout(initialTimer);
        };
    }, []);

    const centerPoint = { x: 75, y: 50 };
    const purposeSpacing = 18;

    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl border border-gray-200 p-4 overflow-hidden">
            <svg viewBox="0 0 150 100" className="w-full h-full">
                <motion.g>
                    {[...Array(numDots)].map((_, i) => (
                        <motion.circle
                            key={i}
                            r={5}
                            fill={colors[i % colors.length]}
                            initial={false}
                            animate={{
                                cx: isOrganized ? centerPoint.x + (i - (numDots - 1) / 2) * purposeSpacing : chaosPositions[i].x,
                                cy: isOrganized ? centerPoint.y : chaosPositions[i].y,
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 150,
                                damping: 20,
                                delay: isOrganized ? i * 0.05 : (numDots - i - 1) * 0.05
                            }}
                        />
                    ))}
                </motion.g>
            </svg>
        </div>
    );
};


const ExperienceVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl border border-gray-200 p-4 overflow-hidden">
            <motion.div
                className="bg-white border border-gray-200 rounded-lg p-3 flex flex-col gap-2 shadow-inner"
                animate={{
                    width: ['120px', '60px', '120px'],
                    height: ['80px', '100px', '80px'],
                }}
                transition={{
                    duration: 4,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'mirror',
                }}
            >
                <div className="h-4 w-1/2 bg-gray-300 rounded" />
                <div className="h-8 w-full bg-gray-400 rounded-md" />
                <div className="h-4 w-3/4 bg-gray-300 rounded" />
            </motion.div>
        </div>
    );
};

const TechTalkVisual = () => {
    const time = useTime();

    // A master sine wave to control the amplitude of all waves over a slow loop, making them diverge and converge
    const masterAmplitude = useTransform(time, t => {
        const slowFrequency = 0.0005;
        return (Math.sin(t * slowFrequency) + 1) / 2; // Normalizes to 0-1 range
    });

    const createWavePath = (config: { baseAmplitude: number, frequency: number, phaseShift: number }) => {
        return useTransform([time, masterAmplitude], ([t, masterAmp]) => {
            const speed = 0.002;
            const phase = t * speed + config.phaseShift;
            const amplitude = config.baseAmplitude * masterAmp; // Amplitude is controlled by the master
            const verticalOffset = 50;

            let path = `M 10 ${verticalOffset}`;
            for (let x = 10; x <= 140; x += 2) {
                const y = amplitude * Math.sin(x * config.frequency + phase) + verticalOffset;
                path += ` L ${x} ${y}`;
            }
            return path;
        });
    };
    
    const waveConfigs = [
        { baseAmplitude: 15, frequency: 0.04, phaseShift: 0 },
        { baseAmplitude: 10, frequency: 0.06, phaseShift: Math.PI / 2 },
        { baseAmplitude: 20, frequency: 0.035, phaseShift: Math.PI },
    ];

    const wavePaths = waveConfigs.map(createWavePath);

    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl border border-gray-200 p-4 overflow-hidden">
            <svg viewBox="0 0 150 100" className="w-full h-full">
                 {wavePaths.map((path, index) => (
                    <motion.path
                        key={index}
                        d={path}
                        stroke="#4b5563" // A sophisticated dark gray
                        strokeWidth="1" // Ultra-fine lines
                        fill="transparent"
                        strokeLinecap="round"
                    />
                ))}
            </svg>
        </div>
    );
};

const ImmersiveVisual = () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl border border-gray-200 p-4 overflow-hidden" style={{ perspective: '600px' }}>
        <motion.div
            className="w-24 h-24 relative"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: 360, rotateX: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
            <motion.div 
                className="absolute inset-0"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ z: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
                {/* Outer Ring */}
                <div 
                    className="absolute w-24 h-24 border-2 border-black/20 rounded-full" 
                    style={{ transform: 'rotateX(75deg)' }} 
                />
                {/* Inner Ring */}
                <div 
                    className="absolute w-16 h-16 top-4 left-4 border border-black/20 rounded-full" 
                    style={{ transform: 'rotateX(-75deg)' }} 
                />
                {/* Core Object */}
                 <div 
                    className="absolute w-8 h-8 top-8 left-8 bg-black/20 rounded-lg" 
                    style={{ transform: 'rotateX(45deg) rotateY(45deg)' }} 
                />
            </motion.div>
        </motion.div>
    </div>
);


const mediaMap: { [key: string]: { type: 'gif' | 'mp4', src: string } } = {
    'Design With Purpose, Not Just Pixels': { type: 'mp4', src: 'design with purpose.mp4' },
    'Creating Experiences That Feel Alive': { type: 'mp4', src: 'creative experiences.mp4' },
    'Technology That Talks to You': { type: 'mp4', src: 'Technology That Talks to You2.mp4' },
    'Immersive Realities, Real-World Impact': { type: 'mp4', src: 'AR VR.mp4' },
};

const BenefitCard: React.FC<{ title: string, description: string, className?: string }> = ({ title, description, className }) => {
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


const WhyChooseUsSection: React.FC = () => {
    const benefits = [
        { title: 'Design With Purpose, Not Just Pixels', description: 'Before jumping into design or development, we dive deep into your goals. We focus on why it matters — and build from there.', className: 'md:col-span-3' },
        { title: 'Creating Experiences That Feel Alive', description: 'Our web solutions go beyond static pages. We integrate smart interfaces and adaptive designs.', className: 'md:col-span-2' },
        { title: 'Technology That Talks to You', description: 'We design AI-powered conversational systems that understand, respond, and assist in real time.', className: 'md:col-span-2' },
        { title: 'Immersive Realities, Real-World Impact', description: 'Through AR and VR innovations, we turn imagination into interaction — letting customers experience products in new ways.', className: 'md:col-span-3' },
    ];

  return (
    <motion.section 
      id="about-us"
      className="py-20 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center bg-white border border-gray-200 rounded-full px-3 py-1 text-xs font-medium text-gray-600 mb-6">
            <span className="mr-2">💡</span>
            OUR APPROACH
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">What Makes Us Different?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
            We don’t just build websites or apps; we craft immersive, intelligent, and interactive experiences that connect brands with users meaningfully.
          </p>
        </motion.div>

        <motion.div 
            className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-6xl mx-auto"
            variants={sectionVariants}
        >
          {benefits.map((benefit, index) => (
            <BenefitCard 
                key={index} 
                title={benefit.title} 
                description={benefit.description} 
                className={benefit.className}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhyChooseUsSection;