import { useState, useEffect } from 'react';

export function useTyping(texts, speed = 85) {
  const [index, setIndex]     = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const current = texts[index];
    let timer;
    if (!deleting && charCount < current.length) {
      timer = setTimeout(() => setCharCount((c) => c + 1), speed);
    } else if (!deleting && charCount === current.length) {
      timer = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charCount > 0) {
      timer = setTimeout(() => setCharCount((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setIndex((i) => (i + 1) % texts.length);
    }
    return () => clearTimeout(timer);
  }, [index, charCount, deleting, texts, speed]);

  return texts[index].slice(0, charCount);
}
