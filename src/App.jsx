import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LocaleProvider } from './i18n/LocaleContext';
import { LenisProvider } from './lenis/LenisProvider';
import { DataRoomModalProvider } from './context/DataRoomModalContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import MaydiScrollbar from './components/MaydiScrollbar';
import DotGridOverlay from './components/DotGridOverlay';
import PetrolScrollBlur from './components/PetrolScrollBlur';

const EcosystemPage = lazy(() => import('./pages/EcosystemPage'));

export default function App() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <DataRoomModalProvider>
          <LenisProvider>
            <DotGridOverlay />
            <PetrolScrollBlur />
            <Header />
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/ecosystem" element={<EcosystemPage />} />
                {/* /studio served by maydi_studio SPA (nginx / Vite proxy) */}
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Suspense>
            <MaydiScrollbar />
          </LenisProvider>
        </DataRoomModalProvider>
      </BrowserRouter>
    </LocaleProvider>
  );
}
