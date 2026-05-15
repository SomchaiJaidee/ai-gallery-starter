interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Search icon */}
      <div
        className="absolute inset-y-0 left-4 flex items-center pointer-events-none"
        style={{ color: 'var(--color-ash)' }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="ค้นหา prompt..."
        className="search-input w-full pl-11 pr-10 py-2.5"
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={() => onChange('')}
          title="ล้างคำค้นหา"
          className="absolute inset-y-0 right-4 flex items-center transition-colors"
          style={{ color: 'var(--color-ash)' }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--color-brand)')}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--color-ash)')}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
