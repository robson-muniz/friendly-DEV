import { NavLink } from 'react-router';
import { FaLaptopCode, FaTimes, FaBars } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Detect scroll for styling
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: "Blog", path: "/blog" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <nav
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-lg" : "bg-transparent py-4"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">

                {/* Logo */}
                <NavLink to='/' className="flex items-center gap-2 group">
                    <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition duration-300">
                        <FaLaptopCode className='text-blue-500 text-2xl group-hover:scale-110 transition-transform duration-300' />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                        Friendly<span className="text-gray-100">Dev</span>
                    </span>
                </NavLink>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `relative text-sm font-medium transition-colors duration-300 ${isActive ? "text-blue-400" : "text-gray-300 hover:text-white"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}

                    {/* CTA Button */}
                    <NavLink
                        to="/contact"
                        className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-500/25"
                    >
                        Hire Me
                    </NavLink>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 text-gray-300 hover:text-white transition"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-gray-800 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `text-lg font-medium transition ${isActive ? "text-blue-400 pl-4 border-l-2 border-blue-500" : "text-gray-300 hover:text-white pl-4 border-l-2 border-transparent"
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;