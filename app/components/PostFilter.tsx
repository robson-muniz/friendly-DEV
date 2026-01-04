import { FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

type PostFilterProps = {
    searchQuery: string;
    onSearchQueryChange: (query: string) => void;
};

const PostFilter = ({ searchQuery, onSearchQueryChange }: PostFilterProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 relative max-w-xl"
        >
            <div className="relative group">
                <motion.div
                    className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10"
                    animate={{ 
                        scale: searchQuery ? [1, 1.2, 1] : 1,
                        rotate: searchQuery ? [0, 10, -10, 0] : 0
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <FaSearch className="text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                </motion.div>
                <motion.input
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm shadow-lg"
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => onSearchQueryChange(e.target.value)}
                    whileFocus={{ scale: 1.02 }}
                />
                
                {/* Animated border glow */}
                <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-blue-500/0 pointer-events-none"
                    animate={{
                        borderColor: searchQuery 
                            ? "rgba(59, 130, 246, 0.3)" 
                            : "rgba(59, 130, 246, 0)"
                    }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Search results count indicator */}
            <AnimatePresence>
                {searchQuery && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-gray-400"
                    >
                        Searching for "{searchQuery}"...
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default PostFilter;
