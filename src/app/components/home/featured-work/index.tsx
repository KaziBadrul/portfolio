"use client";
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Sparkles } from "lucide-react";
import ProjectModal from "./ProjectModal";

const FeaturedWork = () => {
    const [featureWork, setFeatureWork] = useState<any>(null);
    const [showAll, setShowAll] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/featured-work')
                if (!res.ok) throw new Error('Failed to fetch')
                const data = await res.json()
                setFeatureWork(data?.featureWork)
            } catch (error) {
                console.error('Error fetching services:', error)
            }
        }

        fetchData()
    }, [])

    const displayedWork = showAll ? featureWork : featureWork?.slice(0, 4);

    return (
        <section>
            <div className="container">
                <div className="border-x border-primary/10">
                    <div className="flex flex-col max-w-3xl mx-auto py-10 px-4 sm:px-7">
                        <div className="flex flex-col xs:flex-row gap-5 items-center justify-between">
                            <p className="text-sm tracking-[2px] text-primary uppercase font-medium">Featured work</p>
                            <Button asChild variant={"outline"} className="h-auto">
                                <a href="/images/feature-work/CV.pdf" target="_blank" rel="noopener noreferrer" className="py-3 px-5">
                                    Download Portfolio
                                </a>
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 border-t border-primary/10">
                        {displayedWork?.map((value: any, index: number) => {
                            const isRightCol = index % 2 === 1;

                            return (
                                <div
                                    key={index}
                                    className={`group flex flex-col gap-3.5 sm:gap-5 p-3.5 sm:p-6 ${isRightCol ? 'md:border-l md:border-primary/10' : ''}`}
                                >
                                    <div
                                        className="overflow-hidden cursor-pointer relative w-full h-[220px] sm:h-[260px] md:h-[300px] rounded-t-lg"
                                        onClick={() => setSelectedProject(value)}
                                    >
                                        {value?.titles && value.titles.length > 0 && (
                                            <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                                                {value.titles.map((t: any, tIdx: number) => {
                                                    const badgeContent = (
                                                        <span
                                                            className="title-badge-modern"
                                                            style={{
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                gap: '6px',
                                                                padding: '7px 14px',
                                                                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.85), rgba(79, 70, 229, 0.85))',
                                                                backdropFilter: 'blur(12px)',
                                                                WebkitBackdropFilter: 'blur(12px)',
                                                                color: '#fff',
                                                                border: '1px solid rgba(167, 139, 250, 0.35)',
                                                                borderRadius: '8px',
                                                                fontSize: '11px',
                                                                fontWeight: 700,
                                                                letterSpacing: '0.08em',
                                                                textTransform: 'uppercase' as const,
                                                                boxShadow: '0 0 20px rgba(124, 58, 237, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                                cursor: t.link ? 'pointer' : 'default',
                                                                animation: 'badgeGlow 3s ease-in-out infinite',
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                const el = e.currentTarget;
                                                                el.style.transform = 'translateY(-2px) scale(1.03)';
                                                                el.style.boxShadow = '0 0 30px rgba(124, 58, 237, 0.5), 0 8px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
                                                                el.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.95), rgba(99, 102, 241, 0.95))';
                                                                el.style.borderColor = 'rgba(196, 181, 253, 0.5)';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                const el = e.currentTarget;
                                                                el.style.transform = 'translateY(0) scale(1)';
                                                                el.style.boxShadow = '0 0 20px rgba(124, 58, 237, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                                                                el.style.background = 'linear-gradient(135deg, rgba(124, 58, 237, 0.85), rgba(79, 70, 229, 0.85))';
                                                                el.style.borderColor = 'rgba(167, 139, 250, 0.35)';
                                                            }}
                                                        >
                                                            <Sparkles size={12} style={{ color: '#c4b5fd', flexShrink: 0 }} />
                                                            {t.name}
                                                        </span>
                                                    );

                                                    if (t.link) {
                                                        return (
                                                            <Link
                                                                key={tIdx}
                                                                href={t.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                onClick={(e) => e.stopPropagation()}
                                                                style={{ textDecoration: 'none' }}
                                                            >
                                                                {badgeContent}
                                                            </Link>
                                                        );
                                                    }

                                                    return (
                                                        <div key={tIdx} onClick={(e) => e.stopPropagation()}>
                                                            {badgeContent}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                        <Image
                                            src={value?.image}
                                            alt={value?.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover group-hover:scale-105 transition-all duration-300 ease-in-out"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 sm:gap-2 px-2">
                                        <div
                                            className="cursor-pointer hover:text-primary/70 transition-colors"
                                            onClick={() => setSelectedProject(value)}
                                        >
                                            <h4>{value?.title}</h4>
                                        </div>
                                        <div className="flex justify-between items-start flex-wrap gap-2">
                                            <p className="max-w-[85%]">{value?.roles?.join(', ')}</p>
                                            <div className="flex gap-3">
                                                {value?.github && (
                                                    <Link href={value.github} target="_blank" className="text-secondary hover:text-primary transition-colors">
                                                        <Github size={20} />
                                                    </Link>
                                                )}
                                                {value?.livePreview && (
                                                    <Link href={value.livePreview} target="_blank" className="text-secondary hover:text-primary transition-colors">
                                                        <ExternalLink size={20} />
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {featureWork?.length > 4 && (
                        <div className="flex justify-center border-t border-primary/10 p-6">
                            <Button
                                variant="outline"
                                className="py-3 px-5 transition-all"
                                onClick={() => setShowAll(!showAll)}
                            >
                                {showAll ? "Show Less" : "Show More"}
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Project Modal */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </section>
    )
}

export default FeaturedWork