import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const AboutPreview = () => {
    return (
        <section className="py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 hover:border-blue-500/30 transition-colors duration-500"
            >
                <div className="relative shrink-0 group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <img
                        src='/images/profile.jpg'
                        alt='Robson Muniz'
                        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-800 shadow-xl group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Meet the Dev 👋
                    </h2>
                    <p className="text-gray-300 mb-6 max-w-2xl text-lg leading-relaxed">
                        I'm a passionate web developer and content creator who loves
                        building friendly digital experiences and helping others grow into
                        confident, modern developers.
                    </p>
                    <Link
                        to='/about'
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full font-semibold transition-all group"
                    >
                        More About Me <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </motion.div>
        </section>
    );
};

export default AboutPreview;