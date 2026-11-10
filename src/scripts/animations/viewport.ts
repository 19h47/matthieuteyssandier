/**
 * Whether the element starts below the fold.
 *
 * Content already on screen (or scrolled past) at mount is never hidden,
 * so a late script cannot make it flash, and a failed one cannot hide it.
 * Hidden elements (`display: none`) report a zero rect and are skipped.
 */
export function isBelowFold($el: Element): boolean {
	return $el.getBoundingClientRect().top > window.innerHeight;
}
