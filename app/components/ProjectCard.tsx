import type { Project } from "~/types";
import { Link } from 'react-router';
import { FaCalendarAlt, FaTag } from "react-icons/fa";

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <Link
            to={`/projects/${project.id}`}
            className="group block h-full"
        >
            <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col relative group-hover:-translate-y-2 transition-transform duration-300">
                <div className="relative overflow-hidden aspect-video">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-gray-100 group-hover:text-blue-400 transition-colors">
                            {project.title}
                        </h3>
                    </div>

                    <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-2">
                        {project.description}
                    </p>

                    <div className="flex items-center justify-between text-xs font-medium text-gray-500 pt-4 border-t border-gray-700/50">
                        <span className="flex items-center gap-1.5 px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md">
                            <FaTag /> {project.category}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <FaCalendarAlt /> {new Date(project.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;