import { Link } from "react-router";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items center justify-center text-center px-6 min-h-[70vh]">
            <h1 className="text-6xl font-extrabold text-blue-400 mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Page Not Found</h2>
            <p className="text-lg text-gray-500">The page you are looking for does not exist.</p>
            <Link to="/" className="text-blue-500 hover:underline">Go back to home</Link>
        </div>
    );
};

export default NotFoundPage;