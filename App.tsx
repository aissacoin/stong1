
import React, { Suspense, useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Tools } from './pages/Tools';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { ToolDetail } from './pages/ToolDetail';
import { LanguageProvider } from './components/LanguageContext';
import { AlertTriangle, Loader2 } from 'lucide-react';

const NotFound: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white p-6 text-center">
    <AlertTriangle size={80} className="text-[#D4AF37] mb-10 opacity-40 animate-pulse" />
    <h2 className="text-5xl font-black uppercase tracking-tighter italic text-[#D4AF37] mb-6">Archive Node Offline</h2>
    <p className="text-gray-400 max-w-xl mx-auto text-xl mb-12 italic leading-relaxed">
      The archival coordinates you entered do not match any known sovereign instrument.
    </p>
    <button onClick={() => window.location.hash = '#/'} className="px-12 py-5 bg-[#D4AF37] text-black font-black uppercase tracking-[0.6em] text-[10px] rounded-2xl hover:scale-105 transition-all">
      Return to Home
    </button>
  </div>
);

const AppContent: React.FC = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    const path = currentHash.startsWith('#') ? currentHash.slice(1) : currentHash;
    const cleanPath = path.split('?')[0].replace(/\/$/, '') || '/';

    if (cleanPath === '/' || cleanPath === '/home') return <Home />;
    if (cleanPath === '/about') return <About />;
    if (cleanPath === '/contact') return <Contact />;
    if (cleanPath === '/privacy') return <Privacy />;
    if (cleanPath === '/terms') return <Terms />;
    if (cleanPath === '/tools') return <Tools />;

    if (cleanPath.startsWith('/tool/')) {
      const parts = cleanPath.split('/');
      const id = parts[2];
      if (id) return <ToolDetail id={id} key={id} />;
    }

    return <NotFound />;
  };

  return (
    <Layout>
      <Suspense fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-[#D4AF37]">
          <Loader2 className="animate-spin mb-4" size={48} />
          <span className="text-[10px] font-black uppercase tracking-widest">Synchronizing...</span>
        </div>
      }>
        {renderContent()}
      </Suspense>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
