"use client";
import Image from "next/image";
import Link from "next/link";
import certificatesData from "@/data/certificates.json";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Certificates = () => {
    // Sort items with priority and fall back for others securely for SSR
    const initialWithPriority = certificatesData
        .filter((c: any) => typeof c.priority === 'number')
        .sort((a: any, b: any) => a.priority - b.priority);
    const initialWithoutPriority = certificatesData.filter((c: any) => typeof c.priority !== 'number');

    const [sortedCertificates, setSortedCertificates] = useState<any[]>([...initialWithPriority, ...initialWithoutPriority]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        // Safely shuffle non-prioritized certificates on the client side
        const shuffled = [...initialWithoutPriority].sort(() => Math.random() - 0.5);
        setSortedCertificates([...initialWithPriority, ...shuffled]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const displayedWork = showAll ? sortedCertificates : sortedCertificates?.slice(0, 3);

    return (
        <section>
            <div className="container">
                <div className="border-x border-primary/10">
                    <div className="flex flex-col max-w-3xl mx-auto py-10 px-4 sm:px-7">
                        <div className="flex flex-col xs:flex-row gap-5 items-center justify-between">
                            <p className="text-sm tracking-[2px] text-primary uppercase font-medium">Licenses & Certifications</p>
                        </div>
                    </div>
                    <div className="border-t border-primary/10">
                        <div className="flex flex-col max-w-3xl mx-auto px-4 sm:px-7 py-9 md:py-16">
                            {displayedWork?.map((cert: any, index: number) => {
                                return (
                                    <div key={index} className="flex gap-4 sm:gap-6 border-dashed border-b border-primary/10 last:border-b-0 py-6 sm:py-8 first:pt-0 last:pb-0">
                                        {/* Image/Logo */}
                                        <div className="shrink-0 sm:mt-1">
                                            {cert.image ? (
                                                <div className="relative w-32 h-24 sm:w-64 sm:h-48 border border-primary/10 bg-muted/30 rounded-lg flex items-center justify-center overflow-hidden">
                                                    <Image
                                                        src={cert.image}
                                                        alt={cert.issuingOrganization}
                                                        fill
                                                        className="object-cover sm:object-contain"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 flex items-center justify-center rounded">
                                                    <span className="text-xl sm:text-3xl font-semibold text-primary">{cert.issuingOrganization.charAt(0)}</span>
                                                </div>
                                            )}
                                        </div>
                                        {/* Details */}
                                        <div className="flex flex-col gap-1 w-full">
                                            <h5 className="text-base sm:text-lg font-semibold text-primary">{cert.name}</h5>
                                            <p className="text-sm sm:text-base text-secondary">{cert.issuingOrganization}</p>
                                            <p className="text-sm text-secondary/80">Issued {cert.issueMonth} {cert.issueYear}</p>

                                            {cert.credentialId && (
                                                <p className="text-sm text-secondary/80 mt-1">Credential ID {cert.credentialId}</p>
                                            )}
                                            {cert.credentialUrl && (
                                                <Link
                                                    href={cert.credentialUrl}
                                                    target="_blank"
                                                    className="mt-3 inline-block border border-primary/20 hover:border-primary/50 text-secondary hover:text-primary transition-colors text-sm py-1.5 px-4 rounded-full max-w-max"
                                                >
                                                    Show credential
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {sortedCertificates?.length > 3 && (
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
        </section>
    );
}

export default Certificates;
