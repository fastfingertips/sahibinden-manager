interface HeaderProps {
  activeTab: 'settings' | 'about';
  onTabChange: (tab: 'settings' | 'about') => void;
}

export const Header = ({ activeTab, onTabChange }: HeaderProps) => (
  <header className="mb-4">
    <div className="bg-[#ffda00] p-4 rounded-t -m-4 mb-0 flex items-center shadow-sm border-b border-black/5">
      <div className="flex flex-col">
        <h1 className="text-[#333] font-bold text-xl tracking-tighter uppercase leading-none">
          Sahibinden Manager
        </h1>
        <span className="text-[10px] text-[#333]/60 font-bold uppercase tracking-widest mt-1">
          Kontrol Paneli
        </span>
      </div>
    </div>

    <nav className="flex border-b border-[#dbdbdb] -mx-4 bg-white shadow-sm">
      <button
        onClick={() => onTabChange('settings')}
        className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all relative ${
          activeTab === 'settings' ? 'text-[#417abb]' : 'text-[#999] hover:text-[#666]'
        }`}
      >
        Ayarlar
        {activeTab === 'settings' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#417abb]" />
        )}
      </button>
      <button
        onClick={() => onTabChange('about')}
        className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all relative ${
          activeTab === 'about' ? 'text-[#417abb]' : 'text-[#999] hover:text-[#666]'
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
