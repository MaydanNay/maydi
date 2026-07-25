import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LocaleProvider } from './i18n/LocaleContext';
import { LenisProvider } from './lenis/LenisProvider';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import EcosystemPage from './pages/EcosystemPage';
import StudioPage from './pages/StudioPage';
import ErrorPage from './pages/ErrorPage';
import MaydiScrollbar from './components/MaydiScrollbar';
import DotGridOverlay from './components/DotGridOverlay';

export default function App() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <LenisProvider>
          <DotGridOverlay />
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ecosystem" element={<EcosystemPage />} />
            <Route path="/studio" element={<StudioPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <MaydiScrollbar />
        </LenisProvider>
      </BrowserRouter>
    </LocaleProvider>
  );
}
