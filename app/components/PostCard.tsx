import type {PostMeta} from "~/types";
import {Link} from 'react-router'


const PostCard = ({post}: {post: PostMeta}) => {
    return (
        <article className="bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold text-blue-400 mb-2">
                {post.title}
            </h3>
            <p className="text-sm text-gray-400 mb-2">
                {new Date(post.date).toDateString()}
            </p>
            <p className="text-gray-300 mb-4">{post.excerpt}</p>
            <Link to={`/blog/${post.slug}`} className="text-blue-500 hover:underline">Read More</Link>
        </article>
    );
};

export default PostCard;