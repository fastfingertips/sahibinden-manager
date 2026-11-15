import { useState } from 'react';
import './App.css';
import { useStats } from './hooks/useStats';
import { useCurrentTab } from './hooks/useCurrentTab';
import { Header, type TabType } from './components/Header';
import { SettingsSection } from './components/SettingsSection';
import { HistorySection } from './components/HistorySection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('settings');
  const {
    isFullGridEnabled,
    isDownloaderEnabled,
    isHideRefurbishedEnabled,
    history,
    viewedCount,
    toggleFullGrid,
    toggleDownloader,
    toggleHideRefurbished,
    removeHistoryItem,
    clearHistory,
  } = useStats();
  const { isSahibinden } = useCurrentTab();

  return (
    <div className="min-w-[500px] p-4 bg-[#f8f8f8] text-[#333] font-sans">
      <Header activeTab={activeTab} onTabChange={setActiveTab} historyCount={viewedCount} />

      {isSahibinden === false && (
        <div className="mt-3 px-3 py-2 bg-[#f4f7fa] border border-[#ccd8e5] rounded text-[11px] text-[#335577] leading-relaxed">
          <span className="font-bold">Kapsam Dışı:</span> Bu eklenti yalnızca sahibinden.com alan
          adı üzerinde etkindir.
        </div>
      )}

      <main className="mt-4">
        {activeTab === 'settings' && (
          <SettingsSection
            isFullGridEnabled={isFullGridEnabled}
            onToggleFullGrid={toggleFullGrid}
            isDownloaderEnabled={isDownloaderEnabled}
            onToggleDownloader={toggleDownloader}
            isHideRefurbishedEnabled={isHideRefurbishedEnabled}
            onToggleHideRefurbished={toggleHideRefurbished}
            viewedCount={viewedCount}
            onClearHistory={clearHistory}
          />
        )}

        {activeTab === 'history' && (
          <HistorySection
            history={history}
            onClearHistory={clearHistory}
            onRemoveItem={removeHistoryItem}
          />
        )}

        {activeTab === 'about' && <AboutSection />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
