import { useCallback, useEffect, useMemo, useState } from 'react';
import { getSampleQuestions, getSampleReviews } from '../data/feedback';
import { readStorage, writeStorage } from '../lib/storage';
import type { Product, Question, Reply, Review } from '../types';

type Stored = {
  reviews: Review[];
  questions: Question[];
  /** Replies the user added to sample questions, keyed by question id */
  replies: Record<string, Reply[]>;
};

const empty: Stored = { reviews: [], questions: [], replies: {} };
const keyOf = (storageId: string) => `maoshop.feedback.${storageId}`;
const newId = () => `u-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

/**
 * Sample reviews/questions merged with what the visitor submitted.
 * User content comes first and is persisted per `storageId` in localStorage.
 * `samples` must be memoised by the caller.
 */
export function useFeedback(storageId: string, samples: { reviews: Review[]; questions: Question[] }) {
  const [stored, setStored] = useState<Stored>(() => ({ ...empty, ...readStorage<Stored>(keyOf(storageId), empty) }));

  // reload when navigating to another product / category
  useEffect(() => {
    setStored({ ...empty, ...readStorage<Stored>(keyOf(storageId), empty) });
  }, [storageId]);

  const save = useCallback(
    (update: (prev: Stored) => Stored) => {
      setStored((prev) => {
        const next = update(prev);
        writeStorage(keyOf(storageId), next);
        return next;
      });
    },
    [storageId],
  );

  const reviews = useMemo(() => [...stored.reviews, ...samples.reviews], [stored.reviews, samples.reviews]);

  const questions = useMemo(
    () =>
      [...stored.questions, ...samples.questions].map((q) => ({
        ...q,
        replies: [...q.replies, ...(stored.replies[q.id] ?? [])],
      })),
    [stored.questions, stored.replies, samples.questions],
  );

  const addReview = useCallback(
    (review: Omit<Review, 'id' | 'createdAt'>) => save((s) => ({ ...s, reviews: [{ ...review, id: newId(), createdAt: Date.now() }, ...s.reviews] })),
    [save],
  );

  const addQuestion = useCallback(
    (author: string, content: string) =>
      save((s) => ({ ...s, questions: [{ id: newId(), author, content, createdAt: Date.now(), replies: [] }, ...s.questions] })),
    [save],
  );

  const addReply = useCallback(
    (questionId: string, author: string, content: string) =>
      save((s) => ({
        ...s,
        replies: { ...s.replies, [questionId]: [...(s.replies[questionId] ?? []), { id: newId(), author, content, createdAt: Date.now() }] },
      })),
    [save],
  );

  return { reviews, questions, addReview, addQuestion, addReply };
}

/** Product page wrapper: samples generated per product, stored under the product id. */
export function useProductFeedback(product: Product) {
  const samples = useMemo(() => ({ reviews: getSampleReviews(product), questions: getSampleQuestions(product) }), [product]);
  return useFeedback(product.id, samples);
}
