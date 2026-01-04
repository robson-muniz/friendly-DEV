import type { Route } from "./+types"
import { Form } from "react-router"
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaUser, FaEnvelope, FaTag, FaCommentAlt } from "react-icons/fa";

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string
    const data = { name, email, subject, message }

    const errors: Record<string, string> = {}

    if (!name) errors.name = 'Name is required';

    if (!email) {
        errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Email is invalid';
    }

    if (!subject) errors.subject = 'Subject is required';
    if (!message) errors.message = 'Message is required';

    if (Object.keys(errors).length > 0) {
        return { errors }
    }

    return { message: 'Message sent successfully! I will get back to you soon.', data }
}

export default function ContactPage({ actionData }: Route.ComponentProps) {
    const errors = actionData?.errors || {};

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 mb-4">
                    Get in Touch
                </h2>
                <p className="text-gray-400 text-lg max-w-xl mx-auto">
                    Have a project in mind or just want to say hi? I'd love to hear from you.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full max-w-2xl"
            >
                <div className="glass rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                    {/* Decorative glow */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                    {actionData?.message ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-green-500/10 border border-green-500/30 text-green-400 p-6 rounded-xl text-center mb-8 backdrop-blur-sm"
                        >
                            <div className="text-5xl mb-3">🎉</div>
                            <h3 className="text-xl font-bold mb-2">Message Received!</h3>
                            <p>{actionData.message}</p>
                        </motion.div>
                    ) : null}

                    <Form method="post" className="space-y-6 relative z-10">
                        <motion.div 
                            className="grid md:grid-cols-2 gap-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <motion.div 
                                className="space-y-2"
                                whileFocus={{ scale: 1.02 }}
                            >
                                <label htmlFor="name" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <FaUser className="text-blue-400" /> Full Name
                                </label>
                                <motion.input
                                    type="text"
                                    id='name'
                                    name='name'
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-gray-100 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                    whileFocus={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                />
                                <AnimatePresence>
                                    {errors.name && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="text-red-400 text-xs mt-1 ml-1"
                                        >
                                            {errors.name}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            <motion.div 
                                className="space-y-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                            >
                                <label htmlFor="email" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <FaEnvelope className="text-blue-400" /> Email Address
                                </label>
                                <motion.input
                                    type="email"
                                    id='email'
                                    name='email'
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-gray-100 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                    whileFocus={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                />
                                <AnimatePresence>
                                    {errors.email && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="text-red-400 text-xs mt-1 ml-1"
                                        >
                                            {errors.email}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <label htmlFor="subject" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <FaTag className="text-blue-400" /> Subject
                            </label>
                            <motion.input
                                type="text"
                                id='subject'
                                name='subject'
                                placeholder="Project collaboration..."
                                className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-gray-100 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                whileFocus={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            />
                            <AnimatePresence>
                                {errors.subject && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-red-400 text-xs mt-1 ml-1"
                                    >
                                        {errors.subject}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                        >
                            <label htmlFor="message" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <FaCommentAlt className="text-blue-400" /> Message
                            </label>
                            <motion.textarea
                                id='message'
                                name='message'
                                rows={5}
                                placeholder="Tell me about your project..."
                                className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-gray-100 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                                whileFocus={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            />
                            <AnimatePresence>
                                {errors.message && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-red-400 text-xs mt-1 ml-1"
                                    >
                                        {errors.message}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.button
                            type="submit"
                            className="group w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-3 cursor-pointer relative overflow-hidden"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                initial={false}
                            />
                            <motion.span
                                className="relative z-10 flex items-center gap-3"
                                animate={{ x: [0, 2, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                Send Message
                            </motion.span>
                        </motion.button>
                    </Form>
                </div>
            </motion.div>
        </div>
    );
}