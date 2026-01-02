import type { Route } from "./+types/index";
import type { PostMeta } from "./+types/index";
import PostCard from "~/components/PostCard";
import Pagination from "~/components/pagination";
import {useState} from "react";


export async function loader({request}: Route.LoaderArgs) : Promise <{posts: PostMeta[]}> {
    const url = new URL('/posts-meta.json', request.url);
    const res = await fetch(url.href);

    if (!res.ok) throw new Error('Failed to fetch posts metadata');

    const data = await res.json()

    data.sort((a:PostMeta, b:PostMeta) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {posts: data}
}

const BlogPage = ({loaderData}: Route.ComponentProps) => {
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 3;

    const {posts} = loaderData;

    const totalPages = Math.ceil(posts.length / postsPerPage);
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = posts.slice(indexOfFirst, indexOfLast);

    return (
        <div className="max-w-3xl mx-auto mt-10 px-6 py-8 bg-gray-900">
            <h2 className="text-3xl text-white font-bold mb-8">
                📝 Blog
            </h2>
            {currentPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
            ))}
            {totalPages > 1 && (
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage}/>
            )}

        </div>
    );
};

export default BlogPage;