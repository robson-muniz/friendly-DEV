import { Link } from "react-router";
import type { PostMeta } from "~/types";
import { motion } from "framer-motion";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";

type LatestPostProps = {
    posts: PostMeta[];
    limit?: number;
}

const LatestPost = ({ posts, limit = 3 }: LatestPostProps) => {

    const sortedPosts = [...posts].sort((a: PostMeta, b: PostMeta) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const latestPosts = sortedPosts.slice(0, limit);

    return (
        <section className="py-12">
            <div className="flex justify-between items-center mb-10">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300"
                >
                    Latest from the Blog
                </motion.h2>
                <Link to="/blog" className="group flex items-center gap-2 text-gray-400 hover:text-blue-400 transition">
                    Read Blog <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <motion.div
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                {latestPosts.map((post, index) => (
                    <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 100,
                            damping: 15
                        }}
                        whileHover={{ y: -8, scale: 1.02 }}
                    >
                        <Link
                            to={`/blog/${post.slug}`}
                            className="group block h-full"
                        >
                            <article className="glass-card h-full rounded-2xl p-6 flex flex-col relative overflow-hidden">
                                {/* Hover gradient */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    initial={false}
                                />
                                
                                <div className="relative z-10">
                                    <motion.div
                                        className="mb-4"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                                            Article
                                        </span>
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-blue-400 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center text-xs text-gray-500 pt-4 border-t border-gray-700/30">
                                        <FaCalendarAlt className="mr-2 text-blue-400/60" />
                                        {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                </div>
                                
                                {/* Shine effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 0.6 }}
                                />
                            </article>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}

export default LatestPost;