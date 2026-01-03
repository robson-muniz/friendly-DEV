import type { Route } from "./+types"
import { Form } from "react-router"
import { motion } from "framer-motion";
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
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <FaUser className="text-blue-400" /> Full Name
                                </label>
                                <input
                                    type="text"
                                    id='name'
                                    name='name'
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-gray-100 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                />
                                {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <FaEnvelope className="text-blue-400" /> Email Address
                                </label>
                                <input
                                    type="email"
                                    id='email'
                                    name='email'
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-gray-100 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                />
                                {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <FaTag className="text-blue-400" /> Subject
                            </label>
                            <input
                                type="text"
                                id='subject'
                                name='subject'
                                placeholder="Project collaboration..."
                                className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-gray-100 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                            />
                            {errors.subject && <p className="text-red-400 text-xs mt-1 ml-1">{errors.subject}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <FaCommentAlt className="text-blue-400" /> Message
                            </label>
                            <textarea
                                id='message'
                                name='message'
                                rows={5}
                                placeholder="Tell me about your project..."
                                className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-gray-100 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                            />
                            {errors.message && <p className="text-red-400 text-xs mt-1 ml-1">{errors.message}</p>}
                        </div>

                        <button className="group w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 cursor-pointer">
                            <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            Send Message
                        </button>
                    </Form>
                </div>
            </motion.div>
        </div>
    );
}