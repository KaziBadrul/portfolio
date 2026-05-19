"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

export default function ProfilePopup() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer absolute top-0 transform -translate-y-1/2 z-10"
                onClick={() => setIsOpen(true)}
            >
                <Image
                    src={"/images/hero-sec/profile.png"}
                    alt="user-img"
                    width={145}
                    height={145}
                    className="border-4 border-white rounded-full shadow-lg transition-shadow hover:shadow-primary/50 hover:shadow-2xl"
                    priority
                />
                <span className="absolute bottom-2.5 right-5 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 30 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-primary/20 z-10"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>

                            <div className="h-32 bg-[linear-gradient(96.09deg,_#9282F8_12.17%,_#F3CA4D_90.71%)]"></div>

                            <div className="px-6 pb-8 flex flex-col items-center">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="-mt-16 ring-4 ring-white dark:ring-zinc-900 rounded-full bg-white relative overflow-hidden"
                                >
                                    <Image
                                        src={"/images/hero-sec/profile.png"}
                                        alt="Kazi Badrul Hasan"
                                        width={120}
                                        height={120}
                                        className="object-cover"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="mt-4 text-center"
                                >
                                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Kazi Badrul Hasan</h3>
                                    <p className="text-violet-600 dark:text-violet-400 font-medium mt-1">
                                        Student, Computer Science (IUT &apos;27)
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="mt-6 flex flex-wrap justify-center gap-2"
                                >
                                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                                        Machine Learning
                                    </span>
                                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                                        Computer Vision
                                    </span>
                                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                                        Full-Stack
                                    </span>
                                </motion.div>

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-6 text-sm text-center text-zinc-600 dark:text-zinc-400 leading-relaxed"
                                >
                                    Currently researching advanced learning techniques with faculty mentorship. Looking forward to leveraging technical depth in solving complex problems.
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
