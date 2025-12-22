import { useLoaderData } from "react-router";
import type { Route } from "./+types/projects";
import type { Project } from "~/types";
import ProjectCard from "~/components/ProjectCard";
import {useState} from "react";

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

    // Pagination button render
    const renderPagination = () => (
        <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages } ,(_, i) => (
                <button
                    key={i + 1}
                    className={`px-3 py-1 cursor-pointer rounded ${
                        currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    )

    return (
        <>
            <h2 className="text-3xl text-white font-bold mb-8">
                🚀 Projects
            </h2>
            <div className="grid gap-6 sm:gfeat(projects): render project details page
rid-cols-2">
                {currentProjecs.map((project) => (
                    <ProjectCard key={project.id} project={project}  />
                ))}
            </div>
            {totalPages > 1 && renderPagination()}
        </>
    );
}
