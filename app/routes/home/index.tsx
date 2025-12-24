import type { Route } from "./+types/index";
import FeaturedProjects from "~/components/FeaturedProjects";
import type {Project} from "~/types";
import AboutPreview from "~/components/AboutPreview";


export function meta({}: Route.MetaArgs) {
    return [
        { title: "The Friendly DEV" },
        { name: "description", content: "Custom Website Developer" },
    ];
}

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
        throw new Response("VITE_API_URL is not defined", { status: 500 });
    }

    const res = await fetch(`${apiUrl}/projects`);
    if (!res.ok) {
        throw new Response("Failed to fetch projects", { status: res.status });
    }

    const data: Project[] = await res.json();
    return { projects: data };
}

export default function Home({loaderData}:Route.ComponentProps) {
    const { projects } = loaderData;


    return (
       <>
           <FeaturedProjects projects={projects} count={2} />
           <AboutPreview />
       </>
   )
}
