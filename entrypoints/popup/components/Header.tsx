export type TabType = 'settings' | 'notes' | 'eliminated' | 'history' | 'about';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  notesCount?: number;
  eliminatedCount?: number;
  historyCount?: number;
}

export const Header = ({
  activeTab,
  onTabChange,
  notesCount,
  eliminatedCount,
  historyCount,
}: HeaderProps) => (
  <header className="mb-2.5">
    <div className="bg-[#ffda00] px-3.5 py-2 rounded-t -m-3 mb-0 flex items-center justify-between shadow-xs border-b border-black/10">
      <div className="flex flex-col">
        <h1 className="text-[#222] font-bold text-sm tracking-tight uppercase leading-none">
          Sahibinden Manager
        </h1>
        <span className="text-[9px] text-[#222]/65 font-bold uppercase tracking-wider mt-0.5">
          Kontrol Paneli
        </span>
      </div>
    </div>

    <nav className="flex border-b border-[#dbdbdb] -mx-3 bg-white shadow-xs">
      <button
        onClick={() => onTabChange('settings')}
        className={`flex-1 py-2 text-[11px] font-semibold tracking-normal transition-all relative ${
          activeTab === 'settings' ? 'text-[#417abb]' : 'text-[#888] hover:text-[#555]'
        }`}
      >
        Ayarlar
        {activeTab === 'settings' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#417abb]" />
        )}
      </button>

      <button
        onClick={() => onTabChange('notes')}
        className={`flex-1 py-2 text-[11px] font-semibold tracking-normal transition-all relative flex items-center justify-center gap-1.5 ${
          activeTab === 'notes' ? 'text-[#417abb]' : 'text-[#888] hover:text-[#555]'
        }`}
      >
        <span>Notlar</span>
        {typeof notesCount === 'number' && notesCount > 0 && (
          <span className="text-[9px] px-1.5 py-0.2 bg-[#fff8e1] text-[#855700] rounded-xs border border-[#ffe082] font-bold">
            {notesCount}
          </span>
        )}
        {activeTab === 'notes' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#417abb]" />
        )}
      </button>

      <button
        onClick={() => onTabChange('eliminated')}
        className={`flex-1 py-2 text-[11px] font-semibold tracking-normal transition-all relative flex items-center justify-center gap-1.5 ${
          activeTab === 'eliminated' ? 'text-[#b91c1c]' : 'text-[#888] hover:text-[#555]'
        }`}
      >
        <span>Elenenler</span>
        {typeof eliminatedCount === 'number' && eliminatedCount > 0 && (
          <span className="text-[9px] px-1.5 py-0.2 bg-[#fef2f2] text-[#991b1b] rounded-xs border border-[#fca5a5] font-bold">
            {eliminatedCount}
          </span>
        )}
        {activeTab === 'eliminated' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#b91c1c]" />
        )}
      </button>

      <button
        onClick={() => onTabChange('history')}
        className={`flex-1 py-2 text-[11px] font-semibold tracking-normal transition-all relative flex items-center justify-center gap-1.5 ${
          activeTab === 'history' ? 'text-[#417abb]' : 'text-[#888] hover:text-[#555]'
        }`}
      >
        <span>Geçmiş</span>
        {typeof historyCount === 'number' && historyCount > 0 && (
          <span className="text-[9px] px-1.5 py-0.2 bg-[#f0f4f8] text-[#417abb] rounded-xs border border-[#cddde9] font-bold">
            {historyCount}
          </span>
        )}
        {activeTab === 'history' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#417abb]" />
        )}
      </button>

      <button
        onClick={() => onTabChange('about')}
        className={`flex-1 py-2 text-[11px] font-semibold tracking-normal transition-all relative ${
          activeTab === 'about' ? 'text-[#417abb]' : 'text-[#888] hover:text-[#555]'
        }`}
      >
        Hakkında
        {activeTab === 'about' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#417abb]" />
        )}
      </button>
    </nav>
  </header>
);
