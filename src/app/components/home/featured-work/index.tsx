"use client";
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
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