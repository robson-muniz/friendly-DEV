import { useLoaderData } from "react-router";
import type { Route } from "./+types/index";
import type { Project } from "~/types";
import ProjectCard from "~/components/ProjectCard";
import Pagination from "~/components/pagination";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "The Robson DEV | Projects" },
        { name: "description", content: "My website project portfolio" },
    ];
}

export async function loader(
    { }: Route.LoaderArgs
): Promise<{ projects: Project[] }> {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
        throw new Response("VITE_API_URL is not defined in environment variables", {
            status: 500,
            statusText: "Configuration Error"
        });
    }

    let data: Project[] = [];
    try {
        const response = await fetch(`${apiUrl}/projects`);
        if (!response.ok) {
            throw new Error(`Failed to fetch projects: ${response.statusText}`);
        }
        data = await response.json();
    } catch (error) {
        console.error("Projects loader error:", error);
        throw new Response("Failed to load projects", { status: 500 });
    }

    return { projects: data };
}

export default function ProjectsPage() {
    const { projects } = useLoaderData<typeof loader>();

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 10;

    const categories = [
        "All",
        ...Array.from(
            new Set(
                projects
                    .map((project) => project.category)
                    .filter((category) => category !== "All")
            )
        ),
    ];

    const filteredProjects =
        selectedCategory === "All"
            ? projects
            : projects.filter((project) => project.category === selectedCategory);

    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    const indexOfLast = currentPage * projectsPerPage;
    const indexOfFirst = indexOfLast - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

    return (
        <div className="min-h-screen py-12 px-6">
            <header className="mb-20 text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 mb-6 drop-shadow-lg">
                        Featured Work
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        A collection of projects where design meets functionality.
                    </p>
                </motion.div>
            </header>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-3 mb-16"
            >
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => {
                            setSelectedCategory(category);
                            setCurrentPage(1);
                        }}
                        className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                            : "glass text-gray-400 hover:text-white hover:bg-white/5 border border-white/5 hover:border-white/10"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </motion.div>

            <AnimatePresence mode="wait">
                <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                    {currentProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>

            {totalPages > 1 && (
                <div className="mt-20 flex justify-center">
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}
        </div>
    );
}
