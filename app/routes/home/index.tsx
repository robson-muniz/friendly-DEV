import type { Route } from "./+types/index";
import type { PostMeta } from "~/types";
import type { Project } from "~/types";
import FeaturedProjects from "~/components/FeaturedProjects";
import AboutPreview from "~/components/AboutPreview";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
    FaArrowDown,
    FaRocket,
    FaChartLine,
    FaUsers,
    FaAward,
    FaStar
} from "react-icons/fa";
import LatestPost from "~/components/LatestPost";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Robson Muniz | Full Stack Developer" },
        { name: "description", content: "Building scalable web applications with clean code and exceptional user experience" },
    ];
}

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
    const apiUrl = import.meta.env.VITE_API_URL;
    const strapiUrl = import.meta.env.VITE_STRAPI_URL || "";

    const projectRes = await fetch(`${apiUrl}/projects?populate=*`);

    if (!projectRes.ok) {
        throw new Response("Failed to fetch projects", {
            status: projectRes.status,
            statusText: "Failed to fetch projects"
        });
    }

    const projectsJson = await projectRes.json();

    const projects = (projectsJson.data || []).map((project: any) => ({
        id: project.id,
        documentID: project.documentId,
        title: project.title,
        description: project.description,
        image: project.image?.url
            ? `${strapiUrl}${project.image.url}`
            : '/image/no-image.png',
        url: project.url,
        category: project.category,
        featured: project.featured,
        date: project.date,
    }));

    return { projects };
}

export default function Home({ loaderData }: Route.ComponentProps) {
    const { projects } = loaderData;
    const posts: PostMeta[] = []; // Temporary fallback for posts until Strapi posts are ready

    const stats = [
        { value: "50+", label: "Projects Delivered", icon: <FaRocket /> },
        { value: "100%", label: "Client Satisfaction", icon: <FaUsers /> },
        { value: "99.9%", label: "Uptime Record", icon: <FaChartLine /> },
        { value: "3+", label: "Years Experience", icon: <FaAward /> },
    ];

    return (
        <div className="bg-[#0a192f] text-[#e6f1ff]">
            {/* Hero Section */}
            <section className="min-h-screen relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-[#64ffda]/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9d4edd]/5 rounded-full blur-3xl"></div>
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: `linear-gradient(to right, #64ffda 1px, transparent 1px),
                            linear-gradient(to bottom, #64ffda 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}></div>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-center"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#112240] border border-[#233554] mb-8">
                            <FaStar className="text-[#64ffda]" />
                            <span className="text-sm font-semibold text-[#64ffda]">Full Stack Developer</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                            <span className="block">Building</span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#64ffda] via-[#00b4d8] to-[#9d4edd]">
                                Digital Excellence
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-[#ccd6f6] max-w-3xl mx-auto mb-12 leading-relaxed">
                            I craft high-performance web applications with clean architecture,
                            scalable solutions, and exceptional user experiences that drive business growth.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
                            <Link
                                to="/projects"
                                className="group relative px-8 py-4 rounded-xl overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#64ffda] to-[#00b4d8]"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#00b4d8] to-[#64ffda] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <span className="relative flex items-center justify-center gap-3 text-[#0a192f] font-bold text-lg">
                                    View My Work
                                    <FaRocket className="group-hover:translate-x-2 transition-transform" />
                                </span>
                            </Link>

                            <Link
                                to="/contact"
                                className="px-8 py-4 rounded-xl border-2 border-[#64ffda] text-[#64ffda] font-bold text-lg hover:bg-[#64ffda]/10 transition-colors"
                            >
                                Let's Connect
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="p-6 rounded-2xl bg-[#112240] border border-[#233554] text-center"
                                >
                                    <div className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                                        {stat.icon}
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-[#8892b0]">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-sm text-[#64ffda] tracking-widest">SCROLL</span>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <FaArrowDown className="text-[#64ffda]" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 mb-4">
                                <div className="w-12 h-0.5 bg-[#64ffda]"></div>
                                <span className="text-sm font-semibold text-[#64ffda] uppercase tracking-wider">
                                    Portfolio
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Featured <span className="text-[#64ffda]">Projects</span>
                            </h2>
                            <p className="text-lg text-[#ccd6f6] max-w-2xl">
                                A curated selection of projects showcasing my expertise in modern web development.
                            </p>
                        </div>

                        <Link
                            to="/projects"
                            className="group flex items-center gap-3 px-6 py-3 rounded-xl border border-[#233554] hover:border-[#64ffda]/50 text-[#e6f1ff] hover:text-[#64ffda] transition-all"
                        >
                            View All Projects
                            <FaArrowDown className="transform rotate-90 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <FeaturedProjects projects={projects} count={3} />
                </div>
            </section>

            {/* About Preview */}
            <AboutPreview />

            {/* Blog Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <div className="w-12 h-0.5 bg-[#9d4edd]"></div>
                            <span className="text-sm font-semibold text-[#9d4edd] uppercase tracking-wider">
                                Insights
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Latest <span className="text-[#9d4edd]">Articles</span>
                        </h2>
                        <p className="text-lg text-[#ccd6f6] max-w-2xl mx-auto">
                            Sharing knowledge and insights about modern web development, best practices, and industry trends.
                        </p>
                    </div>

                    <LatestPost posts={posts} limit={3} />
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 40 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#64ffda]/10 via-[#00b4d8]/10 to-[#9d4edd]/10"></div>
                        <div className="relative z-10 p-8 md:p-12 text-center">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Ready to Build Something Amazing?
                            </h3>
                            <p className="text-lg text-[#ccd6f6] mb-8 max-w-2xl mx-auto">
                                Let's collaborate on your next project and create something extraordinary together.
                            </p>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#64ffda] to-[#00b4d8] text-[#0a192f] font-bold hover:shadow-2xl hover:shadow-[#64ffda]/25 transition-all"
                            >
                                Start a Project
                                <FaRocket className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}