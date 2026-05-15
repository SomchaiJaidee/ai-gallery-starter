import { useState, useCallback, useMemo, useEffect } from 'react';
import { usePrompts } from './hooks/usePrompts';
import { PromptCard } from './components/PromptCard';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { PromptModal } from './components/PromptModal';
import type { Prompt } from './types';

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function App() {
  const { data, loading } = usePrompts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [visibleCount, setVisibleCount] = useState(24);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const el = document.documentElement;
    if (isDark) {
      el.style.setProperty('--color-canvas',       '#111111');
      el.style.setProperty('--color-surface-card', '#1c1c1c');
      el.style.setProperty('--color-surface-hover','#242424');
      el.style.setProperty('--color-ink',          '#f0f0f0');
      el.style.setProperty('--color-body',         '#cccccc');
      el.style.setProperty('--color-mute',         '#888888');
      el.style.setProperty('--color-ash',          '#555555');
      el.style.setProperty('--color-border',       'rgba(255,255,255,0.08)');
      el.style.setProperty('--color-border-focus', 'rgba(255,255,255,0.14)');
      el.style.setProperty('--color-nav-bg',       'rgba(17,17,17,0.94)');
      el.style.setProperty('--color-brand-hover',  '#ff1a35');
      el.style.setProperty('--shadow-card-hover',  '0 4px 20px rgba(0,0,0,0.5)');
      el.style.setProperty('--shadow-modal',       '0 16px 48px rgba(0,0,0,0.7)');
    } else {
      el.style.setProperty('--color-canvas',       '#ffffff');
      el.style.setProperty('--color-surface-card', '#f6f6f3');
      el.style.setProperty('--color-surface-hover','#efefec');
      el.style.setProperty('--color-ink',          '#111111');
      el.style.setProperty('--color-body',         '#333333');
      el.style.setProperty('--color-mute',         '#767676');
      el.style.setProperty('--color-ash',          '#adadad');
      el.style.setProperty('--color-border',       'rgba(0,0,0,0.08)');
      el.style.setProperty('--color-border-focus', 'rgba(0,0,0,0.12)');
      el.style.setProperty('--color-nav-bg',       'rgba(255,255,255,0.96)');
      el.style.setProperty('--color-brand-hover',  '#c0001d');
      el.style.setProperty('--shadow-card-hover',  '0 4px 16px rgba(0,0,0,0.12)');
      el.style.setProperty('--shadow-modal',       '0 16px 48px rgba(0,0,0,0.18)');
    }
    document.body.style.background = isDark ? '#111111' : '#ffffff';
  }, [isDark]);

  function goHome() {
    setSearchQuery('');
    setSelectedCategories([]);
    setVisibleCount(24);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const toggleCategory = useCallback((cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
    setVisibleCount(24);
  }, []);

  const shuffled = useMemo(() => {
    const arr = [...(data?.prompts ?? [])];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [data]);

  const displayPrompts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return shuffled.filter(p =>
      (selectedCategories.length === 0 || selectedCategories.some(cat => p.categories.includes(cat))) &&
      (!q || p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    );
  }, [shuffled, searchQuery, selectedCategories]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-canvas)', color: 'var(--color-ink)' }}>

      {/* ── Sticky Nav ── */}
      <header
        className="sticky top-0 z-40 backdrop-blur-sm"
        style={{
          background: 'var(--color-nav-bg)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Top row: logo + search + controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={goHome}
              className="shrink-0 text-left hover:opacity-70 transition-opacity"
            >
              <h1
                className="text-lg leading-none"
                style={{ fontWeight: 700, color: 'var(--color-ink)' }}
              >
                <span style={{ color: 'var(--color-brand)' }}>Prompt</span>DD.com
              </h1>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-mute)' }}>
                Prompt Collection
              </p>
            </button>

            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={v => { setSearchQuery(v); setVisibleCount(24); }}
              />
            </div>

            {/* Prompt count badge */}
            {!loading && (
              <span
                className="hidden sm:inline-flex items-center shrink-0 px-3 py-1 text-xs"
                style={{
                  background: 'var(--color-surface-card)',
                  color: 'var(--color-mute)',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 400,
                  border: '1px solid var(--color-border)',
                }}
              >
                {data?.total ?? 0} prompts
              </span>
            )}

            {/* Theme toggle */}
            <button
              onClick={() => setIsDark(d => !d)}
              className="theme-toggle shrink-0"
              title={isDark ? 'เปลี่ยนเป็นธีมสว่าง' : 'เปลี่ยนเป็นธีมมืด'}
              aria-label="toggle theme"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          {/* Category filter row */}
          {(data?.categories?.length ?? 0) > 0 && (
            <div className="mt-3">
              <CategoryFilter
                categories={data?.categories ?? []}
                selected={selectedCategories}
                onToggle={toggleCategory}
              />
            </div>
          )}
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div
              className="w-9 h-9 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: 'var(--color-brand)', borderTopColor: 'transparent' }}
            />
            <p className="text-sm" style={{ color: 'var(--color-mute)' }}>
              กำลังโหลด prompt...
            </p>
          </div>
        ) : displayPrompts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <span className="text-5xl">🔍</span>
            <p className="font-bold text-base" style={{ color: 'var(--color-body)' }}>
              ไม่พบ prompt ที่ค้นหา
            </p>
            <p className="text-sm" style={{ color: 'var(--color-mute)' }}>
              ลองค้นหาคำอื่น หรือยกเลิกตัวกรอง
            </p>
          </div>
        ) : (
          <>
            <div className="masonry-grid">
              {displayPrompts.slice(0, visibleCount).map((p, i) => (
                <div key={p.id} className="masonry-item">
                  <PromptCard prompt={p} onClick={() => setSelectedPrompt(p)} priority={i < 8} />
                </div>
              ))}
            </div>

            {visibleCount < displayPrompts.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setVisibleCount(v => v + 24)}
                  className="btn-brand px-8 py-3 text-sm"
                  style={{ fontWeight: 700, letterSpacing: '0.01em' }}
                >
                  โหลดเพิ่ม ({displayPrompts.length - visibleCount} prompt เหลืออยู่)
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid var(--color-border)' }} className="mt-8">
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-center">
          <p className="text-xs" style={{ color: 'var(--color-ash)' }}>
            GPT Image 2 Prompt By{' '}
            <span style={{ color: 'var(--color-brand)', fontWeight: 700 }}>PromptDD.com</span>
          </p>
        </div>
      </footer>

      {/* ── Modal ── */}
      <PromptModal prompt={selectedPrompt} onClose={() => setSelectedPrompt(null)} />
    </div>
  );
}
