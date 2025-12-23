import type { Project } from "~/types";
import ProjectCard from "~/components/ProjectCard";

type FeaturedProjectsProps = {
    projects: Project[];
    count?: number; // optional prop
};

const FeaturedProjects = ({ projects, count = 4 }: FeaturedProjectsProps) => {
    if (!projects) return null; // safety check

    const featured = projects.filter((p) => p.featured).slice(0, count);

    return (
        <section>
            <h2 className="text-2xl font-bold mb-6 text-gray-200">
                🌟 Featured Projects
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
                {featured.map((p) => (
                    <ProjectCard key={p.id} project={p} />
                ))}
            </div>
        </section>
    );
};

export default FeaturedProjects;
