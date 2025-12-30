import { useCallback, useLayoutEffect, useRef } from 'react';

/**
 * useStableFunction based on useEvent RFC.
 * See: https://github.com/reactjs/rfcs/blob/d85e257502a43c08d17e8ab58efa0880f7f007a5/text/0000-useevent.md
 * The main difference is semantics: useEvent is meant to handle side-effects whereas this implementation is meant to provide stable but updated function references.
 * So this is a bit more generic.
 *
 * @param handler
 */
export function useStableFunction<T extends Function>(handler: T): T {
  const handlerRef = useRef<T | null>(handler);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  const callback = useCallback((...args: unknown[]) => {
    if (!handlerRef.current) {
      throw new Error('event called before initialization');
    }
    // In a real implementation, this would throw if called during render
    const fn = handlerRef.current;
    return fn(...args);
  }, []);
  return callback as unknown as T;
}
