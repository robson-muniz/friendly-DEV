import type { PostMeta } from "~/types";
import { Link } from 'react-router';
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const PostCard = ({ post }: { post: PostMeta }) => {
    return (
        <article className="glass-card rounded-2xl p-6 group transition-all hover:-translate-y-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                <h3 className="text-2xl font-bold text-gray-100 group-hover:text-blue-400 transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <span className="flex items-center text-sm text-gray-500 whitespace-nowrap">
                    <FaCalendarAlt className="mr-2" />
                    {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
            </div>

            <p className="text-gray-400 mb-6 leading-relaxed">
                {post.excerpt}
            </p>

            <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center text-blue-400 font-medium hover:text-blue-300 transition group/link"
            >
                Read Article <FaArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform" />
            </Link>
        </article>
    );
};

export default PostCard;