import { useLoaderData } from "react-router";
import type { Route } from "./+types/projects";
import type { Project } from "~/types";
import ProjectCard from "~/components/ProjectCard";
import {useState} from "react";
import Pagination from "~/components/pagination";
import {AnimatePresence, motion} from "framer-motion";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "The Friendly DEV | Projects" },
        { name: "description", content: "My website project portfolioo" },
    ];
}

export async function loader(
    {}: Route.LoaderArgs
): Promise<{ projects: Project[] }> {
    const response = await fetch("http://localhost:8000/projects");
    const data = await response.json();

    return { projects: data };
}

export default function ProjectsPage() {
    const { projects } = useLoaderData<typeof loader>();
    const projectsPerPage = 10

    const [currentPage, setCurrentPage] = useState(1)

    //Calculate total page
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    //Get current pages projects
    const indexOfLast = currentPage * projectsPerPage;
    const indexOfFirst = indexOfLast - projectsPerPage;
    const currentProjecs = projects.slice(indexOfFirst, indexOfLast);

    return (
        <>
            <h2 className="text-3xl text-white font-bold mb-8">
                🚀 Projects
            </h2>

            <AnimatePresence mode="wait">
                <motion.div layout className="grid gap-6 sm:gfeat(projects): render project details page
rid-cols-2">
                    {currentProjecs.map((project) => (
                        <motion.div key={project.id} layout>
                        <ProjectCard key={project.id} project={project}  />
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>

            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage  } />
        </>
    );
}
