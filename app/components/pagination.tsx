import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type PaginationProps = {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({
    totalPages,
    currentPage,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    const visiblePages = getVisiblePages();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center items-center gap-2 mt-8 flex-wrap"
        >
            {/* Previous Button */}
            <motion.button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                whileHover={{ scale: currentPage !== 1 ? 1.1 : 1 }}
                whileTap={{ scale: currentPage !== 1 ? 0.95 : 1 }}
                className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                    currentPage === 1
                        ? "bg-gray-800/50 text-gray-600 cursor-not-allowed"
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700 hover:border-blue-500/50"
                }`}
            >
                <FaChevronLeft className="text-xs" />
                <span className="hidden sm:inline">Prev</span>
            </motion.button>

            {/* Page Numbers */}
            {visiblePages.map((page, index) => {
                if (page === '...') {
                    return (
                        <span key={`dots-${index}`} className="px-2 text-gray-500">
                            ...
                        </span>
                    );
                }

                const pageNum = page as number;
                const isActive = pageNum === currentPage;

                return (
                    <motion.button
                        key={pageNum}
                        onClick={() => onPageChange(pageNum)}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative px-4 py-2 rounded-xl font-medium transition-all min-w-[44px] ${
                            isActive
                                ? "text-white"
                                : "bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700 hover:border-blue-500/50"
                        }`}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activePage"
                                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl shadow-lg shadow-blue-500/25"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{pageNum}</span>
                    </motion.button>
                );
            })}

            {/* Next Button */}
            <motion.button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                whileHover={{ scale: currentPage !== totalPages ? 1.1 : 1 }}
                whileTap={{ scale: currentPage !== totalPages ? 0.95 : 1 }}
                className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                    currentPage === totalPages
                        ? "bg-gray-800/50 text-gray-600 cursor-not-allowed"
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700 hover:border-blue-500/50"
                }`}
            >
                <span className="hidden sm:inline">Next</span>
                <FaChevronRight className="text-xs" />
            </motion.button>
        </motion.div>
    );
}
