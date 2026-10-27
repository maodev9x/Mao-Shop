import { useId } from 'react';
import type { DeviceKind } from '../../types';

type Props = {
  kind: DeviceKind;
  color: string;
  className?: string;
};

/**
 * Vector product renders so the shop needs no copyrighted photos.
 * Every device is drawn in a 200x200 box and tinted with `color`.
 */
export default function DeviceImage({ kind, color, className }: Props) {
  const uid = useId().replace(/:/g, '');
  const body = `body-${uid}`;
  const screen = `screen-${uid}`;
  const shine = `shine-${uid}`;

  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-hidden="true">
      <defs>
        <linearGradient id={body} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.75" />
          <stop offset="0.5" stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={screen} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1e293b" />
          <stop offset="0.55" stopColor={color} stopOpacity="0.55" />
          <stop offset="1" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id={shine} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="0.4" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="188" rx="62" ry="6" fill="#0f172a" opacity="0.08" />
      {renderDevice(kind, { body: `url(#${body})`, screen: `url(#${screen})`, shine: `url(#${shine})`, color })}
    </svg>
  );
}

type Paint = { body: string; screen: string; shine: string; color: string };

function renderDevice(kind: DeviceKind, p: Paint) {
  switch (kind) {
    case 'phone':
      return (
        <g>
          {/* back */}
          <rect x="42" y="22" width="72" height="150" rx="16" fill={p.body} />
          <rect x="42" y="22" width="72" height="150" rx="16" fill={p.shine} />
          <rect x="50" y="30" width="34" height="38" rx="10" fill="#000" opacity="0.18" />
          <circle cx="61" cy="41" r="7" fill="#111827" stroke="#9ca3af" strokeWidth="1.5" />
          <circle cx="61" cy="58" r="7" fill="#111827" stroke="#9ca3af" strokeWidth="1.5" />
          <circle cx="75" cy="49" r="7" fill="#111827" stroke="#9ca3af" strokeWidth="1.5" />
          <circle cx="78" cy="105" r="9" fill="#fff" opacity="0.18" />
          {/* front */}
          <rect x="88" y="30" width="72" height="150" rx="16" fill="#111827" />
          <rect x="91" y="33" width="66" height="144" rx="13" fill={p.screen} />
          <rect x="112" y="38" width="24" height="7" rx="3.5" fill="#000" />
          <path d="M91 120 Q124 90 157 112 L157 164 Q157 177 144 177 L104 177 Q91 177 91 164Z" fill={p.color} opacity="0.35" />
          <rect x="88" y="30" width="72" height="150" rx="16" fill={p.shine} />
        </g>
      );
    case 'foldable':
      return (
        <g>
          <rect x="30" y="38" width="66" height="128" rx="10" fill="#111827" />
          <rect x="33" y="41" width="62" height="122" rx="8" fill={p.screen} />
          <rect x="96" y="38" width="66" height="128" rx="10" fill="#111827" />
          <rect x="97" y="41" width="62" height="122" rx="8" fill={p.screen} />
          <path d="M33 120 Q96 80 159 110 L159 155 Q159 163 151 163 L41 163 Q33 163 33 155Z" fill={p.color} opacity="0.35" />
          <rect x="94" y="38" width="4" height="128" fill="#374151" />
          <rect x="30" y="38" width="132" height="128" rx="10" fill={p.shine} />
        </g>
      );
    case 'tablet':
      return (
        <g>
          <rect x="34" y="28" width="132" height="150" rx="12" fill={p.body} />
          <rect x="40" y="34" width="120" height="138" rx="7" fill={p.screen} />
          <circle cx="58" cy="60" r="10" fill="#fff" opacity="0.2" />
          <rect x="72" y="54" width="70" height="6" rx="3" fill="#fff" opacity="0.25" />
          <rect x="72" y="64" width="46" height="5" rx="2.5" fill="#fff" opacity="0.18" />
          <path d="M40 130 Q100 100 160 126 L160 166 Q160 172 154 172 L46 172 Q40 172 40 166Z" fill={p.color} opacity="0.35" />
          <rect x="34" y="28" width="132" height="150" rx="12" fill={p.shine} />
        </g>
      );
    case 'laptop':
      return (
        <g>
          <rect x="38" y="40" width="124" height="88" rx="7" fill="#1f2937" />
          <rect x="43" y="45" width="114" height="78" rx="3" fill={p.screen} />
          <path d="M43 100 Q100 70 157 92 L157 123 L43 123Z" fill={p.color} opacity="0.4" />
          <rect x="43" y="45" width="114" height="78" rx="3" fill={p.shine} />
          <path d="M22 132 L178 132 L170 146 Q169 148 166 148 L34 148 Q31 148 30 146Z" fill={p.body} />
          <rect x="22" y="128" width="156" height="6" rx="2" fill={p.body} />
          <rect x="86" y="129" width="28" height="3" rx="1.5" fill="#000" opacity="0.2" />
        </g>
      );
    case 'monitor':
      return (
        <g>
          <rect x="24" y="34" width="152" height="98" rx="6" fill="#111827" />
          <rect x="28" y="38" width="144" height="90" rx="3" fill={p.screen} />
          <path d="M28 104 Q100 70 172 98 L172 128 L28 128Z" fill={p.color} opacity="0.4" />
          <rect x="92" y="132" width="16" height="26" fill={p.body} />
          <rect x="66" y="156" width="68" height="8" rx="4" fill={p.body} />
        </g>
      );
    case 'tv':
      return (
        <g>
          <rect x="14" y="40" width="172" height="104" rx="5" fill="#0b0f19" />
          <rect x="17" y="43" width="166" height="98" rx="3" fill={p.screen} />
          <path d="M17 112 Q60 70 110 96 T183 84 L183 141 L17 141Z" fill={p.color} opacity="0.45" />
          <circle cx="146" cy="70" r="14" fill="#fff" opacity="0.15" />
          <rect x="17" y="43" width="166" height="98" rx="3" fill={p.shine} />
          <path d="M60 144 L52 168 M140 144 L148 168" stroke="#374151" strokeWidth="5" strokeLinecap="round" />
        </g>
      );
    case 'watch':
      return (
        <g>
          <rect x="72" y="14" width="56" height="50" rx="12" fill={p.body} />
          <rect x="72" y="136" width="56" height="50" rx="12" fill={p.body} />
          <rect x="56" y="52" width="88" height="96" rx="26" fill="#1f2937" />
          <rect x="62" y="58" width="76" height="84" rx="21" fill={p.screen} />
          <text x="100" y="98" textAnchor="middle" fontSize="20" fontWeight="700" fill="#fff" fontFamily="Inter, sans-serif">10:09</text>
          <circle cx="100" cy="118" r="8" fill="none" stroke={p.color} strokeWidth="3" />
          <rect x="144" y="84" width="6" height="18" rx="3" fill="#6b7280" />
          <rect x="56" y="52" width="88" height="96" rx="26" fill={p.shine} />
        </g>
      );
    case 'earbuds':
      return (
        <g>
          <rect x="44" y="76" width="112" height="92" rx="34" fill={p.body} />
          <rect x="44" y="76" width="112" height="92" rx="34" fill={p.shine} />
          <rect x="44" y="104" width="112" height="3" fill="#000" opacity="0.12" />
          <circle cx="100" cy="134" r="4" fill="#22c55e" />
          <path d="M70 72 Q58 40 76 28 Q92 22 92 44 L90 70Z" fill="#f8fafc" stroke="#d1d5db" />
          <path d="M130 72 Q142 40 124 28 Q108 22 108 44 L110 70Z" fill="#f8fafc" stroke="#d1d5db" />
        </g>
      );
    case 'headphones':
      return (
        <g>
          <path d="M42 112 Q42 34 100 34 Q158 34 158 112" fill="none" stroke={p.color} strokeWidth="12" strokeLinecap="round" />
          <rect x="28" y="100" width="40" height="64" rx="18" fill={p.body} />
          <rect x="132" y="100" width="40" height="64" rx="18" fill={p.body} />
          <rect x="40" y="110" width="20" height="44" rx="10" fill="#000" opacity="0.2" />
          <rect x="140" y="110" width="20" height="44" rx="10" fill="#000" opacity="0.2" />
          <rect x="28" y="100" width="40" height="64" rx="18" fill={p.shine} />
        </g>
      );
    case 'speaker':
      return (
        <g>
          <rect x="58" y="22" width="84" height="156" rx="40" fill={p.body} />
          <rect x="58" y="22" width="84" height="156" rx="40" fill={p.shine} />
          <circle cx="100" cy="76" r="24" fill="#000" opacity="0.25" />
          <circle cx="100" cy="76" r="12" fill="#000" opacity="0.3" />
          <circle cx="100" cy="134" r="18" fill="#000" opacity="0.22" />
          <circle cx="100" cy="134" r="8" fill="#000" opacity="0.3" />
        </g>
      );
    case 'keyboard':
      return (
        <g transform="translate(0 20)">
          <rect x="14" y="58" width="172" height="68" rx="8" fill="#1f2937" />
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 12 }).map((_, col) => (
              <rect
                key={`${row}-${col}`}
                x={21 + col * 13.6}
                y={65 + row * 14}
                width="11"
                height="11"
                rx="2"
                fill={(row + col) % 5 === 0 ? p.color : '#374151'}
              />
            )),
          )}
          <rect x="14" y="58" width="172" height="68" rx="8" fill={p.shine} />
        </g>
      );
    case 'mouse':
      return (
        <g>
          <path d="M100 26 Q148 26 150 90 L150 132 Q150 180 100 180 Q50 180 50 132 L50 90 Q52 26 100 26Z" fill={p.body} />
          <path d="M100 26 L100 86" stroke="#000" strokeOpacity="0.25" strokeWidth="2" />
          <path d="M50 86 L150 86" stroke="#000" strokeOpacity="0.15" strokeWidth="2" />
          <rect x="95" y="46" width="10" height="22" rx="5" fill="#111827" />
          <path d="M60 150 Q100 166 140 150" stroke="#38bdf8" strokeWidth="3" fill="none" opacity="0.8" />
          <path d="M100 26 Q148 26 150 90 L150 132 Q150 180 100 180 Q50 180 50 132 L50 90 Q52 26 100 26Z" fill={p.shine} />
        </g>
      );
    case 'charger':
      return (
        <g>
          <rect x="62" y="56" width="76" height="92" rx="16" fill={p.body} />
          <rect x="62" y="56" width="76" height="92" rx="16" fill={p.shine} />
          <rect x="78" y="34" width="8" height="24" rx="2" fill="#9ca3af" />
          <rect x="114" y="34" width="8" height="24" rx="2" fill="#9ca3af" />
          <rect x="88" y="120" width="24" height="8" rx="3" fill="#111827" />
          <path d="M100 148 Q100 176 140 180" stroke={p.color} strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M104 82 L94 100 L104 100 L96 116" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" />
        </g>
      );
    case 'powerbank':
      return (
        <g>
          <rect x="54" y="26" width="92" height="152" rx="18" fill={p.body} />
          <rect x="54" y="26" width="92" height="152" rx="18" fill={p.shine} />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={78 + i * 12} y="150" width="8" height="8" rx="2" fill="#22c55e" opacity={i < 3 ? 1 : 0.3} />
          ))}
          <rect x="86" y="30" width="28" height="6" rx="3" fill="#111827" opacity="0.6" />
          <text x="100" y="104" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff" opacity="0.85" fontFamily="Inter, sans-serif">20000</text>
          <text x="100" y="120" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff" opacity="0.7" fontFamily="Inter, sans-serif">mAh</text>
        </g>
      );
    case 'camera':
      return (
        <g>
          <rect x="22" y="62" width="156" height="100" rx="14" fill={p.body} />
          <rect x="44" y="48" width="40" height="18" rx="5" fill={p.body} />
          <circle cx="104" cy="112" r="40" fill="#111827" />
          <circle cx="104" cy="112" r="30" fill="#1f2937" stroke="#4b5563" strokeWidth="3" />
          <circle cx="104" cy="112" r="16" fill={p.screen} />
          <circle cx="96" cy="104" r="5" fill="#fff" opacity="0.5" />
          <circle cx="158" cy="80" r="5" fill="#f87171" />
          <rect x="22" y="62" width="156" height="100" rx="14" fill={p.shine} />
        </g>
      );
    case 'fridge':
      return (
        <g>
          <rect x="52" y="12" width="96" height="172" rx="10" fill={p.body} />
          <rect x="52" y="12" width="96" height="172" rx="10" fill={p.shine} />
          <rect x="99" y="12" width="2" height="172" fill="#000" opacity="0.15" />
          <rect x="90" y="60" width="4" height="40" rx="2" fill="#e5e7eb" />
          <rect x="106" y="60" width="4" height="40" rx="2" fill="#e5e7eb" />
          <rect x="112" y="30" width="24" height="16" rx="3" fill="#111827" opacity="0.6" />
        </g>
      );
    case 'washer':
      return (
        <g>
          <rect x="40" y="18" width="120" height="164" rx="12" fill={p.body} />
          <rect x="40" y="18" width="120" height="164" rx="12" fill={p.shine} />
          <rect x="40" y="44" width="120" height="2" fill="#000" opacity="0.12" />
          <circle cx="60" cy="31" r="5" fill="#111827" opacity="0.5" />
          <rect x="110" y="26" width="38" height="10" rx="3" fill="#111827" opacity="0.6" />
          <circle cx="100" cy="112" r="46" fill="#d1d5db" />
          <circle cx="100" cy="112" r="36" fill={p.screen} />
          <path d="M70 120 Q100 100 130 120" stroke="#fff" strokeOpacity="0.4" strokeWidth="4" fill="none" />
        </g>
      );
    case 'airpurifier':
      return (
        <g>
          <rect x="58" y="18" width="84" height="164" rx="20" fill={p.body} />
          <rect x="58" y="18" width="84" height="164" rx="20" fill={p.shine} />
          {Array.from({ length: 9 }).map((_, i) => (
            <rect key={i} x="70" y={74 + i * 10} width="60" height="4" rx="2" fill="#000" opacity="0.12" />
          ))}
          <circle cx="100" cy="46" r="12" fill="#111827" opacity="0.6" />
          <circle cx="100" cy="46" r="5" fill="#22c55e" />
        </g>
      );
  }
}
