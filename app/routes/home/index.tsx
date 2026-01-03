import type { Route } from "./+types/index";
import type { PostMeta } from "~/types";
import type { Project } from "~/types";
import FeaturedProjects from "~/components/FeaturedProjects";
import AboutPreview from "~/components/AboutPreview";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import LatestPost from "~/components/LatestPost";


export function meta({ }: Route.MetaArgs) {
    return [
        { title: "The Friendly DEV" },
        { name: "description", content: "Custom Website Developer" },
    ];
}

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[], posts: PostMeta[] }> {

    const url = new URL(request.url);

    const [projectRes, postRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/projects`),
        fetch(`${import.meta.env.VITE_API_URL}/posts`),
    ]);

    if (!projectRes.ok || !postRes.ok) {
        throw new Response("Failed to fetch projects or posts", {
            status: projectRes.status,
            statusText: "Failed to fetch projects or posts"
        });
    }

    const [projects, posts] = await Promise.all([
        projectRes.json(),
        postRes.json(),
    ]);


    console.log(projects, posts);

    return { projects, posts };
}

export default function Home({ loaderData }: Route.ComponentProps) {
    const { projects, posts } = loaderData;

    return (
        <div className="space-y-24 pb-12">
            {/* Hero Section */}
            <section className="min-h-[90vh] flex flex-col justify-center items-center text-center relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />

                <div className="relative z-10 space-y-8 max-w-5xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 drop-shadow-2xl">
                            Build Digital Experiences <br /> That Matter.
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
                            I help businesses and startups create stunning, high-performance websites and applications that leave a lasting impression.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="flex flex-wrap justify-center gap-6 pt-8"
                    >
                        <Link to="/projects" className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:-translate-y-1">
                            View Work
                        </Link>
                        <Link to="/contact" className="px-10 py-4 glass hover:bg-gray-800/50 text-white border border-white/10 rounded-full font-bold text-lg transition-all hover:-translate-y-1 hover:border-white/20">
                            Get in Touch
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
                >
                    <span className="text-sm tracking-widest uppercase opacity-70">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <FaArrowDown />
                    </motion.div>
                </motion.div>
            </section>

            <FeaturedProjects projects={projects} count={2} />
            <AboutPreview />
            <LatestPost posts={posts} limit={2} />
        </div>
    )
}
