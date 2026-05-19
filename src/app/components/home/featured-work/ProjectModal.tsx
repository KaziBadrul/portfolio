"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";

interface ProjectModalProps {
    project: any;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const images = project?.images || [];

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImgIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!project) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-zinc-950 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-primary/20 z-10 flex flex-col"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-all"
                        aria-label="Close modal"
                    >
                        <X size={20} />
                    </button>

                    {/* Image Carousel */}
                    <div className="relative w-full h-48 sm:h-64 md:h-96 bg-zinc-100 dark:bg-zinc-900 group">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentImgIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full relative"
                            >
                                <Image
                                    src={images[currentImgIndex] || "/images/feature-work/feature-img-1.png"}
                                    alt={`${project.title} screenshot ${currentImgIndex + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover"
                                />
                            </motion.div>
                        </AnimatePresence>

                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/20 hover:bg-black/60 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all z-10"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/20 hover:bg-black/60 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all z-10"
                                >
                                    <ChevronRight size={24} />
                                </button>
                                <div className="absolute bottom-4 left-1/2 -translate-y-1/2 flex gap-1.5 z-10">
                                    {images.map((_: any, idx: number) => (
                                        <div
                                            key={idx}
                                            className={`w-2 h-2 rounded-full transition-all ${idx === currentImgIndex ? "bg-white scale-125" : "bg-white/50"}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Project Details */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-10 hide-scrollbar">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div className="flex-1">
                                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-2 leading-tight">
                                    {project.title}
                                </h2>

                                <div className="flex flex-wrap gap-2 mt-4 mb-6">
                                    {project.roles?.map((role: string, idx: number) => (
                                        <span key={idx} className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                                            {role}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4 items-center shrink-0">
                                {project.github && (
                                    <Link
                                        href={project.github}
                                        target="_blank"
                                        className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-medium rounded-xl transition-colors"
                                    >
                                        <Github size={18} />
                                        <span>View Code</span>
                                    </Link>
                                )}
                                {project.livePreview && (
                                    <Link
                                        href={project.livePreview}
                                        target="_blank"
                                        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-colors"
                                    >
                                        <ExternalLink size={18} />
                                        <span>Live Preview</span>
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="w-full h-px bg-primary/10 my-6" />

                        <div className="prose prose-zinc dark:prose-invert max-w-none">
                            <h3 className="text-lg font-semibold mb-3">About this project</h3>
                            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                                {project.readmeDescription || project.description || "Detailed description coming soon."}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
