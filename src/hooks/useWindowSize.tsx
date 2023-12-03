import { useEffect, useState } from 'react';

type WindowSize = {
  width: number;
  height: number;
};

type Breakpoint = '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '';

const debounce = <F extends (...args: any[]) => void>(
  func: F,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const useWindowSize = (): {
  windowSize: WindowSize;
  breakpoint: Breakpoint;
} => {
  const isClient = typeof window === 'object';

  const defaultSize = { width: 0, height: 0 };
  const [windowSize, setWindowSize] = useState<WindowSize>(
    isClient
      ? { width: window.innerWidth, height: window.innerHeight }
      : defaultSize
  );

  const getBreakpoint = (): Breakpoint => {
    const windowWidth = windowSize.width as number;
    if (windowWidth >= 1536) return '2xl';
    if (windowWidth >= 1280) return 'xl';
    if (windowWidth >= 1024) return 'lg';
    if (windowWidth >= 768) return 'md';
    if (windowWidth >= 640) return 'sm';
    if (windowWidth >= 480) return 'xs';
    return '';
  };

  useEffect(() => {
    if (!isClient) return;
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 200);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isClient]);

  return {
    windowSize: isClient ? windowSize : defaultSize,
    breakpoint: getBreakpoint(),
  };
};

export default useWindowSize;
