import { useState } from 'react';
import type { Prompt } from '../types';

interface PromptCardProps {
  prompt: Prompt;
  onClick: () => void;
  priority?: boolean;
}

const GRADIENT_COLORS = [
  ['#e0e7ff', '#818cf8'],
  ['#ede9fe', '#a78bfa'],
  ['#e0f2fe', '#38bdf8'],
  ['#d1fae5', '#34d399'],
  ['#ffe4e6', '#fb7185'],
  ['#fef3c7', '#fbbf24'],
];

function gradientFor(id: string): [string, string] {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  return GRADIENT_COLORS[Math.abs(hash) % GRADIENT_COLORS.length] as [string, string];
}

export function PromptCard({ prompt, onClick, priority = false }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  function copyPrompt(e: React.MouseEvent) {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const coverImage = prompt.images[0];
  const hasImage = coverImage && !imgError;
  const [gradFrom, gradTo] = gradientFor(prompt.id);

  return (
    <div
      onClick={onClick}
      className="pin-card group animate-fade-up"
    >
      {/* Image or gradient fallback */}
      {hasImage ? (
        <div className="relative overflow-hidden" style={{ borderRadius: 'var(--radius-card) var(--radius-card) 0 0' }}>
          <img
            src={coverImage}
            alt={prompt.title}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setImgError(true)}
            className="w-full object-cover block"
          />
          {/* Category badge overlay */}
          {prompt.categories[0] && (
            <div className="absolute top-2.5 left-2.5">
              <span
                className="px-2.5 py-1 text-xs backdrop-blur-sm"
                style={{
                  background: 'rgba(255,255,255,0.88)',
                  color: 'var(--color-body)',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 400,
                }}
              >
                {prompt.categories[0]}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div
          className="w-full p-4 flex flex-col justify-between min-h-[140px]"
          style={{
            background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`,
            borderRadius: 'var(--radius-card) var(--radius-card) 0 0',
          }}
        >
          {prompt.categories[0] && (
            <span
              className="self-start px-2.5 py-1 text-xs mb-2"
              style={{
                background: 'rgba(255,255,255,0.75)',
                color: 'var(--color-body)',
                borderRadius: 'var(--radius-pill)',
              }}
            >
              {prompt.categories[0]}
            </span>
          )}
          <p
            className="text-xs leading-relaxed line-clamp-6 font-mono"
            style={{ color: 'rgba(17,17,17,0.75)' }}
          >
            {prompt.content}
          </p>
        </div>
      )}

      {/* Card body */}
      <div className="p-3 pb-2">
        <h3
          className="text-sm line-clamp-2 leading-snug"
          style={{ fontWeight: 700, color: 'var(--color-ink)' }}
        >
          {prompt.title}
        </h3>
        {hasImage && prompt.description && (
          <p
            className="text-xs leading-relaxed line-clamp-2 mt-1"
            style={{ color: 'var(--color-mute)' }}
          >
            {prompt.description}
          </p>
        )}
      </div>

      {/* Footer: author + copy */}
      <div className="px-3 pb-3 flex items-center justify-between gap-2">
        <span
          className="text-xs truncate"
          style={{ color: 'var(--color-ash)' }}
        >
          {prompt.author.name}
        </span>

        <button
          onClick={copyPrompt}
          title="คัดลอก prompt"
          className="shrink-0 flex items-center gap-1 text-xs px-3 py-1 transition-all duration-150"
          style={{
            borderRadius: 'var(--radius-pill)',
            background: copied ? '#dcfce7' : 'var(--color-surface-hover)',
            color: copied ? '#16a34a' : 'var(--color-mute)',
            fontWeight: 700,
            border: `1px solid ${copied ? '#86efac' : 'var(--color-border)'}`,
            opacity: copied ? 1 : undefined,
          }}
          onMouseEnter={e => {
            if (!copied) {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-brand)';
              (e.currentTarget as HTMLButtonElement).style.color = '#fff';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'transparent';
            }
          }}
          onMouseLeave={e => {
            if (!copied) {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-surface-hover)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-mute)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)';
            }
          }}
        >
          {copied ? 'คัดลอกแล้ว ✓' : 'คัดลอก'}
        </button>
      </div>
    </div>
  );
}
