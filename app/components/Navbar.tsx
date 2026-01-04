import { NavLink } from 'react-router';
import { FaLaptopCode, FaTimes, FaBars } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

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
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled
                ? "glass backdrop-blur-xl py-4 shadow-2xl shadow-blue-500/5 border-b border-white/5"
                : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <NavLink
                        to='/'
                        className="flex items-center gap-3 group relative"
                        onMouseEnter={() => setHoveredLink('logo')}
                        onMouseLeave={() => setHoveredLink(null)}
                    >
                        <motion.div
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            className="relative p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300"
                        >
                            <FaLaptopCode className='text-blue-400 text-2xl' />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border border-blue-500/30 rounded-xl"
                            />
                        </motion.div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                                Robson<span className="text-white">Dev</span>
                            </span>
                            <span className="text-xs text-gray-400 font-light tracking-widest">PORTFOLIO</span>
                        </div>
                        {hoveredLink === 'logo' && (
                            <motion.div
                                layoutId="nav-highlight"
                                className="absolute -inset-2 bg-blue-500/10 rounded-xl -z-10"
                                transition={{ type: "spring", bounce: 0.2 }}
                            />
                        )}
                    </NavLink>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onMouseEnter={() => setHoveredLink(link.path)}
                                onMouseLeave={() => setHoveredLink(null)}
                                className={({ isActive }) =>
                                    `relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${isActive
                                        ? "text-white"
                                        : "text-gray-400 hover:text-white"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <span className="relative z-10 flex items-center gap-2">
                                            {link.name}
                                            {isActive && <HiSparkles className="text-yellow-400 text-xs" />}
                                        </span>
                                        {(isActive || hoveredLink === link.path) && (
                                            <motion.div
                                                layoutId="nav-highlight"
                                                className="absolute inset-0 bg-white/5 rounded-lg -z-10"
                                                transition={{ type: "spring", bounce: 0.2 }}
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}

                        {/* CTA Button */}
                        <NavLink
                            to="/contact"
                            className="ml-4 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur group-hover:blur-md transition-all duration-300"></div>
                            <div className="relative px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group-hover:-translate-y-0.5">
                                <span className="flex items-center gap-2">
                                    Hire Me
                                    <motion.span
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        →
                                    </motion.span>
                                </span>
                            </div>
                        </NavLink>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-3 glass rounded-xl border border-white/10 text-gray-300 hover:text-white transition"
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass backdrop-blur-xl border-t border-white/10 mt-4 overflow-hidden"
                    >
                        <div className="p-6 space-y-2">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block px-4 py-3 rounded-xl text-lg font-medium transition-all ${isActive
                                            ? "bg-white/10 text-white border-l-4 border-blue-500"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <span className="flex items-center gap-3">
                                            {link.name}
                                            {isActive && <HiSparkles className="text-yellow-400" />}
                                        </span>
                                    )}
                                </NavLink>
                            ))}
                            <NavLink
                                to="/contact"
                                onClick={() => setMenuOpen(false)}
                                className="block mt-6 px-4 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-center hover:shadow-2xl hover:shadow-blue-500/25 transition-all"
                            >
                                Hire Me
                            </NavLink>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;