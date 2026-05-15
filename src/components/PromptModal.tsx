import { useEffect, useState } from 'react';
import type { Prompt } from '../types';

interface PromptModalProps {
  prompt: Prompt | null;
  onClose: () => void;
}

export function PromptModal({ prompt, onClose }: PromptModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => { setActiveImg(0); setCopied(false); setLightbox(false); }, [prompt]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (lightbox) setLightbox(false);
        else onClose();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, lightbox]);

  useEffect(() => {
    if (prompt) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [prompt]);

  if (!prompt) return null;

  function copyPrompt() {
    navigator.clipboard.writeText(prompt!.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center animate-fade-in"
          style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(4px)' }}
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
            style={{ background: 'rgba(255,255,255,0.12)', color: '#fff' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={prompt.images[activeImg]}
            alt={prompt.title}
            className="max-w-[95vw] max-h-[95vh] object-contain"
            style={{ borderRadius: 'var(--radius-card)' }}
            onClick={e => e.stopPropagation()}
          />
          {prompt.images.length > 1 && (
            <div className="absolute bottom-4 flex gap-2">
              {prompt.images.map((img, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setActiveImg(i); }}
                  className="w-12 h-12 overflow-hidden transition-all"
                  style={{
                    borderRadius: '10px',
                    border: activeImg === i ? '2px solid var(--color-brand)' : '2px solid transparent',
                    opacity: activeImg === i ? 1 : 0.5,
                  }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Overlay scrim ── */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }}
        onClick={onClose}
      >
        {/* ── Modal container ── */}
        <div
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-up"
          style={{
            background: '#fff',
            borderRadius: 'var(--radius-modal)',
            boxShadow: 'var(--shadow-modal)',
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            title="ปิด"
            className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full transition-colors"
            style={{
              background: 'var(--color-surface-card)',
              color: 'var(--color-mute)',
              border: '1px solid var(--color-border)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-brand)';
              (e.currentTarget as HTMLButtonElement).style.color = '#fff';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-surface-card)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-mute)';
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image carousel */}
          {prompt.images.length > 0 && (
            <div
              className="overflow-hidden"
              style={{ borderRadius: 'var(--radius-modal) var(--radius-modal) 0 0', background: 'var(--color-surface-card)' }}
            >
              <div
                className="relative group cursor-zoom-in"
                onClick={() => setLightbox(true)}
              >
                <img
                  src={prompt.images[activeImg]}
                  alt={prompt.title}
                  className="w-full object-contain"
                  style={{ maxHeight: '360px' }}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'rgba(0,0,0,0.18)' }}
                >
                  <span
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white backdrop-blur-sm"
                    style={{ background: 'rgba(0,0,0,0.55)', borderRadius: 'var(--radius-pill)' }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    ดูภาพเต็ม
                  </span>
                </div>
              </div>

              {prompt.images.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide">
                  {prompt.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className="shrink-0 w-14 h-14 overflow-hidden transition-all"
                      style={{
                        borderRadius: '10px',
                        border: activeImg === i
                          ? '2px solid var(--color-brand)'
                          : '2px solid transparent',
                        opacity: activeImg === i ? 1 : 0.55,
                      }}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 pr-8">
              {prompt.categories.map(cat => (
                <span
                  key={cat}
                  className="px-3 py-1 text-xs"
                  style={{
                    background: 'var(--color-surface-card)',
                    color: 'var(--color-body)',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid var(--color-border)',
                    fontWeight: 400,
                  }}
                >
                  {cat}
                </span>
              ))}
              <span
                className="px-3 py-1 text-xs uppercase"
                style={{
                  background: 'var(--color-surface-card)',
                  color: 'var(--color-mute)',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {prompt.language}
              </span>
              {prompt.size && (
                <span
                  className="px-3 py-1 text-xs"
                  style={{
                    background: 'var(--color-surface-card)',
                    color: 'var(--color-mute)',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {prompt.size}
                </span>
              )}
            </div>

            {/* Title */}
            <h2
              className="text-xl leading-snug"
              style={{ fontWeight: 700, color: 'var(--color-ink)' }}
            >
              {prompt.title}
            </h2>

            {/* Description */}
            {prompt.description && (
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-body)' }}
              >
                {prompt.description}
              </p>
            )}

            {/* Prompt text */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: 'var(--color-ash)', fontWeight: 700 }}
                >
                  Prompt Text
                </span>
                <button
                  onClick={copyPrompt}
                  className="btn-brand flex items-center gap-1.5 px-4 py-2 text-sm"
                  style={copied ? {
                    background: '#dcfce7',
                    color: '#16a34a',
                  } : {}}
                >
                  {copied ? 'คัดลอกแล้ว ✓' : '📋 คัดลอก Prompt'}
                </button>
              </div>
              <pre
                className="text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap font-mono p-4"
                style={{
                  background: 'var(--color-surface-card)',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-body)',
                }}
              >
                {prompt.content}
              </pre>
            </div>

            {/* Author */}
            <div
              className="pt-3"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              <p className="text-xs" style={{ color: 'var(--color-mute)' }}>
                โดย{' '}
                {prompt.author.link ? (
                  <a
                    href={prompt.author.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors"
                    style={{ color: 'var(--color-body)', fontWeight: 700 }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-brand)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-body)')}
                  >
                    {prompt.author.name}
                  </a>
                ) : (
                  <span style={{ color: 'var(--color-body)', fontWeight: 700 }}>
                    {prompt.author.name}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
