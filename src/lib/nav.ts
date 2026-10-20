import type { MouseEvent } from "react";

// Let a real link switch views in place, while Ctrl/Cmd/middle click still
// opens a new tab and crawlers still see a normal href.
export function handleInternalClick(e: MouseEvent, go: () => void) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  go();
}
