import { Outlet } from "react-router";
import type { Route } from '../about/+types'

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "The Robson DEV" },
        { name: "description", content: "Custom Website Developer" },
    ];
}

const MainLayout = () => {

    return (
        <>
            <section className='max-w-6xl mx-auto px-6 my-8'>
                <Outlet />
            </section>
        </>
    );
};

export default MainLayout;