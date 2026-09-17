import { SiteHeader } from './components/SiteHeader'
import { HeroSection } from './components/HeroSection'
import { MarqueeSection } from './components/MarqueeSection'
import { IntroSection } from './components/IntroSection'
import { DeviceSection } from './components/DeviceSection'
import { CompareSection } from './components/CompareSection'
import { StatsSection } from './components/StatsSection'
import { LimitsSection } from './components/LimitsSection'
import { FaqSection } from './components/FaqSection'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-void text-white">
      <SiteHeader />
      <main>
        <HeroSection />
        <MarqueeSection />
        <IntroSection />
        <DeviceSection />
        <CompareSection />
        <StatsSection />
        <LimitsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
