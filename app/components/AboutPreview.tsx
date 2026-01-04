import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaArrowRight, FaCode, FaLightbulb } from "react-icons/fa";

const AboutPreview = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-[#0a192f] to-[#112240]">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid lg:grid-cols-2 gap-12 items-center"
                >
                    {/* Left Column - Image */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#64ffda] via-[#00b4d8] to-[#9d4edd] rounded-3xl opacity-20 blur-xl"></div>
                        <div className="relative rounded-2xl overflow-hidden border border-[#233554]">
                            <img
                                src='/images/profile.jpg'
                                alt='Robson Muniz'
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent"></div>

                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute top-6 left-6 p-3 rounded-lg bg-[#112240] border border-[#233554]"
                            >
                                <FaCode className="text-[#64ffda]" />
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                                className="absolute bottom-6 right-6 p-3 rounded-lg bg-[#112240] border border-[#233554]"
                            >
                                <FaLightbulb className="text-[#9d4edd]" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Column - Content */}
                    <div>
                        <div className="inline-flex items-center gap-2 mb-6">
                            <div className="w-8 h-0.5 bg-[#64ffda]"></div>
                            <span className="text-sm font-semibold text-[#64ffda] uppercase tracking-wider">
                                About Me
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            More Than Just a
                            <span className="block text-[#64ffda]">Developer</span>
                        </h2>

                        <p className="text-lg text-[#ccd6f6] mb-8 leading-relaxed">
                            I combine technical expertise with creative problem-solving to build digital
                            experiences that not only work flawlessly but also delight users. With a
                            background in both development and design, I bridge the gap between
                            functionality and aesthetics.
                        </p>

                        <div className="space-y-4 mb-10">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-[#64ffda]"></div>
                                <span className="text-[#e6f1ff]">Full Stack Development</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-[#00b4d8]"></div>
                                <span className="text-[#e6f1ff]">UI/UX Design</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-[#9d4edd]"></div>
                                <span className="text-[#e6f1ff]">Technical Leadership</span>
                            </div>
                        </div>

                        <Link
                            to='/about'
                            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl border-2 border-[#64ffda] text-[#64ffda] font-bold hover:bg-[#64ffda]/10 transition-all"
                        >
                            <span>Learn My Story</span>
                            <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutPreview;