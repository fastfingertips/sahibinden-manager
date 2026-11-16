import { useState } from 'react';
import './App.css';
import { useStats } from './hooks/useStats';
import { useCurrentTab } from './hooks/useCurrentTab';
import { Header, type TabType } from './components/Header';
import { SettingsSection } from './components/SettingsSection';
import { NotesSection } from './components/NotesSection';
import { HistorySection } from './components/HistorySection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('settings');
  const {
    isFullGridEnabled,
    isDownloaderEnabled,
    isVisitedHighlightEnabled,
    isVisitedLastBadgeEnabled,
    isVisitedFirstBadgeEnabled,
    isNotesEnabled,
    isPriceHistoryEnabled,
    isHideRefurbishedEnabled,
    isHideAdsEnabled,
    isAutoExpandQnAEnabled,
    isKeyboardNavEnabled,
    isKeyboardNewTabEnabled,
    ignoredRefurbishedCount,
    filteredAdsCount,
    filteredRefurbishedCount,
    history,
    notes,
    viewedCount,
    notesCount,
    toggleFullGrid,
    toggleDownloader,
    toggleVisitedHighlight,
    toggleVisitedLastBadge,
    toggleVisitedFirstBadge,
    toggleNotes,
    togglePriceHistory,
    toggleHideRefurbished,
    toggleHideAds,
    toggleAutoExpandQnA,
    toggleKeyboardNav,
    toggleKeyboardNewTab,
    clearIgnoredRefurbished,
    clearFilteredAds,
    clearFilteredRefurbished,
    removeHistoryItem,
    clearHistory,
    removeNote,
    clearAllNotes,
  } = useStats();
  const { isSahibinden } = useCurrentTab();

  return (
    <div className="min-w-[420px] max-w-[440px] p-3 bg-[#f8f8f8] text-[#222] font-sans">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        notesCount={notesCount}
        historyCount={viewedCount}
      />

      {isSahibinden === false && (
        <div className="mt-2.5 px-2.5 py-1.5 bg-[#f4f7fa] border border-[#ccd8e5] rounded-sm text-[10.5px] text-[#335577] leading-tight">
          <span className="font-bold">Kapsam Dışı:</span> Bu eklenti yalnızca sahibinden.com alan
          adı üzerinde etkindir.
        </div>
      )}

      <main className="mt-2.5">
        {activeTab === 'settings' && (
          <SettingsSection
            isFullGridEnabled={isFullGridEnabled}
            onToggleFullGrid={toggleFullGrid}
            isDownloaderEnabled={isDownloaderEnabled}
            onToggleDownloader={toggleDownloader}
            isVisitedHighlightEnabled={isVisitedHighlightEnabled}
            onToggleVisitedHighlight={toggleVisitedHighlight}
            isVisitedLastBadgeEnabled={isVisitedLastBadgeEnabled}
            onToggleVisitedLastBadge={toggleVisitedLastBadge}
            isVisitedFirstBadgeEnabled={isVisitedFirstBadgeEnabled}
            onToggleVisitedFirstBadge={toggleVisitedFirstBadge}
            isNotesEnabled={isNotesEnabled}
            onToggleNotes={toggleNotes}
            isPriceHistoryEnabled={isPriceHistoryEnabled}
            onTogglePriceHistory={togglePriceHistory}
            isAutoExpandQnAEnabled={isAutoExpandQnAEnabled}
            onToggleAutoExpandQnA={toggleAutoExpandQnA}
            isKeyboardNavEnabled={isKeyboardNavEnabled}
            onToggleKeyboardNav={toggleKeyboardNav}
            isKeyboardNewTabEnabled={isKeyboardNewTabEnabled}
            onToggleKeyboardNewTab={toggleKeyboardNewTab}
            isHideRefurbishedEnabled={isHideRefurbishedEnabled}
            onToggleHideRefurbished={toggleHideRefurbished}
            ignoredRefurbishedCount={ignoredRefurbishedCount}
            onClearIgnoredRefurbished={clearIgnoredRefurbished}
            filteredRefurbishedCount={filteredRefurbishedCount}
            onClearFilteredRefurbished={clearFilteredRefurbished}
            isHideAdsEnabled={isHideAdsEnabled}
            onToggleHideAds={toggleHideAds}
            filteredAdsCount={filteredAdsCount}
            onClearFilteredAds={clearFilteredAds}
            viewedCount={viewedCount}
            onClearHistory={clearHistory}
          />
        )}

        {activeTab === 'notes' && (
          <NotesSection notes={notes} onRemoveNote={removeNote} onClearAllNotes={clearAllNotes} />
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
