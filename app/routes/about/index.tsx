import { motion } from "framer-motion";
import { FaLaptopCode, FaRocket, FaHandshake, FaMedal } from "react-icons/fa";

const AboutPage = () => {
    const technologies = [
        "React", "Next.js", "Vue", "Tailwind CSS",
        "Node.js", "Laravel", "Prisma", "MongoDB",
        "PostgreSQL", "Appwrite", "Docker"
    ];

    return (
        <div className="min-h-screen py-12 space-y-20">
            {/* Hero Section */}
            <section className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative shrink-0"
                >
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                    <img
                        src='/images/profile.jpg'
                        alt='Robson Muniz'
                        className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-gray-800 shadow-2xl"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex-1 text-center md:text-left"
                >
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
                        Hey, I'm Robson Muniz 👋
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed mb-8">
                        I'm a passionate web developer and content creator who loves building friendly digital experiences and helping others grow into confident, modern developers.
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium border border-blue-500/20">
                            <FaLaptopCode /> Full Stack Dev
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium border border-purple-500/20">
                            <FaRocket /> Content Creator
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Mission Section */}
            <section className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden group"
                >
                    {/* Animated background decoration */}
                    <motion.div
                        className="absolute top-0 right-0 p-12 opacity-5 text-9xl text-white"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <FaHandshake />
                    </motion.div>
                    
                    {/* Gradient overlay on hover */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        initial={false}
                    />
                    
                    <div className="relative z-10">
                        <motion.h2
                            className="text-3xl font-bold text-white mb-6 flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.span
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <FaMedal className="text-yellow-400" />
                            </motion.span>
                            My Mission
                        </motion.h2>
                        <motion.p
                            className="text-lg text-gray-300 leading-relaxed"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            After turning my life around, I made it my mission to share what I've learned with others — not just about code, but about building a life you're proud of. Through tutorials, courses, and real-world projects, I aim to make development accessible, friendly, and something you look forward to each day.
                        </motion.p>
                    </div>
                </motion.div>
            </section>

            {/* Tech Stack */}
            <section className="max-w-5xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="inline-flex items-center gap-2 mb-4">
                        <span className="text-4xl">🚀</span>
                        <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
                            Tech Stack
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Technologies & Tools
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A curated selection of modern technologies I work with to build amazing digital experiences.
                    </p>
                </motion.div>

                <motion.div
                    className="flex flex-wrap justify-center gap-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {technologies.map((tech, index) => (
                        <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ 
                                delay: index * 0.05,
                                type: "spring",
                                stiffness: 200,
                                damping: 20
                            }}
                            whileHover={{ 
                                scale: 1.1, 
                                y: -8,
                                rotate: [0, -5, 5, 0]
                            }}
                            className="group relative bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-blue-500/30 px-6 py-3 rounded-xl text-gray-300 hover:text-white transition-all cursor-default shadow-lg hover:shadow-blue-500/20 overflow-hidden"
                        >
                            {/* Hover gradient effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                initial={false}
                            />
                            <span className="relative z-10 font-medium">{tech}</span>
                            
                            {/* Shine effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.6 }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </div>
    );
};

export default AboutPage;
