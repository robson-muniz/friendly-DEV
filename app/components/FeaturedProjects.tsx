import type { Project } from "~/types";
import ProjectCard from "~/components/ProjectCard";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaArrowRight, FaStar } from "react-icons/fa";

type FeaturedProjectsProps = {
    projects: Project[];
    count?: number;
};

const FeaturedProjects = ({ projects, count = 4 }: FeaturedProjectsProps) => {
    if (!projects) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <section className="py-20 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/5 to-transparent"></div>

            <div className="relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 mb-4">
                            <FaStar className="text-yellow-400" />
                            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
                                Featured Work
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Projects That{' '}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                                Make an Impact
                            </span>
                        </h2>
                        <p className="text-gray-400 mt-4 max-w-2xl">
                            A curated selection of my most impactful work, showcasing innovative solutions and clean design.
                        </p>
                    </div>

                    <Link
                        to="/projects"
                        className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-blue-500/50 text-gray-300 hover:text-white transition-all duration-300"
                    >
                        <span className="font-medium">View All Projects</span>
                        <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid gap-8 md:grid-cols-2"
                >
                    {projects.slice(0, count).map((p, index) => (
                        <motion.div
                            key={p.id}
                            variants={itemVariants}
                            custom={index}
                            whileHover={{ y: -8 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <ProjectCard project={p} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    className="mt-20 glass rounded-2xl p-8 border border-white/10 relative overflow-hidden group"
                >
                    {/* Animated background gradient */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        initial={false}
                    />
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
                        {[
                            { value: "50+", label: "Projects Completed" },
                            { value: "100%", label: "Client Satisfaction" },
                            { value: "3+", label: "Years Experience" },
                            { value: "24/7", label: "Support Available" }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                whileHover={{ scale: 1.1, y: -5 }}
                                className="cursor-default"
                            >
                                <motion.div
                                    className="text-3xl md:text-4xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300"
                                    animate={{
                                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    style={{
                                        backgroundSize: "200% 200%"
                                    }}
                                >
                                    {stat.value}
                                </motion.div>
                                <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedProjects;