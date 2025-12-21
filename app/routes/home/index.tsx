import type { Route } from "./+types/home";
import Hero from '~/components/Hero'

export function meta({}: Route.MetaArgs) {
    return [
        { title: "The Friendly DEV" },
        { name: "description", content: "Custom Website Developer" },
    ];
}

export default function Home() {
   return (
       <section>
           <Hero name='Robson Muniz' />
       </section>
   )
}