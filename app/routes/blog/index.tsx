import type { Route } from "./+types/index";
import type { PostMeta } from "./+types/index";
import PostCard from "~/components/PostCard";
import Pagination from "~/components/pagination";
import { useState } from "react";
import PostFilter from "~/components/PostFilter";


export async function loader({ request }: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
    const url = new URL('/posts-meta.json', request.url);
    const res = await fetch(url.href);

    if (!res.ok) throw new Error('Failed to fetch posts metadata');

    const data = await res.json()

    data.sort((a: PostMeta, b: PostMeta) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return { posts: data }
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {

    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 3;
    const filteredPosts = loaderData.posts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()))

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

    return (
        <div className="max-w-3xl mx-auto mt-10 px-6 py-8 bg-gray-900">
            <h2 className="text-3xl text-white font-bold mb-8">
                📝 Blog
            </h2>

            <PostFilter searchQuery={searchQuery} onSearchQueryChange={(query) => {
                setSearchQuery(query)
                setCurrentPage(1)
            }} />

            <div className="space-y-8">
                {currentPosts.length === 0 ? (
                    <p className="text-gray-400">No posts found</p>
                ) : (
                    currentPosts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))
                )}
            </div>

            {totalPages > 1 && (
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
            )}

        </div>
    );
};

export default BlogPage;