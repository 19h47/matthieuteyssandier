---
paths:
  - "views/**/*.twig"
  - "src/stylesheets/**/*.css"
---

# Tailwind dans les Twig

Header, footer, pages et composants se stylent avec des classes Tailwind dans le `.twig`, pas avec une feuille BEM + `@apply` dédiée.

## Exceptions

- `src/stylesheets/components/button.css` : la pilule `.button` et son libellé roulant (`.button__label`, voir `components/button-label.html.twig`). Ne pas ajouter d'autre feuille dans `components/`.
- `src/stylesheets/utilities/` : ce qui ne s'exprime pas en utilitaires sans devenir illisible, déclaré en `@utility` (`container`, `layout-grid`, `enter`, `cards`).

## Espacement entre frères

Préférer `space-y-*` (ou `gap-*` en flex/grid) sur le parent plutôt que des `mt-*` / `mb-*` conditionnels sur chaque enfant.

## Pseudos `before:` / `after:`

- Décoration sans contenu (voile, pastille, séparateur) : `before:` / `after:` plutôt qu'un tag vide.
- Pas de `before:content-['']` / `after:content-['']` : Tailwind pose déjà `content: ""`.

## Échelle avant valeurs arbitraires

Utiliser l'échelle Tailwind (`mt-33.5`, `size-11`, `aspect-389/396`) et les tokens de `theme.css` (`text-7xl`, `rounded-5xl`, `bg-red`, `ease-out`) plutôt que des crochets `[…px]` ou `[…rem]`. Pas de px dans les classes.
