import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCode } from "react-icons/fa";

type HeroProps = {
    name?: string;
    text?: string;
    tagline?: string;
};

const Hero = ({
    name = "Developer",
    text = 'I build friendly web experiences and help others become confident modern developers',
    tagline = 'Full Stack Developer & Content Creator'
}: HeroProps) => {
    return (
        <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950/30"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-6xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                        <FaCode className="text-blue-400" />
                        <span className="text-sm text-gray-300">{tagline}</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-cyan-100">
                            Hey, I'm
                        </span>{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                            {name}
                        </span>{' '}
                        <motion.span
                            animate={{ rotate: [0, 10, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="inline-block"
                        >
                            👋
                        </motion.span>
                    </h2>

                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
                        {text}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col sm:flex-row justify-center gap-4"
                >
                    <Link
                        to="/projects"
                        className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="relative flex items-center justify-center gap-2">
                            View Projects <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>

                    <Link
                        to="/contact"
                        className="group px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1"
                    >
                        <span className="flex items-center justify-center gap-2">
                            Contact Me
                        </span>
                    </Link>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                        <span className="text-sm tracking-widest">SCROLL</span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-6 h-10 border-2 border-gray-400/30 rounded-full flex justify-center pt-2"
                        >
                            <div className="w-1 h-2 bg-gray-400/50 rounded-full"></div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </header>
    );
};

export default Hero;