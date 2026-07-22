import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LocaleProvider } from './i18n/LocaleContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import EcosystemPage from './pages/EcosystemPage';
import StudioPage from './pages/StudioPage';
import MaydiScrollbar from './components/MaydiScrollbar';

export default function App() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ecosystem" element={<EcosystemPage />} />
          <Route path="/studio" element={<StudioPage />} />
        </Routes>
        <MaydiScrollbar />
      </BrowserRouter>
    </LocaleProvider>
  );
}
