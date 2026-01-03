import type { Project } from "~/types";
import ProjectCard from "~/components/ProjectCard";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

type FeaturedProjectsProps = {
    projects: Project[];
    count?: number;
};

const FeaturedProjects = ({ projects, count = 4 }: FeaturedProjectsProps) => {
    if (!projects) return null;

    const featured = projects.filter((p) => p.featured).slice(0, count);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="py-8">
            <div className="flex justify-between items-center mb-10">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300"
                >
                    Featured Projects
                </motion.h2>
                <Link to="/projects" className="group flex items-center gap-2 text-gray-400 hover:text-blue-400 transition">
                    View All <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2"
            >
                {featured.map((p) => (
                    <motion.div key={p.id} variants={itemVariants}>
                        <ProjectCard project={p} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default FeaturedProjects;
