'use client';
import { T } from '../../providers/language-provider';
import { useEffect, useState } from 'react';
import { Check, Share2, Star, UserPlus } from 'lucide-react';
export function DetailActions({ id, kind }: { id: string; kind: 'person' | 'project' }) {
  const key = 'dm-' + kind + '-' + id;
  const [saved, setSaved] = useState(false),
    [status, setStatus] = useState('');
  useEffect(() => {
    setSaved(localStorage.getItem(key) === 'true');
  }, [key]);
  const Icon = saved ? Check : kind === 'person' ? UserPlus : Star;
  return (
    <div className="detail-actions">
      <button
        className="btn primary"
        aria-pressed={saved}
        onClick={() => {
          localStorage.setItem(key, String(!saved));
          setSaved(!saved);
        }}
      >
        <Icon size={16} />
        {
          <T
            text={
              kind === 'person'
                ? saved
                  ? 'Following'
                  : 'Follow'
                : saved
                  ? 'Starred'
                  : 'Star project'
            }
          />
        }
      </button>
      <button
        className="btn secondary"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(location.href);
            setStatus('Link copied');
          } catch {
            setStatus('Copy the link from your address bar.');
          }
        }}
      >
        <Share2 size={16} /> <T text={'Share'} />
      </button>
      <span className="muted text-sm" role="status">
        <T text={status} />
      </span>
    </div>
  );
}
