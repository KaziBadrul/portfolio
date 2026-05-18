import { NextResponse } from "next/server";

const experienceData = [
    {
        icon: "/images/icon/tailwind-icon.svg", // This is a placeholder, User said they'd handle images
        role: "Contract AI Solutions Developer - Upwork / Freelance",
        location: "Remote",
        startYear: "July 2025",
        endYear: "November 2025",
        bulletPoints: [
            "Engineered a data scraping and sentiment analysis pipeline using real-world multi-source data",
            "Built Python-based data aggregation system leveraging BeautifulSoup and Pandas",
            "Designed and implemented prompt engineering templates using OpenAI API to categorize sentiment with 90% accuracy",
            "Developed lightweight FastAPI backend to expose processed data for client's internal analytics team"
        ]
    },
    {
        icon: "/images/icon/asana-icon.svg", // Placeholder
        role: "PR & Marketing Lead - IUT Computer Science Society",
        location: "On-Campus",
        startYear: "Present",
        endYear: "Present",
        bulletPoints: [
            "Spearheaded marketing and public relations initiatives for IUT National ICT Fest 2024",
            "Engaged with 500+ students across campus to promote tech events and foster community involvement"
        ]
    },
    {
        icon: "/images/icon/asana-icon.svg", // Placeholder
        role: "Executive - Notre Dame International Understanding & Relationship Club",
        location: "On-Campus",
        startYear: "2020",
        endYear: "2022",
        bulletPoints: [
            "Led international relations and cultural exchange initiatives"
        ]
    }
]

const educationData = [
    {
        date: "Aug 2023 - Aug 2027",
        title: "B.Sc. in Computer Science (GPA: 3.80/4.0)",
        subtitle: "Islamic University of Technology (IUT)"
    },
    {
        date: "2020 - 2022",
        title: "High School Diploma (Science)",
        subtitle: "Notre Dame College"
    },
    {
        date: "Jan 2016 - Mar 2020",
        title: "High School",
        subtitle: "RAJUK Uttara Model College"
    }
];

const projectOverview = {
    caseStudies: [
        { name: "Few-Shot Learning for Defect Detection in RMG Garments", url: "#" },
        { name: "EconHub – AI-Powered Campus Marketplace", url: "https://github.com/KaziBadrul/hackathon-econ-website" },
        { name: "Transport Management System (TMS)", url: "https://github.com/KaziBadrul/RDBMS_Lab_Project" },
        { name: "Acadex – Unified Academic Workspace", url: "https://github.com/KaziBadrul/Acadex" }
    ],
    sideProjects: [
        { name: "CashBlock – Budget Management App", url: "https://github.com/KaziBadrul/CashBlock" },
        { name: "MiniMinds – Interactive Learning App for Kids", url: "https://github.com/KaziBadrul/miniminds" },
        { name: "SPREAD – Disease Transmission Simulator", url: "https://github.com/voidsamin/spread" },
        { name: "TaskLoop – Task Management CLI", url: "https://github.com/KaziBadrul/TaskLoop" },
    ]
};


export const GET = async () => {
    return NextResponse.json({
        experienceData,
        educationData,
        projectOverview
    });
};