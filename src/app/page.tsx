import Divider from "./components/divider"
import AboutMe from "./components/home/about-me"
import Education from "./components/home/education"
import Experience from "./components/home/experience"
import FeaturedWork from "./components/home/featured-work"
import HeroSection from "./components/home/hero-section"
import ProjectOverview from "./components/home/project-overview"
import ScrollReveal from "./components/shared/ScrollReveal"

const page = () => {
  return (
    <main>
      <ScrollReveal yOffset={0}>
        <HeroSection />
      </ScrollReveal>
      <Divider />
      <ScrollReveal>
        <AboutMe />
      </ScrollReveal>
      <Divider />
      <ScrollReveal>
        <FeaturedWork />
      </ScrollReveal>
      <Divider />
      <ScrollReveal>
        <Experience />
      </ScrollReveal>
      <Divider />
      <ScrollReveal>
        <Education />
      </ScrollReveal>
      <Divider />
      <ScrollReveal>
        <ProjectOverview />
      </ScrollReveal>
      <Divider />
    </main>
  )
}

export default page