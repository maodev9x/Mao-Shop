import { motion } from 'framer-motion';
import { PackageSearch } from 'lucide-react';

type Props = { message?: string; actionLabel?: string; onAction?: () => void };

/** Shown when a filtered product list is empty. */
export default function EmptyResults({ message = 'Chưa có sản phẩm phù hợp với bộ lọc này.', actionLabel, onAction }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center gap-2 rounded-xl bg-white py-14 text-center text-muted"
    >
      <PackageSearch className="h-10 w-10" />
      <p className="text-sm">{message}</p>
      {actionLabel && onAction && (
        <button type="button" onClick={onAction} className="mt-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark">
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
