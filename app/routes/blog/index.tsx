import type { Route } from "./+types/index";
import type { PostMeta, StrapiPost, StrapiResponse } from "~/types";
import PostCard from "~/components/PostCard";
import Pagination from "~/components/pagination";
import { useState } from "react";
import PostFilter from "~/components/PostFilter";
import { motion, AnimatePresence } from "framer-motion";
import { FaPenFancy } from "react-icons/fa";


export async function loader({ request }: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
    const apiUrl = import.meta.env.VITE_API_URL;
    const strapiUrl = import.meta.env.VITE_STRAPI_URL || "";
    const res = await fetch(`${apiUrl}/posts?populate=image&sort=date:DESC`);

    if (!res.ok) {
        throw new Response("Failed to fetch posts", {
            status: res.status,
            statusText: "Failed to fetch posts"
        });
    }

    const postJson: StrapiResponse<StrapiPost> = await res.json();
    const posts = (postJson.data || []).map((post: any) => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        body: post.body,
        image: post.image?.url
            ? post.image.url.startsWith('http') ? post.image.url : `${strapiUrl}${post.image.url}`
            : '/image/no-image.png',
    }));

    return { posts };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {

    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 2;
    const filteredPosts = loaderData.posts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()))

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

    return (
        <div className="flex flex-col min-h-[80vh] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

            <header className="mb-16 text-center relative z-10 pt-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-block p-3 bg-blue-500/10 rounded-full mb-4 text-blue-400 text-2xl">
                        <FaPenFancy />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 mb-4 drop-shadow-lg">
                        The Dev Blog
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Thoughts, tutorials, and insights for modern developers.
                    </p>
                </motion.div>
            </header>

            <div className="max-w-4xl mx-auto w-full">
                <PostFilter searchQuery={searchQuery} onSearchQueryChange={(query) => {
                    setSearchQuery(query)
                    setCurrentPage(1)
                }} />

                <motion.div 
                    layout
                    className="space-y-6"
                >
                    <AnimatePresence mode="wait">
                        {currentPosts.length === 0 ? (
                            <motion.div
                                key="no-results"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="text-center py-20 text-gray-500 bg-gray-900/30 rounded-2xl border border-gray-800"
                            >
                                <motion.p
                                    initial={{ y: 10 }}
                                    animate={{ y: 0 }}
                                    className="text-xl"
                                >
                                    No posts found matching "{searchQuery}"
                                </motion.p>
                            </motion.div>
                        ) : (
                            currentPosts.map((post, index) => (
                                <PostCard key={post.slug} post={post} index={index} />
                            ))
                        )}
                    </AnimatePresence>
                </motion.div>

                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPage;