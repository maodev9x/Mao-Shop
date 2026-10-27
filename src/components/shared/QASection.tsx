import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Clock, MessageCircleQuestion, MessageSquareReply, Send, Zap } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useShop } from '../../context/ShopContext';
import { cn, timeAgo } from '../../lib/format';
import type { Question, Reply } from '../../types';
import Reveal from '../ui/Reveal';
import Avatar from './Avatar';

type Props = {
  questions: Question[];
  onAsk: (author: string, content: string) => void;
  onReply: (questionId: string, author: string, content: string) => void;
};

const PAGE = 5;

function AuthorLine({ author, isAdmin, createdAt }: { author: string; isAdmin?: boolean; createdAt: number }) {
  return (
    <p className="flex flex-wrap items-center gap-2">
      {isAdmin ? (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
          <Zap className="h-4 w-4 fill-current" />
        </span>
      ) : (
        <Avatar name={author} />
      )}
      <span className="text-sm font-semibold">{author}</span>
      {isAdmin && <span className="rounded bg-primary px-1.5 text-[10px] font-bold text-white">QTV</span>}
      <span className="flex items-center gap-1 text-[11px] text-muted">
        <Clock className="h-3 w-3" /> {timeAgo(createdAt)}
      </span>
    </p>
  );
}

function ReplyForm({ onSubmit, onCancel }: { onSubmit: (author: string, content: string) => void; onCancel: () => void }) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(author.trim() || 'Khách', content.trim());
  };
  return (
    <motion.form
      onSubmit={submit}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden"
    >
      <div className="mt-2 grid gap-2 sm:grid-cols-[160px_1fr_auto]">
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Tên của bạn"
          className="h-9 rounded-lg border border-line px-3 text-sm outline-none focus:border-primary"
        />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Viết phản hồi..."
          autoFocus
          className="h-9 rounded-lg border border-line px-3 text-sm outline-none focus:border-primary"
        />
        <div className="flex gap-2">
          <button type="button" onClick={onCancel} className="h-9 rounded-lg px-3 text-sm text-muted hover:bg-page">
            Hủy
          </button>
          <button type="submit" className="h-9 rounded-lg bg-primary px-3 text-sm font-semibold text-white hover:bg-primary-dark">
            Gửi
          </button>
        </div>
      </div>
    </motion.form>
  );
}

function QuestionItem({ question, onReply }: { question: Question; onReply: Props['onReply'] }) {
  const [replying, setReplying] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const replies: Reply[] = showAll ? question.replies : question.replies.slice(0, 1);

  return (
    <motion.li layout initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="py-4">
      <AuthorLine author={question.author} createdAt={question.createdAt} />
      <div className="ml-4 border-l border-line pl-6">
        <p className="mt-1 text-sm text-ink/85">{question.content}</p>
        <div className="mt-1 flex items-center gap-4 text-xs">
          <button type="button" onClick={() => setReplying((v) => !v)} className="flex items-center gap-1 text-primary hover:underline">
            <MessageSquareReply className="h-3.5 w-3.5" /> Phản hồi
          </button>
          {question.replies.length > 0 && (
            <button type="button" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded} className="flex items-center gap-0.5 text-ink/70 hover:text-ink">
              {expanded ? 'Thu gọn phản hồi' : `Xem ${question.replies.length} phản hồi`}
              <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', expanded && 'rotate-180')} />
            </button>
          )}
        </div>
        <AnimatePresence initial={false}>
          {replying && (
            <ReplyForm
              onCancel={() => setReplying(false)}
              onSubmit={(author, content) => {
                onReply(question.id, author, content);
                setReplying(false);
                setExpanded(true);
                setShowAll(true);
              }}
            />
          )}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          {expanded && question.replies.length > 0 && (
            <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <AnimatePresence initial={false}>
                {replies.map((r) => (
                  <motion.li key={r.id} layout initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="mt-3 rounded-xl bg-page/70 p-3">
                    <AuthorLine author={r.author} isAdmin={r.isAdmin} createdAt={r.createdAt} />
                    <p className="mt-1.5 pl-10 text-sm whitespace-pre-line text-ink/85">{r.content}</p>
                  </motion.li>
                ))}
              </AnimatePresence>
              {question.replies.length > 1 && !showAll && (
                <li>
                  <button type="button" onClick={() => setShowAll(true)} className="mt-2 flex items-center gap-0.5 text-xs font-medium text-ink/70 hover:text-ink">
                    Xem tất cả {question.replies.length} phản hồi <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </li>
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  );
}

export default function QASection({ questions, onAsk, onReply }: Props) {
  const { notify } = useShop();
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [visible, setVisible] = useState(PAGE);

  const ask = (e: FormEvent) => {
    e.preventDefault();
    if (content.trim().length < 5) return notify('Câu hỏi cần tối thiểu 5 ký tự');
    onAsk(author.trim() || 'Khách', content.trim());
    setContent('');
    notify('Đã gửi câu hỏi, MaoShop sẽ phản hồi trong vòng 1 giờ');
  };

  return (
    <Reveal as="section" className="mt-8">
      <div id="hoi-dap" className="scroll-mt-24 rounded-2xl bg-white p-4 shadow-card sm:p-6">
        <h2 className="mb-4 text-lg font-bold">Hỏi và đáp</h2>
        <form onSubmit={ask} className="grid gap-4 rounded-xl bg-page/60 p-4 sm:grid-cols-[96px_1fr]">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-soft text-primary max-sm:hidden">
            <MessageCircleQuestion className="h-10 w-10" />
          </span>
          <div>
            <p className="font-bold">Hãy đặt câu hỏi cho chúng tôi</p>
            <p className="mt-1 text-xs text-ink/70 sm:text-sm">
              MaoShop sẽ phản hồi trong vòng 1 giờ. Nếu bạn gửi câu hỏi sau 22h, chúng tôi sẽ trả lời vào sáng hôm sau.
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-[180px_1fr_auto]">
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Tên của bạn"
                aria-label="Tên của bạn"
                className="h-10 rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-primary"
              />
              <input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Viết câu hỏi của bạn tại đây"
                aria-label="Câu hỏi"
                className="h-10 rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-primary"
              />
              <button type="submit" className="flex h-10 items-center justify-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-dark">
                Gửi câu hỏi <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>

        <ul className="mt-2 divide-y divide-line">
          <AnimatePresence initial={false}>
            {questions.slice(0, visible).map((q) => (
              <QuestionItem key={q.id} question={q} onReply={onReply} />
            ))}
          </AnimatePresence>
        </ul>
        {questions.length > visible && (
          <div className="mt-2 flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE)}
              className="rounded-lg border border-line px-5 py-2 text-sm font-medium hover:border-primary hover:text-primary"
            >
              Xem thêm {questions.length - visible} câu hỏi
            </button>
          </div>
        )}
      </div>
    </Reveal>
  );
}
