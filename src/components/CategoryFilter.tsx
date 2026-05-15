interface CategoryFilterProps {
  categories: string[];
  selected: string[];
  onToggle: (cat: string) => void;
}

export function CategoryFilter({ categories, selected, onToggle }: CategoryFilterProps) {
  if (categories.length === 0) return null;

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
      {/* Clear button */}
      {selected.length > 0 && (
        <button
          onClick={() => selected.forEach(c => onToggle(c))}
          className="chip shrink-0 flex items-center gap-1"
          style={{
            background: 'transparent',
            border: '1px solid var(--color-border-focus)',
            color: 'var(--color-body)',
            fontWeight: 700,
          }}
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
          ล้าง ({selected.length})
        </button>
      )}

      {categories.map(cat => {
        const active = selected.includes(cat);
        return (
          <button
            key={cat}
            onClick={() => onToggle(cat)}
            className={`chip shrink-0 ${active ? 'active' : ''}`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
