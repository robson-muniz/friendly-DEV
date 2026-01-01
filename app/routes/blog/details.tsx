import ReactMarkdown from 'react-markdown';
import type {Route} from './+types/details'
import type {PostMeta} from "~/types";

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
    console.log(postMeta, markdown);
    return (
        <>
        Blog Details Page
        </>
    );
};

export default BlogDetailsPage;