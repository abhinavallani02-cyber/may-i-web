import { Navbar } from './components/Navbar'
import { DevBanner } from './components/DevBanner'
import { HeroBackground } from './components/HeroBackground'
import { SectionOne } from './components/SectionOne'
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
  return (
    <div className="relative bg-black">
      <HeroBackground />

      <div className="relative z-10">
        <div className="fixed inset-x-0 top-0 z-50">
          <DevBanner />
          <Navbar />
        </div>
        <main>
          <SectionOne />
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
