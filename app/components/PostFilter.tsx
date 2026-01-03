import { FaSearch } from "react-icons/fa";

type PostFilterProps = {
    searchQuery: string;
    onSearchQueryChange: (query: string) => void;
};

const PostFilter = ({ searchQuery, onSearchQueryChange }: PostFilterProps) => {
    return (
        <div className="mb-8 relative max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
            </div>
            <input
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm"
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
            />
        </div>
    );
};

export default PostFilter;
