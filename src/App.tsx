import { SiteHeader } from './components/SiteHeader'
import { HeroSection } from './components/HeroSection'
import { LogoStrip } from './components/LogoStrip'
import { IntroSection } from './components/IntroSection'
import { SolutionSection } from './components/SolutionSection'
import { DemoSection } from './components/DemoSection'
import { CompareSection } from './components/CompareSection'
import { VerdictsSection } from './components/VerdictsSection'
import { StatsSection } from './components/StatsSection'
import { FaqSection } from './components/FaqSection'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-void text-white">
      <SiteHeader />
      <main>
        <HeroSection />
        <LogoStrip />
        <IntroSection />
        <SolutionSection />
        <DemoSection />
        <CompareSection />
        <VerdictsSection />
        <StatsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
