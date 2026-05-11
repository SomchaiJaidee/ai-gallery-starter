import { useState, useCallback, useMemo } from 'react';
import { usePrompts } from './hooks/usePrompts';
import { PromptCard } from './components/PromptCard';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { PromptModal } from './components/PromptModal';
import type { Prompt } from './types';

export default function App() {
  const { data, loading } = usePrompts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [visibleCount, setVisibleCount] = useState(24);

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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur border-b border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
          <div className="flex items-center gap-4">
            <button onClick={goHome} className="shrink-0 text-left hover:opacity-80 transition-opacity">
              <h1 className="text-xl font-bold text-zinc-100 leading-none">
                🖼️ <span className="text-emerald-400">AI</span> Gallery Starter
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">Fork → Customize → Deploy</p>
            </button>
            <div className="flex-1">
              <SearchBar value={searchQuery} onChange={v => { setSearchQuery(v); setVisibleCount(24); }} />
            </div>
          </div>
          <CategoryFilter categories={data?.categories ?? []} selected={selectedCategories} onToggle={toggleCategory} />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {!loading && (
          <div className="flex items-center gap-3 mb-4">
            <p className="text-xs text-zinc-600">{data?.total ?? 0} prompts ทั้งหมด</p>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-zinc-500 text-sm">กำลังโหลด prompt...</p>
          </div>
        ) : displayPrompts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-2">
            <span className="text-4xl">🔍</span>
            <p className="text-zinc-400 font-medium">ไม่พบ prompt ที่ค้นหา</p>
            <p className="text-zinc-600 text-sm">ลองค้นหาคำอื่น หรือยกเลิกตัวกรอง</p>
          </div>
        ) : (
          <>
            <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3">
              {displayPrompts.slice(0, visibleCount).map((p, i) => (
                <div key={p.id} className="break-inside-avoid mb-3">
                  <PromptCard prompt={p} onClick={() => setSelectedPrompt(p)} priority={i < 6} />
                </div>
              ))}
            </div>
            {visibleCount < displayPrompts.length && (
              <div className="flex justify-center mt-8">
                <button onClick={() => setVisibleCount(v => v + 24)} className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-500 text-zinc-300 text-sm font-medium rounded-xl transition-all">
                  โหลดเพิ่ม ({displayPrompts.length - visibleCount} prompt เหลืออยู่)
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/60 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-zinc-500">AI Gallery Starter — fork & make it yours</p>
          <a
            href="https://github.com/aiceo-lab/ai-gallery-starter"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-emerald-400 transition-colors group"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            <span className="group-hover:underline">github.com/aiceo-lab/ai-gallery-starter</span>
          </a>
        </div>
      </footer>

      {/* Modal */}
      <PromptModal prompt={selectedPrompt} onClose={() => setSelectedPrompt(null)} />
    </div>
  );
}
