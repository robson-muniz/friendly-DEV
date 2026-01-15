import type { Route } from "./+types"
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { FaPaperPlane, FaUser, FaEnvelope, FaTag, FaCommentAlt } from "react-icons/fa";
import { useActionData, Form, useNavigation } from "react-router";
import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState } from "react";

/**
 * ANIMATION VARIANTS
 * Centralizing animations makes the JSX cleaner and ensures consistency.
 */
const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, staggerChildren: 0.1 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const inputVariants: Variants = {
    focus: { scale: 1.01, transition: { type: "spring", stiffness: 300 } }
};

/**
 * TYPES
 */
interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

interface ActionData {
    errors?: FormErrors;
    message?: string;
    success?: boolean;
}

/**
 * REUSABLE COMPONENTS
 */
const FormField = ({ 
    label, 
    id, 
    name, 
    type = "text", 
    placeholder, 
    icon: Icon, 
    error, 
    isTextArea = false 
}: {
    label: string;
    id: string;
    name: string;
    type?: string;
    placeholder: string;
    icon: React.ElementType;
    error?: string;
    isTextArea?: boolean;
}) => {
    const InputComponent = isTextArea ? motion.textarea : motion.input;
    
    return (
        <motion.div className="space-y-2" variants={itemVariants}>
            <label htmlFor={id} className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Icon className="text-blue-400" /> {label}
            </label>
            <InputComponent
                id={id}
                name={name}
                type={!isTextArea ? type : undefined}
                rows={isTextArea ? 5 : undefined}
                placeholder={placeholder}
                className={`w-full px-4 py-3 rounded-xl bg-gray-900/50 border ${error ? 'border-red-500/50' : 'border-gray-700'} text-gray-100 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all ${isTextArea ? 'resize-none' : ''}`}
                whileFocus="focus"
                variants={inputVariants}
            />
            <AnimatePresence mode="wait">
                {error && (
                    <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-400 text-xs mt-1 ml-1"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

/**
 * SERVER ACTION
 * Handles form validation and submission logic.
 */
export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    const errors: FormErrors = {};

    // Robust validation logic
    if (!name?.trim()) errors.name = 'Name is required';
    if (!email?.trim()) {
        errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Please enter a valid email address';
    }
    if (!subject?.trim()) errors.subject = 'Subject is required';
    if (!message?.trim()) errors.message = 'Message is required';

    if (Object.keys(errors).length > 0) {
        return { errors, success: false };
    }

    return { success: true };
}

export default function ContactPage() {
    const actionData = useActionData<ActionData>();
    const navigation = useNavigation();
    const formRef = useRef<HTMLFormElement>(null);
    const [isSending, setIsSending] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

    const errors = actionData?.errors || {};

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // We let React Router handle the action first for validation
    };

    useEffect(() => {
        if (actionData?.success && formRef.current) {
            const sendEmail = async () => {
                setIsSending(true);
                try {
                    // Check if environment variables are set
                    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || (typeof window !== "undefined" && (window as any).ENV?.VITE_EMAILJS_SERVICE_ID);
                    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || (typeof window !== "undefined" && (window as any).ENV?.VITE_EMAILJS_TEMPLATE_ID);
                    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || (typeof window !== "undefined" && (window as any).ENV?.VITE_EMAILJS_PUBLIC_KEY);

                    if (!serviceId || !templateId || !publicKey) {
                        console.error("Missing EmailJS Config:", { 
                            hasService: !!serviceId, 
                            hasTemplate: !!templateId, 
                            hasPublic: !!publicKey 
                        });
                        throw new Error("EmailJS configuration is missing");
                    }

                    await emailjs.sendForm(
                        serviceId,
                        templateId,
                        formRef.current!,
                        publicKey
                    );
                    setResult({
                        success: true,
                        message: "Thanks for reaching out! I'll get back to you shortly."
                    });
                    formRef.current?.reset();
                } catch (error) {
                    console.error("EmailJS Error:", error);
                    setResult({
                        success: false,
                        message: error instanceof Error && error.message.includes("configuration") 
                            ? "Email service is not configured correctly." 
                            : "Failed to send email. Please try again later."
                    });
                } finally {
                    setIsSending(false);
                }
            };
            sendEmail();
        }
    }, [actionData]);

    const showSuccess = result?.success || actionData?.success;
    const message = result?.message || actionData?.message;

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12">
            {/* Header Section */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="text-center mb-12"
            >
                <motion.h2 
                    variants={itemVariants}
                    className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 mb-4"
                >
                    Get in Touch
                </motion.h2>
                <motion.p 
                    variants={itemVariants}
                    className="text-gray-400 text-lg max-w-xl mx-auto"
                >
                    Have a project in mind or just want to say hi? I'd love to hear from you.
                </motion.p>
            </motion.div>

            {/* Form Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full max-w-2xl"
            >
                <div className="glass rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden border border-white/5">
                    {/* Background Decorative Elements */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Success Message */}
                    <AnimatePresence>
                        {showSuccess && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                animate={{ opacity: 1, height: "auto", marginBottom: 32 }}
                                exit={{ opacity: 0, height: 0 }}
                                className={`${result?.success === false ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-green-500/10 border-green-500/30 text-green-400'} p-6 rounded-xl text-center backdrop-blur-sm overflow-hidden`}
                            >
                                <div className="text-5xl mb-3">{result?.success === false ? '❌' : '🎉'}</div>
                                <h3 className="text-xl font-bold mb-2">{result?.success === false ? 'Error' : 'Message Received!'}</h3>
                                <p>{message}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Contact Form */}
                    <Form method="post" ref={formRef} className="space-y-6 relative z-10">
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                                label="Full Name"
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                icon={FaUser}
                                error={errors.name}
                            />
                            <FormField
                                label="Email Address"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                icon={FaEnvelope}
                                error={errors.email}
                            />
                        </div>

                        <FormField
                            label="Subject"
                            id="subject"
                            name="subject"
                            placeholder="Project collaboration..."
                            icon={FaTag}
                            error={errors.subject}
                        />

                        <FormField
                            label="Message"
                            id="message"
                            name="message"
                            placeholder="Tell me about your project..."
                            icon={FaCommentAlt}
                            error={errors.message}
                            isTextArea
                        />

                        <motion.button
                            type="submit"
                            disabled={isSending || navigation.state === "submitting"}
                            className="group w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-3 cursor-pointer relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            <motion.span
                                className="relative z-10 flex items-center gap-3"
                                animate={{ x: [0, 2, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                {isSending || navigation.state === "submitting" ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        Send Message
                                    </>
                                )}
                            </motion.span>
                        </motion.button>
                    </Form>
                </div>
            </motion.div>
        </div>
    );
}