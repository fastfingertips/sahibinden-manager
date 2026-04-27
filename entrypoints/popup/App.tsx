import { useState } from 'react';
import './App.css';
import { useStats } from './hooks/useStats';
import { Header } from './components/Header';
import { SettingsSection } from './components/SettingsSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState<'settings' | 'about'>('settings');
  const { isFullGridEnabled, isDownloaderEnabled, toggleFullGrid, toggleDownloader } = useStats();

  return (
    <div className="min-w-[500px] p-4 bg-[#f8f8f8] text-[#333] font-sans">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="mt-4">
        {activeTab === 'settings' ? (
          <SettingsSection
            isFullGridEnabled={isFullGridEnabled}
            onToggleFullGrid={toggleFullGrid}
            isDownloaderEnabled={isDownloaderEnabled}
            onToggleDownloader={toggleDownloader}
          />
        ) : (
          <AboutSection />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
