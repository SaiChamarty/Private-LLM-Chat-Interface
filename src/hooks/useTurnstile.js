import { useEffect, useRef, useCallback } from 'react';

/**
 * Cloudflare Turnstile site key.
 * Set via VITE_TURNSTILE_SITE_KEY env variable, or replace the fallback below.
 */
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || 'YOUR_TURNSTILE_SITE_KEY';

/**
 * React hook for managing an invisible Cloudflare Turnstile widget.
 *
 * Returns:
 *  - containerRef: attach to a hidden <div> in your JSX
 *  - getToken(): async function that resolves with a fresh one-time token
 *
 * Usage:
 *   const { containerRef, getToken } = useTurnstile();
 *   // In JSX:  <div ref={containerRef} />
 *   // Before API call:  const token = await getToken();
 */
export function useTurnstile() {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const resolveRef = useRef(null);
  const readyTokenRef = useRef(null);

  // Render the invisible widget once the Turnstile script has loaded
  useEffect(() => {
    if (!containerRef.current) return;

    const interval = setInterval(() => {
      if (window.turnstile && containerRef.current && widgetIdRef.current === null) {
        clearInterval(interval);

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          size: 'invisible',
          callback: (token) => {
            // Token received — either fulfill a pending promise or stash it
            if (resolveRef.current) {
              resolveRef.current(token);
              resolveRef.current = null;
            } else {
              readyTokenRef.current = token;
            }
          },
          'error-callback': () => {
            if (resolveRef.current) {
              resolveRef.current(null);
              resolveRef.current = null;
            }
          },
          'expired-callback': () => {
            // Token expired before it was used — clear the stash
            readyTokenRef.current = null;
          },
        });
      }
    }, 100);

    return () => {
      clearInterval(interval);
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, []);

  /**
   * Get a fresh Turnstile token.
   * Consumes any pre-generated token, or waits for the widget to produce one.
   * After consumption the widget auto-resets so a new token is ready for the next call.
   *
   * @returns {Promise<string|null>} The one-time verification token
   */
  const getToken = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!window.turnstile || widgetIdRef.current === null) {
        reject(new Error('Turnstile not loaded yet. Please try again in a moment.'));
        return;
      }

      // If we already have a pre-generated token, consume it immediately
      if (readyTokenRef.current) {
        const token = readyTokenRef.current;
        readyTokenRef.current = null;
        resolve(token);
        // Reset widget so a fresh token is ready for the next call
        window.turnstile.reset(widgetIdRef.current);
        return;
      }

      // Otherwise, reset the widget to trigger a new challenge and wait
      resolveRef.current = resolve;
      window.turnstile.reset(widgetIdRef.current);

      // Safety timeout — don't hang forever
      setTimeout(() => {
        if (resolveRef.current === resolve) {
          resolveRef.current = null;
          reject(new Error('Turnstile verification timed out. Please try again.'));
        }
      }, 15000);
    });
  }, []);

  return { containerRef, getToken };
}
