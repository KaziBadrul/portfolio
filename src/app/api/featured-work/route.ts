import { NextResponse } from "next/server";
import projectsData from "../../../data/projects.json";

export const GET = async () => {
    return NextResponse.json({
        featureWork: projectsData
    });
};