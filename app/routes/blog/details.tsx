import ReactMarkdown from 'react-markdown';
import type {Route} from './+types/details'
import type {PostMeta} from "~/types";
import {Link} from "react-router";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";

export async function loader({request, params}: Route.LoaderArgs) {
    const {slug} = params;

    const url = new URL(`/posts-meta.json`, request.url);
    const res = await fetch(url.href);

    if (!res.ok) throw new Error('Failed to fetch posts metadata');

    const index = await res.json();

    const postMeta = index.find((post: PostMeta) => post.slug === slug);
    if (!postMeta) throw new Response('Post not found', {status: 404});

    //Dynamic import the raw markdown file
    const markdown = await import(`../../posts/${slug}.md?raw`);

    return {
        postMeta,
        markdown: markdown.default
    }
}

const BlogDetailsPage = ({loaderData} : Route.ComponentProps) => {
    const {postMeta, markdown} = loaderData;
    
    // Estimate reading time (average 200 words per minute)
    const wordCount = markdown.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return (
        <div className='min-h-screen py-12 px-6 relative overflow-hidden'>
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <Link 
                        to='/blog' 
                        className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Blog</span>
                    </Link>
                </motion.div>

                {/* Article Header */}
                <motion.header
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-12"
                >
                    <motion.h1 
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {postMeta.title}
                    </motion.h1>
                    
                    <div className="flex flex-wrap items-center gap-6 text-gray-400">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center gap-2"
                        >
                            <FaCalendarAlt className="text-blue-400" />
                            <span>{new Date(postMeta.date).toLocaleDateString(undefined, { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}</span>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-2"
                        >
                            <FaClock className="text-purple-400" />
                            <span>{readingTime} min read</span>
                        </motion.div>
                    </div>
                </motion.header>

                {/* Article Content */}
                <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass rounded-3xl p-8 md:p-12 mb-12 border border-white/5"
                >
                    <div className="prose prose-invert prose-lg max-w-none 
                        prose-headings:text-white prose-headings:font-bold
                        prose-p:text-gray-300 prose-p:leading-relaxed
                        prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-white prose-strong:font-semibold
                        prose-code:text-cyan-300 prose-code:bg-gray-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                        prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
                        prose-blockquote:border-l-blue-500 prose-blockquote:text-gray-300
                        prose-img:rounded-xl prose-img:shadow-2xl
                        prose-ul:text-gray-300 prose-ol:text-gray-300
                        prose-li:marker:text-blue-400">
                        <ReactMarkdown>{markdown}</ReactMarkdown>
                    </div>
                </motion.article>

                {/* Footer Navigation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center pt-8 border-t border-gray-800"
                >
                    <Link 
                        to='/blog'
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 border border-white/10 hover:border-blue-500/50 text-white font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to All Posts</span>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default BlogDetailsPage;