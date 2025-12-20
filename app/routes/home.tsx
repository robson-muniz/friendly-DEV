import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "The Friendly DEV" },
        { name: "description", content: "Custom Website Developer" },
    ];
}

export default function Home() {
    return <section>My App</section>;
}