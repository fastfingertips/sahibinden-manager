import type { ReactNode } from 'react';

interface SettingItemProps {
  label: string;
  description: string;
  checked: boolean;
  onChange?: () => void;
  disabled?: boolean;
  borderTop?: boolean;
  children?: ReactNode;
}

export const SettingItem = ({
  label,
  description,
  checked,
  onChange,
  disabled = false,
  borderTop = false,
  children,
}: SettingItemProps) => (
  <div
    className={`flex flex-col space-y-0.5 ${borderTop ? 'pt-2 border-t border-[#f0f0f0]' : ''} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
  >
    <label className="flex items-center justify-between group cursor-pointer">
      <span className="text-[11.5px] font-medium text-[#222] group-hover:text-[#417abb] transition-colors">
        {label}
      </span>
      <div className="sh-switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onChange?.()}
          disabled={disabled}
        />
        <div className="slider"></div>
      </div>
    </label>
    <p className="text-[10px] text-[#666] leading-snug">{description}</p>
    {children}
  </div>
);

interface SettingSubItemProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

export const SettingSubItem = ({
  label,
  description,
  checked,
  onChange,
  disabled = false,
}: SettingSubItemProps) => (
  <div className="mt-1.5 ml-1 pl-3 border-l-2 border-[#d0dbe5] flex flex-col space-y-0.5 py-1 bg-[#f9fafb] rounded-r-xs pr-2">
    <label className="flex items-center justify-between group cursor-pointer">
      <span className="text-[11px] font-medium text-[#333] group-hover:text-[#417abb] transition-colors">
        {label}
      </span>
      <div className="sh-switch scale-90 origin-right">
        <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} />
        <div className="slider"></div>
      </div>
    </label>
    <p className="text-[9.5px] text-[#777] leading-tight">{description}</p>
  </div>
);
