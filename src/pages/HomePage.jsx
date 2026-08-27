import { lazy, Suspense } from 'react';
import Hero from '../components/Hero';

const ManifestBridge = lazy(() => import('../components/ManifestBridge'));
const Founders = lazy(() => import('../components/Founders'));
const Projects = lazy(() => import('../components/Projects'));
const Masterplan = lazy(() => import('../components/Masterplan'));
const Studio = lazy(() => import('../components/Studio'));
const Partners = lazy(() => import('../components/Partners'));
const EngineeringLogs = lazy(() => import('../components/EngineeringLogs'));
const GlobalVector = lazy(() => import('../components/GlobalVector'));
const Footer = lazy(() => import('../components/Footer'));

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-0)]">
      <Hero />
      <div className="content-above-grid">
        <Suspense fallback={null}>
          <ManifestBridge />
          <Founders />
          <Projects />
          <Masterplan />
          <Studio />
          <Partners />
          <EngineeringLogs />
          <GlobalVector />
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}
