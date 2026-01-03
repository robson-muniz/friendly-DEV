type PostFilterProps = {
    searchQuery: string;
    onSearchQueryChange: (query: string) => void;
};


const PostFilter = ({ searchQuery, onSearchQueryChange }: PostFilterProps) => {
    return (
        <div className="mb-4">
            <input
                className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-color-white border border-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
            />

        </div>
    );
};

export default PostFilter;
