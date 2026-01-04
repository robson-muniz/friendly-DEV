import type { PostMeta } from "~/types";
import { Link } from 'react-router';
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const PostCard = ({ post, index = 0 }: { post: PostMeta; index?: number }) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 15
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-card rounded-2xl p-6 group transition-all relative overflow-hidden"
        >
            {/* Hover gradient effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
            />
            
            {/* Animated border on hover */}
            <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-blue-500/0 group-hover:border-blue-500/30 transition-all duration-500"
                initial={false}
            />

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                    <motion.h3 
                        className="text-2xl font-bold text-gray-100 group-hover:text-blue-400 transition-colors"
                        whileHover={{ x: 4 }}
                    >
                        <Link to={`/blog/${post.slug}`} className="block">
                            {post.title}
                        </Link>
                    </motion.h3>
                    <motion.span 
                        className="flex items-center text-sm text-gray-500 whitespace-nowrap"
                        whileHover={{ scale: 1.05 }}
                    >
                        <FaCalendarAlt className="mr-2 text-blue-400/60" />
                        {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </motion.span>
                </div>

                <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3">
                    {post.excerpt}
                </p>

                <motion.div
                    whileHover={{ x: 4 }}
                >
                    <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center text-blue-400 font-medium hover:text-blue-300 transition group/link"
                    >
                        Read Article 
                        <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="ml-2"
                        >
                            <FaArrowRight />
                        </motion.span>
                    </Link>
                </motion.div>
            </div>

            {/* Shine effect on hover */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
            />
        </motion.article>
    );
};

export default PostCard;