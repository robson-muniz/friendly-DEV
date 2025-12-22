// app/routes/projects/details.tsx
import type { Route } from "./+types/details";
import type { Project } from "~/types";
import { useLoaderData } from "react-router";

// Loader to fetch a single project by ID
export async function clientLoader({ params }: Route.ClientLoaderArgs): Promise<Project> {
    if (!params.id) {
        throw new Response("Missing project ID", { status: 400 });
    }

    const res = await fetch(`http://localhost:8000/projects/${params.id}`);
    if (!res.ok) {
        throw new Response("Project not found", { status: 404 });
    }

    const project: Project = await res.json();
    return project;
}

// Polished loading UI while the loader runs
export function HydrateFallback() {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg animate-pulse">
            <div className="h-8 bg-gray-700 mb-4 rounded"></div>
            <div className="h-64 bg-gray-700 mb-4 rounded"></div>
            <div className="h-4 bg-gray-700 mb-2 rounded"></div>
            <div className="h-4 bg-gray-700 mb-2 rounded"></div>
            <div className="h-4 bg-gray-700 mb-2 rounded"></div>
        </div>
    );
}

// Main detail page component
export default function ProjectDetailPage() {
    // ✅ Use loader hook for data
    const project = useLoaderData<typeof clientLoader>();

    return (
        <section className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
            <h2 className="text-4xl font-bold mb-4">{project.title}</h2>
            <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover rounded-md mb-6"
            />
            <p className="text-gray-300 mb-4">{project.description}</p>

            <div className="flex justify-between text-sm text-gray-400">
                <span>Category: {project.category}</span>
                <span>Date: {new Date(project.date).toDateString()}</span>
            </div>

            {project.url && (
                <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md transition"
                >
                    Visit Project
                </a>
            )}
        </section>
    );
}
