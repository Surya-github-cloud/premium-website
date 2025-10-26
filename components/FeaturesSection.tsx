import React from 'react';
import { motion, useTime, useTransform } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      staggerChildren: 0.2,
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

const VisionVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl border border-gray-200 p-4 overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <filter id="gooey">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                            result="goo"
                        />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
                <g filter="url(#gooey)">
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="20"
                        fill="#6366f1"
                    />
                    <motion.circle
                        r="12"
                        fill="#818cf8"
                        animate={{
                            cx: [50, 65, 50, 35, 50],
                            cy: [35, 50, 65, 50, 35],
                        }}
                        transition={{
                            duration: 6,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                    />
                    <motion.circle
                        r="10"
                        fill="#a5b4fc"
                        animate={{
                            cx: [50, 40, 50, 60, 50],
                            cy: [60, 50, 40, 50, 60],
                        }}
                        transition={{
                            duration: 5,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                </g>
            </svg>
        </div>
    );
};

const FunctionalityVisual = () => {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl border border-gray-200 p-4 overflow-hidden">
            <svg viewBox="0 0 150 100" className="w-full h-full">
                {/* Core System */}
                <motion.rect
                    x="55"
                    y="30"
                    width="40"
                    height="40"
                    rx="4"
                    fill="#4b5563" // Dark gray
                />

                {/* Scalable Feature 1 (Left) */}
                <motion.rect
                    y="35"
                    width="20"
                    height="30"
                    rx="4"
                    fill="#9ca3af" // Lighter gray
                    animate={{
                        x: [-30, 30, 30, -30, -30],
                        opacity: [0, 1, 1, 0, 0]
                    }}
                    transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                        times: [0, 0.2, 0.5, 0.7, 1]
                    }}
                />

                {/* Scalable Feature 2 (Right) */}
                <motion.rect
                    y="35"
                    width="20"
                    height="30"
                    rx="4"
                    fill="#9ca3af" // Lighter gray
                    animate={{
                        x: [160, 100, 100, 160, 160],
                        opacity: [0, 1, 1, 0, 0]
                    }}
                    transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                        times: [0, 0.2, 0.5, 0.7, 1]
                    }}
                />

                {/* Tailored Feature (Top) */}
                <motion.rect
                    x="60"
                    width="30"
                    height="20"
                    rx="4"
                    fill="#6366f1" // Indigo to show it's different
                     animate={{
                        y: [-30, -30, 5, 5, -30],
                        opacity: [0, 0, 1, 1, 0]
                    }}
                    transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                        times: [0, 0.7, 0.85, 0.95, 1]
                    }}
                />
            </svg>
        </div>
    );
};


