import type { Route } from "./+types/details";
import type { Project } from "~/types";
import { useLoaderData, isRouteErrorResponse, Link } from "react-router";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCalendarAlt, FaExternalLinkAlt, FaTag } from "react-icons/fa";

export function meta({ data }: Route.MetaArgs) {
    return [
        { title: data ? `${data.title} | The Friendly DEV` : "Project Details" },
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
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-4xl space-y-8 animate-pulse">
                <div className="h-8 bg-gray-800 w-1/3 rounded"></div>
                <div className="h-96 bg-gray-800 rounded-2xl"></div>
                <div className="space-y-4">
                    <div className="h-4 bg-gray-800 w-3/4 rounded"></div>
                    <div className="h-4 bg-gray-800 w-1/2 rounded"></div>
                </div>
            </div>
        </div>
    );
}

export default function ProjectDetailPage() {
    const project = useLoaderData<typeof clientLoader>();

    return (
        <div className="min-h-screen pb-20">
            {/* Hero Header with Blurred Background */}
            <div className="relative h-[50vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gray-900/50 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/80 to-transparent z-20" />
                <img
                    src={project.image}
                    alt=""
                    className="w-full h-full object-cover blur-sm opacity-50 scale-110"
                />

                <div className="absolute bottom-0 left-0 w-full z-30 px-6 pb-12">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Link
                                to="/projects"
                                className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group"
                            >
                                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
                            </Link>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                                {project.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                                <span className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30 backdrop-blur-md">
                                    <FaTag size={12} /> {project.category}
                                </span>
                                <span className="flex items-center gap-2 text-gray-300">
                                    <FaCalendarAlt size={12} /> {new Date(project.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-40">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="glass rounded-3xl p-8 md:p-12 shadow-2xl border border-white/5"
                >
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white">Project Overview</h2>
                            <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                                {project.description}
                            </p>

                            {project.url && (
                                <div className="pt-6">
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-1 transition-all group"
                                    >
                                        Visit Live Site <FaExternalLinkAlt className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-800 group">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
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
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
            <div className="glass rounded-3xl p-12 max-w-lg w-full border border-red-500/20 bg-red-500/5">
                <h1 className="text-3xl font-bold text-white mb-4">{message}</h1>
                <p className="text-gray-400 mb-8">{details}</p>
                <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full font-semibold transition-all"
                >
                    <FaArrowLeft /> Back to Project Gallery
                </Link>
            </div>
        </div>
    );
}
