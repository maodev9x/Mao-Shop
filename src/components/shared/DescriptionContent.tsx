import { Link } from 'react-router-dom';
import Accordion from '../ui/Accordion';

export type TocItem = { title: string; children?: string[] };

type Props = {
  title: string;
  highlights?: string[];
  paragraphs: string[];
  /** "Laptop nổi bật:" chips shown above the text */
  featured?: { label: string; links: { label: string; to: string }[] };
  /** "Nội dung chính" table of contents */
  toc?: TocItem[];
};

/** Long-form text block shared by the product page ("Mô tả sản phẩm") and category pages (SEO intro). */
export default function DescriptionContent({ title, highlights, paragraphs, featured, toc }: Props) {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-card sm:p-8">
      {featured && (
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold">{featured.label}</span>
          {featured.links.map((l) => (
            <Link key={l.label} to={l.to} className="rounded-md border border-line px-2.5 py-1 text-xs text-ink/80 transition-colors hover:border-primary hover:text-primary">
              {l.label}
            </Link>
          ))}
        </div>
      )}
      <h3 className="text-lg font-bold">{title}</h3>
      {highlights && (
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ink/80">
          {highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
      {paragraphs.slice(0, 1).map((p) => (
        <p key={p} className="mt-4 text-sm leading-relaxed text-ink/80">
          {p}
        </p>
      ))}

      {toc && (
        <Accordion
          className="mt-5 overflow-hidden rounded-xl bg-page"
          buttonClassName="px-4 py-2.5 text-sm font-semibold"
          defaultOpen="toc"
          items={[
            {
              id: 'toc',
              title: 'Nội dung chính',
              content: (
                <ol className="px-4 pb-3 text-sm text-ink/75">
                  {toc.map((item, i) => (
                    <li key={item.title} className="mt-1">
                      {i + 1}. {item.title}
                      {item.children && (
                        <ol className="mt-1 space-y-0.5 pl-5 text-ink/60">
                          {item.children.map((c, j) => (
                            <li key={c}>
                              {i + 1}.{j + 1}. {c}
                            </li>
                          ))}
                        </ol>
                      )}
                    </li>
                  ))}
                </ol>
              ),
            },
          ]}
        />
      )}

      {paragraphs.slice(1).map((p) => (
        <p key={p} className="mt-4 text-sm leading-relaxed text-ink/80">
          {p}
        </p>
      ))}
    </article>
  );
}