const DeliveryVisual = () => {
    const center = { x: 50, y: 50 };
    const radius = 38;
    const numStages = 4;
    const totalDuration = 2.0;

    const getPolygonPath = (sides: number) => {
        let d = "";
        for (let i = 0; i < sides; i++) {
            const angle = (i / sides) * 2 * Math.PI - Math.PI / 2;
            const x = center.x + radius * Math.cos(angle);
            const y = center.y + radius * Math.sin(angle);
            d += `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }
        d += " Z";
        return d;
    };

    const shapes = [
        { d: getPolygonPath(6) },
        { d: getPolygonPath(12) },
        { d: getPolygonPath(24) },
    ];

    const stageTime = 1 / numStages;

    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl border border-gray-200 p-4 overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full">
                {shapes.map((shape, i) => {
                    const startTime = i * stageTime;
                    const endTime = (i + 1) * stageTime;
                    const traceStartTime = startTime + (stageTime * 0.05);
                    const traceEndTime = endTime - (stageTime * 0.05);
                    
                    return (
                        <g key={i}>
                            {/* Wireframe */}
                            <motion.path
                                d={shape.d}
                                stroke="#9ca3af"
                                strokeWidth="1.5"
                                fill="none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 1, 0, 0] }}
                                transition={{
                                    duration: totalDuration,
                                    times: [0, startTime, endTime - 0.01, endTime, 1],
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                            {/* Tracer */}
                            <motion.path
                                d={shape.d}
                                stroke="#111827"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{
                                    pathLength: [0, 0, 1, 1, 1],
                                    opacity: [0, 1, 1, 0, 0],
                                }}
                                transition={{
                                    pathLength: {
                                        duration: totalDuration,
                                        times: [0, traceStartTime, traceEndTime, traceEndTime + 0.001, 1],
                                        repeat: Infinity,
                                        ease: "linear",
                                    },
                                    opacity: {
                                        duration: totalDuration,
                                        times: [0, startTime, endTime - 0.01, endTime, 1],
                                        repeat: Infinity,
                                        ease: "linear",
                                    }
                                }}
                            />
                        </g>
                    )
                })}

                {/* Final Solid Circle */}
                <motion.circle
                    cx={center.x}
                    cy={center.y}
                    r={radius}
                    fill="#111827"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                        opacity: [0, 0, 1, 1, 0],
                        scale:   [0.95, 0.95, 1, 1, 0.95]
                    }}
                    transition={{
                        duration: totalDuration,
                        times: [0, (numStages - 1) * stageTime, ((numStages - 1) * stageTime) + (stageTime * 0.2), 0.99, 1],
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </svg>
        </div>
    );
};


const CreativeTechnicalVisual = () => {
    const time = useTime();
    const duration = 4000; // 4 second loop

    // Sinusoidal progress: 0 -> 1 -> 0
    const progress = useTransform(time, t => (1 - Math.cos((t / duration) * 2 * Math.PI)) / 2);

    const createWavePath = (config: { y: number, baseAmplitude: number, freq: number, phase: number }) => {
        // Amplitude decreases as progress -> 1
        const amplitude = useTransform(progress, p => config.baseAmplitude * (1 - p));
        return useTransform(amplitude, amp => {
            let path = `M 0 ${config.y}`;
            for (let x = 0; x <= 100; x += 4) {
                path += ` L ${x} ${config.y + Math.sin(x * config.freq + config.phase) * amp}`;
            }
            return path;
        });
    };

    const createGridLine = (config: { isVertical: boolean, pos: number, baseAmplitude: number, freq: number, phase: number }) => {
        // Amplitude increases as progress -> 1
        const amplitude = useTransform(progress, p => config.baseAmplitude * p);
        return useTransform(amplitude, amp => {
            let path;
            if (config.isVertical) {
                path = `M ${config.pos} 0`;
                for (let y = 0; y <= 100; y += 4) {
                    path += ` L ${config.pos + Math.sin(y * config.freq + config.phase) * amp} ${y}`;
                }
            } else {
                path = `M 0 ${config.pos}`;
                for (let x = 0; x <= 100; x += 4) {
                    path += ` L ${x} ${config.pos + Math.sin(x * config.freq + config.phase) * amp}`;
                }
            }
            return path;
        });
    };
    
    const waves = [
        { y: 20, baseAmplitude: 10, freq: 0.1, phase: 0 },
        { y: 40, baseAmplitude: 12, freq: 0.08, phase: 2 },
        { y: 60, baseAmplitude: 8, freq: 0.12, phase: 4 },
        { y: 80, baseAmplitude: 10, freq: 0.09, phase: 1 },
    ].map(createWavePath);

    const gridLines = [
        ...[20, 40, 60, 80].map(pos => ({ isVertical: true, pos, baseAmplitude: 8, freq: 0.1, phase: pos / 10 })),
        ...[20, 40, 60, 80].map(pos => ({ isVertical: false, pos, baseAmplitude: 8, freq: 0.1, phase: pos / 10 })),
    ].map(createGridLine);

    const creativeOpacity = useTransform(progress, p => 1 - p * 0.7); // Fades out slightly
    const technicalOpacity = useTransform(progress, p => 0.3 + p * 0.7); // Fades in

    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl border border-gray-200 p-4 overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <motion.g opacity={creativeOpacity}>
                    {waves.map((d, i) => (
                        <motion.path
                            key={`wave-${i}`}
                            d={d}
                            stroke="#6366f1"
                            strokeWidth="1"
                            fill="none"
                        />
                    ))}
                </motion.g>
                <motion.g opacity={technicalOpacity}>
                    {gridLines.map((d, i) => (
                        <motion.path
                            key={`grid-${i}`}
                            d={d}
                            stroke="#111827"
                            strokeWidth="1"
                            fill="none"
                        />
                    ))}
                </motion.g>
            </svg>
        </div>
    );
};

const mediaMap: { [key: string]: { type: 'gif' | 'mp4', src: string } } = {
    "Your Vision, Perfectly Built": { type: 'gif', src: 'Your Vision, Perfectly Built.gif' },
    "Smart Functionality": { type: 'mp4', src: 'smart functionality.mp4' },
    "Faster Delivery, Zero Compromise": { type: 'mp4', src: 'FASTER DELIVERY.mp4' },
    "Creative Meets Technical": { type: 'gif', src: 'creativity meets technical.gif' },
};

const FeatureCard: React.FC<{ title: string, description: string, className?: string }> = ({ title, description, className }) => {
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


const FeaturesSection: React.FC = () => {
    const features = [
        {
            title: "Your Vision, Perfectly Built",
            description: "We translate ideas into living digital experiences — no templates, just originality.",
            className: "md:col-span-3"
        },
        {
            title: "Smart Functionality",
            description: "Every feature is purposeful, scalable, and tailored to your needs.",
            className: "md:col-span-2"
        },
        {
            title: "Faster Delivery, Zero Compromise",
            description: "Get high-quality results with agile workflows and consistent updates.",
            className: "md:col-span-2"
        },
        {
            title: "Creative Meets Technical",
            description: "We blend artistry and logic to craft meaningful, interactive solutions.",
            className: "md:col-span-3"
        }
    ];

    return (
        <motion.section 
            id="why-us"
            className="py-20 md:py-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container mx-auto px-4">
                <motion.div className="text-center mb-16" variants={itemVariants}>
                    <div className="inline-flex items-center bg-white border border-gray-200 rounded-full px-3 py-1 text-xs font-medium text-gray-600 mb-6">
                        <span className="mr-2">🤝</span>
                        PARTNER WITH US
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Why Work With Us</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Drowning in data or afraid of falling behind? That’s where we come in. At Martex, we’re your innovation partner. We understand your real challenges before creating solutions that fit like a glove.
                    </p>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-6xl mx-auto"
                    variants={sectionVariants}
                >
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            title={feature.title}
                            description={feature.description}
                            className={feature.className}
                        />
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
};

export default FeaturesSection;