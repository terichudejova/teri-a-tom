import './index.css'
import { LanguageProvider } from './context/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import OurStory from './components/OurStory'
import DressCode from './components/DressCode'
import InfoAccommodation from './components/InfoAccommodation'
import Transport from './components/Transport'
import TravelMap from './components/TravelMap'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <OurStory />
          <TravelMap />
          <DressCode />
          <InfoAccommodation />
          <Transport />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
