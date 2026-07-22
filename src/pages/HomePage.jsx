import Hero from '../components/Hero';
import ManifestBridge from '../components/ManifestBridge';
import Founders from '../components/Founders';
import Projects from '../components/Projects';
import Masterplan from '../components/Masterplan';
import Studio from '../components/Studio';
import EngineeringLogs from '../components/EngineeringLogs';
import GlobalVector from '../components/GlobalVector';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-0)]">
      <Hero />
      <ManifestBridge />
      <Founders />
      <Projects />
      <Masterplan />
      <Studio />
      <EngineeringLogs />
      <GlobalVector />
      <Footer />
    </div>
  );
}
