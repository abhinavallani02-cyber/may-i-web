import { Navbar } from './components/Navbar'
import { DevBanner } from './components/DevBanner'
import { HeroBackground } from './components/HeroBackground'
import { ClickThroughBackdrop } from './components/ClickThroughBackdrop'
import { SectionOne } from './components/SectionOne'
import { ProblemSection } from './components/ProblemSection'
import { SectionTwo } from './components/SectionTwo'
import { DemoSection } from './components/DemoSection'
import { WhyNotManualSection } from './components/WhyNotManualSection'
import { PrivacySection } from './components/PrivacySection'
import { QuickstartSection } from './components/QuickstartSection'
import { StatusSection } from './components/StatusSection'
import { AboutSection } from './components/AboutSection'
import { FaqSection } from './components/FaqSection'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="relative bg-black">
      <HeroBackground />
      <ClickThroughBackdrop />

      <div className="relative z-10">
        <div className="fixed inset-x-0 top-0 z-50">
          <DevBanner />
          <Navbar />
        </div>
        <main>
          <SectionOne />
          {/* Gives ClickThroughBackdrop room to play its cursor -> click ->
              typing story before Problem begins, so the floating card is
              always confined to Hero and never overlaps section copy. */}
          <div id="hero-spacer" className="h-[90vh]" aria-hidden="true" />
          <ProblemSection />
          <SectionTwo />
          <DemoSection />
          <WhyNotManualSection />
          <PrivacySection />
          <QuickstartSection />
          <StatusSection />
          <AboutSection />
          <FaqSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
