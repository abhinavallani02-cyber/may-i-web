import { Navbar } from './components/Navbar'
import { DevBanner } from './components/DevBanner'
import { HeroBackground } from './components/HeroBackground'
import { SectionOne } from './components/SectionOne'
import { useScrollProgress } from './hooks/useScrollProgress'
import { ProblemSection } from './components/ProblemSection'
import { SectionTwo } from './components/SectionTwo'
import { DemoSection } from './components/DemoSection'
import { DifferentiationSection } from './components/DifferentiationSection'
import { PrivacySection } from './components/PrivacySection'
import { QuickstartSection } from './components/QuickstartSection'
import { ProgressSection } from './components/ProgressSection'
import { AboutSection } from './components/AboutSection'
import { FaqSection } from './components/FaqSection'
import { Footer } from './components/Footer'

function App() {
  const { ref: heroRef, progress: heroProgress } = useScrollProgress<HTMLDivElement>()

  return (
    <div className="relative bg-black">
      <HeroBackground scrollProgress={heroProgress} />

      <div className="relative z-10">
        <div className="fixed inset-x-0 top-0 z-50">
          <DevBanner />
          <Navbar />
        </div>
        <main>
          <div ref={heroRef}>
            <SectionOne scrollProgress={heroProgress} />
          </div>
          <ProblemSection />
          <SectionTwo />
          <DemoSection />
          <DifferentiationSection />
          <PrivacySection />
          <QuickstartSection />
          <ProgressSection />
          <AboutSection />
          <FaqSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
