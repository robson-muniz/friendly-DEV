import { useLoaderData } from "react-router";
import type { Route } from "./+types/index";
import type { Project } from "~/types";
import ProjectCard from "~/components/ProjectCard";
import Pagination from "~/components/pagination";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "The Friendly DEV | Projects" },
        { name: "description", content: "My website project portfolio" },
    ];
}

export async function loader(
    {}: Route.LoaderArgs
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
        <>
            <h2 className="text-3xl text-white font-bold mb-8">
                🚀 Projects
            </h2>

            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => {
                            setSelectedCategory(category);
                            setCurrentPage(1);
                        }}
                        className={`px-4 py-1 rounded transition ${
                            selectedCategory === category
                                ? "bg-blue-500 text-white"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div layout className="grid gap-6 sm:grid-cols-2">
                    {currentProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </>
    );
}
