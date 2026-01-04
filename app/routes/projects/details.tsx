import type { Route } from "./+types/details";
import type { Project } from "~/types";
import { useLoaderData, isRouteErrorResponse, Link } from "react-router";
import { motion } from "framer-motion";
import {
    FaArrowLeft,
    FaCalendarAlt,
    FaExternalLinkAlt,
    FaTag,
    FaCode,
    FaServer,
    FaPalette,
    FaRocket,
    FaGithub
} from "react-icons/fa";

export function meta({ data }: Route.MetaArgs) {
    return [
        { title: data ? `${data.title} | The Robson DEV` : "Project Details" },
        { name: "description", content: data?.description || "Project details" },
    ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs): Promise<Project> {
    if (!params.id) {
        throw new Response("Missing project ID", { status: 400 });
    }

    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
        throw new Response("Server configuration error", { status: 500 });
    }

    try {
        const res = await fetch(`${apiUrl}/projects/${params.id}`);
        if (!res.ok) {
            if (res.status === 404) {
                throw new Response("Project not found", { status: 404 });
            }
            throw new Error(`Failed to fetch project: ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("Project loader error:", error);
        throw new Response("Failed to load project details", { status: 500 });
    }
}

export function HydrateFallback() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-4xl px-6">
                <div className="space-y-8 animate-pulse">
                    <div className="h-8 bg-[#112240] w-1/4 rounded-lg"></div>
                    <div className="h-[400px] bg-[#112240] rounded-2xl"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-[#112240] w-3/4 rounded"></div>
                        <div className="h-4 bg-[#112240] w-1/2 rounded"></div>
                        <div className="h-4 bg-[#112240] w-2/3 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProjectDetailPage() {
    const project = useLoaderData<typeof clientLoader>();

    return (
        <div className="min-h-screen bg-[#0a192f] text-[#e6f1ff]">
            {/* Navigation Bar */}
            <nav className="sticky top-0 z-50 bg-[#0a192f]/95 backdrop-blur-sm border-b border-[#233554]">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-3 text-[#64ffda] hover:text-white group transition-colors"
                    >
                        <div className="p-2 rounded-lg bg-[#112240] group-hover:bg-[#233554] transition-colors">
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        </div>
                        <span className="font-semibold">Back to Projects</span>
                    </Link>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Project Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-[#64ffda]/10">
                            <FaRocket className="text-[#64ffda]" />
                        </div>
                        <span className="text-sm font-semibold text-[#64ffda] uppercase tracking-wider">
                            Featured Project
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        {project.title}
                    </h1>

                    <p className="text-xl text-[#ccd6f6] max-w-3xl mb-8 leading-relaxed">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#112240] border border-[#233554]">
                            <FaTag className="text-[#64ffda]" />
                            <span className="font-medium">{project.category}</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#112240] border border-[#233554]">
                            <FaCalendarAlt className="text-[#64ffda]" />
                            <span>{new Date(project.date).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Project Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="lg:col-span-2"
                    >
                        <div className="rounded-2xl overflow-hidden border border-[#233554] bg-[#112240] group">
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/50 to-transparent"></div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-4 mb-6">
                                    {project.tags?.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1.5 text-sm rounded-lg bg-[#233554] text-[#64ffda] border border-[#64ffda]/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Project Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="space-y-6"
                    >
                        {/* Tech Stack Card */}
                        <div className="rounded-2xl border border-[#233554] bg-[#112240] p-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                <FaCode className="text-[#64ffda]" />
                                Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB'].map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-2 rounded-lg bg-[#233554] text-[#ccd6f6] text-sm"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Features Card */}
                        <div className="rounded-2xl border border-[#233554] bg-[#112240] p-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                <FaPalette className="text-[#64ffda]" />
                                Key Features
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    'Responsive Design',
                                    'Performance Optimized',
                                    'Clean Code Architecture',
                                    'User Authentication',
                                    'Real-time Updates'
                                ].map((feature) => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-[#64ffda]"></div>
                                        <span className="text-[#ccd6f6]">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Actions Card */}
                        <div className="rounded-2xl border border-[#233554] bg-[#112240] p-6">
                            <h3 className="text-xl font-bold mb-4">Live Project</h3>
                            <div className="space-y-4">
                                {project.url && (
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-xl bg-gradient-to-r from-[#64ffda] to-[#00b4d8] text-[#0a192f] font-bold hover:shadow-2xl hover:shadow-[#64ffda]/25 transition-all duration-300 group"
                                    >
                                        <FaExternalLinkAlt className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        Visit Live Site
                                    </a>
                                )}
                                <a
                                    href={`https://github.com/username/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-xl border border-[#233554] bg-[#233554]/50 text-[#e6f1ff] font-semibold hover:bg-[#233554] transition-colors group"
                                >
                                    <FaGithub />
                                    View Source Code
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Project Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mt-12"
                >
                    <div className="rounded-2xl border border-[#233554] bg-[#112240] p-8">
                        <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-[#ccd6f6] leading-relaxed mb-6">
                                {project.longDescription || project.description}
                            </p>

                            <h3 className="text-xl font-bold text-[#e6f1ff] mb-4">The Challenge</h3>
                            <p className="text-[#ccd6f6] leading-relaxed mb-6">
                                Creating a scalable solution that handles real-time data processing while maintaining
                                exceptional user experience and performance across all devices.
                            </p>

                            <h3 className="text-xl font-bold text-[#e6f1ff] mb-4">The Solution</h3>
                            <p className="text-[#ccd6f6] leading-relaxed mb-6">
                                Implemented a modern tech stack with React for the frontend, Node.js for the backend,
                                and optimized database queries for maximum performance. Used Tailwind CSS for
                                consistent, responsive design.
                            </p>

                            <h3 className="text-xl font-bold text-[#e6f1ff] mb-4">Results & Impact</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="p-4 rounded-xl bg-[#0a192f] border border-[#233554]">
                                    <div className="text-2xl font-bold text-[#64ffda] mb-2">40%</div>
                                    <div className="text-sm text-[#ccd6f6]">Performance Improvement</div>
                                </div>
                                <div className="p-4 rounded-xl bg-[#0a192f] border border-[#233554]">
                                    <div className="text-2xl font-bold text-[#64ffda] mb-2">99.9%</div>
                                    <div className="text-sm text-[#ccd6f6]">Uptime Reliability</div>
                                </div>
                                <div className="p-4 rounded-xl bg-[#0a192f] border border-[#233554]">
                                    <div className="text-2xl font-bold text-[#64ffda] mb-2">4.8/5</div>
                                    <div className="text-sm text-[#ccd6f6]">User Satisfaction</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Related Projects */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-16"
                >
                    <h2 className="text-2xl font-bold mb-8">Related Projects</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[1, 2].map((i) => (
                            <Link
                                key={i}
                                to={`/projects/${i}`}
                                className="group block"
                            >
                                <div className="rounded-xl border border-[#233554] bg-[#112240] p-6 hover:border-[#64ffda]/50 transition-all duration-300">
                                    <h4 className="text-lg font-semibold text-[#e6f1ff] mb-2 group-hover:text-[#64ffda] transition-colors">
                                        Related Project {i}
                                    </h4>
                                    <p className="text-sm text-[#8892b0]">
                                        Another project showcasing similar technologies and challenges.
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Something went wrong";
    let details = "An unexpected error occurred while loading this project.";

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            message = "Project Not Found";
            details = "The project you are looking for does not exist or has been removed.";
        } else {
            message = `Error ${error.status}`;
            details = error.statusText || details;
        }
    } else if (error instanceof Error) {
        details = error.message;
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[#0a192f] p-6">
            <div className="max-w-md w-full rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
                <div className="text-4xl mb-4">⚠️</div>
                <h1 className="text-2xl font-bold text-white mb-3">{message}</h1>
                <p className="text-[#ccd6f6] mb-6">{details}</p>
                <Link
                    to="/projects"
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-[#112240] border border-[#233554] text-[#64ffda] hover:bg-[#233554] transition-colors"
                >
                    <FaArrowLeft /> Back to Project Gallery
                </Link>
            </div>
        </div>
    );
}