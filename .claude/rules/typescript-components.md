---
paths:
  - "src/scripts/**/*.ts"
---

# TypeScript (composants)

## Privé : `#` natif, pas `private`

Dans les composants `Piece` / custom elements, utiliser les [private fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties) JavaScript (`#`), pas le modificateur TypeScript `private` (effacé à la compilation, pas vraiment privé au runtime).

```ts
// DO
#onKeydown = (event: KeyboardEvent): void => { /* … */ };
#scrollTrigger: ScrollTrigger | null = null;

document.addEventListener('keydown', this.#onKeydown);

// DONT
private onKeydown = (event: KeyboardEvent): void => { /* … */ };
private scrollTrigger: ScrollTrigger | null = null;
```

Réserver `mount` / `unmount`, l’API publique du custom element, et les refs DOM `$…` (comme `$main`) sans `#`. État interne, handlers et helpers : `#`.
