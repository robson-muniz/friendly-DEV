import type { Project } from "~/types";
import { Link } from 'react-router';
import { FaCalendarAlt, FaTag, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <Link
            to={`/projects/${project.documentID}`}
            className="group block h-full"
        >
            <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/5 hover:border-blue-500/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/10"
            >
                {/* Featured Badge */}
                {project.featured && (
                    <div className="absolute top-4 left-4 z-20">
                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 backdrop-blur-sm">
                            <FaStar className="text-yellow-400 text-xs" />
                            <span className="text-xs font-semibold text-yellow-300">Featured</span>
                        </div>
                    </div>
                )}

                {/* Image Container */}
                <div className="relative overflow-hidden aspect-video">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                    {/* Overlay Gradient */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60"
                        whileHover={{ opacity: 0.3 }}
                        transition={{ duration: 0.3 }}
                    />
                    
                    {/* Hover shine effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                    />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col grow relative">
                    {/* Tech Stack Preview */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags?.slice(0, 3).map((tag, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                                className="px-2 py-1 text-xs font-medium rounded-md bg-white/5 text-gray-400 border border-white/5 hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-300 transition-all"
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>

                    <div className="grow">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 line-clamp-1">
                            {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                            {project.description}
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5 text-xs text-gray-500">
                                <FaTag className="text-blue-400" />
                                <span className="font-medium text-gray-400">{project.category}</span>
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-gray-500">
                                <FaCalendarAlt />
                                {new Date(project.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-blue-400 text-sm font-medium">
                            <span>View Project</span>
                            <FaExternalLinkAlt className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                    </div>
                </div>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent group-hover:w-3/4 transition-all duration-500"></div>
            </motion.div>
        </Link>
    );
};

export default ProjectCard;