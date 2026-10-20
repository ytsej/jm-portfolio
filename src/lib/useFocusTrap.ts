"use client";

import { useEffect } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Open overlays, innermost last. Only the top one handles Tab, so an image
// viewer opened from a panel traps focus without the panel fighting it.
const stack: HTMLElement[] = [];

// Opening a case can unmount the control that opened it (Home -> /projects/x)
// before the panel mounts, so remember the last focused element as a fallback
let lastFocused: HTMLElement | null = null;
if (typeof document !== "undefined") {
  document.addEventListener("focusin", (e) => {
    if (e.target instanceof HTMLElement) lastFocused = e.target;
  });
}

function focusables(node: HTMLElement) {
  return Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.closest("[inert]") && el.getClientRects().length > 0
  );
}

// The opener may have been re-rendered (e.g. Back returned to the Home view),
// so fall back to a focusable link with the same destination
function findOpener(opener: HTMLElement | null, href: string | null) {
  if (opener?.isConnected) return opener;
  if (!href) return null;
  return (
    Array.from(document.querySelectorAll<HTMLElement>("a[href]")).find(
      (el) => el.getAttribute("href") === href && el.tabIndex >= 0
    ) ?? null
  );
}

// While active: move focus into the overlay, keep Tab and Shift+Tab inside it,
// and give focus back to whatever opened it when it closes. Pass the element
// from a callback ref, since overlays often mount after an animation.
export function useFocusTrap(node: HTMLElement | null, active: boolean) {
  useEffect(() => {
    if (!active || !node) return;

    const opener =
      document.activeElement instanceof HTMLElement && document.activeElement !== document.body
        ? document.activeElement
        : lastFocused;
    const openerHref = opener?.getAttribute("href") ?? null;
    stack.push(node);
    if (!node.contains(document.activeElement)) {
      (focusables(node)[0] ?? node).focus({ preventScroll: true });
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || stack[stack.length - 1] !== node) return;
      const items = focusables(node);
      if (items.length === 0) {
        e.preventDefault();
        node.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      if (e.shiftKey && (current === first || !node.contains(current))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (current === last || !node.contains(current))) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      const index = stack.lastIndexOf(node);
      if (index !== -1) stack.splice(index, 1);
      // Wait a frame so a view restored by Back has rendered its links
      requestAnimationFrame(() => findOpener(opener, openerHref)?.focus({ preventScroll: true }));
    };
  }, [active, node]);
}
