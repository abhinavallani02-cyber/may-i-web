import { SiteHeader } from './components/SiteHeader'
import { HeroSection } from './components/HeroSection'
import { VerdictsSection } from './components/VerdictsSection'
import { PolicySection } from './components/PolicySection'
import { CompareSection } from './components/CompareSection'
import { TrustSection } from './components/TrustSection'
import { LimitsSection } from './components/LimitsSection'
import { FaqSection } from './components/FaqSection'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-void text-white">
      <SiteHeader />
      <main>
        <HeroSection />
        <VerdictsSection />
        <PolicySection />
        <CompareSection />
        <TrustSection />
        <LimitsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
