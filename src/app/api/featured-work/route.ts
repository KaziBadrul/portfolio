import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import projectsData from "../../../data/projects.json";

export const GET = async () => {
    const imagesDir = path.join(process.cwd(), "public/images/feature-work");
    let allImages: string[] = [];

    try {
        allImages = fs.readdirSync(imagesDir);
    } catch (e) {
        console.error("Failed to read images directory", e);
    }

    const enhancedProjects = projectsData.map((project: any, index: number) => {
        let matchingImages: string[] = [];

        if (project.imagePrefix) {
            matchingImages = allImages
                .filter(file => file.startsWith(project.imagePrefix + "-") || file.split('.')[0] === project.imagePrefix)
                .sort((a, b) => {
                    // Extract number from "acadex-1.png" -> 1
                    const numA = parseInt(a.replace(/[^0-9]/g, '')) || 0;
                    const numB = parseInt(b.replace(/[^0-9]/g, '')) || 0;
                    return numA - numB;
                })
                .map(file => `/images/feature-work/${file}`);
        }

        // Fallback Logic if no specific images found
        if (matchingImages.length === 0) {
            // Pick feature-img-1 or feature-img-2 based on index for consistent variety
            const fallbackOption = (index % 2) === 0 ? "feature-img-1.png" : "feature-img-2.png";
            matchingImages = [`/images/feature-work/${fallbackOption}`];
        }

        return {
            ...project,
            images: matchingImages,
            image: matchingImages[0], // Main thumbnail image
        };
    });

    return NextResponse.json({
        featureWork: enhancedProjects
    });
};