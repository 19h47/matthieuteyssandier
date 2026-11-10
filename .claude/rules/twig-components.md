---
paths:
  - "views/**/*.twig"
---

# Composants Twig

## Principe

Un composant dans `views/components/` encapsule son markup **et** ses préconditions. Le template parent passe les données ; le composant décide s'il a assez de contenu pour s'afficher.

## DO

- **Garde dans le composant** : tester `items|length`, `image`, `url`, etc. à l'intérieur du `.twig` inclus, pas dans le parent autour du `{% include %}`.

```twig
{# components/example-nav.html.twig #}
{%- if items|length -%}
  <h3>{{ title }}</h3>
  <nav aria-label="{{ label }}">…</nav>
{%- endif -%}
```

```twig
{# parent #}
{{ include('components/example-nav.html.twig', { title: '…', items: menu_items, label: '…' }) }}
```

- **`label`** pour le libellé accessible d'un `<nav>` (`aria-label`), pas `nav_label` ni `aria_label`.
- Documenter les `@param` en tête de fichier (docblock Twig).
- Nommer les params de façon courte et générique : `title`, `items`, `label`, `classes`.
- **Inline plutôt que `{% set %}`** : toujours. Pas de variable intermédiaire pour un usage unique. Surtout jamais `{% set foo = foo | default(...) %}` ni `{% set foo = foo | default(null) %}` (no-op).

```twig
{# DO #}
{%- if overline or title or text -%}
  <header class="{{ (mode | default('light')) == 'dark' ? 'bg-black' : 'bg-gray-light' }}">
    {%- if title -%}<h1>{{ title }}</h1>{%- endif -%}
  </header>
{%- endif -%}

{# DONT #}
{%- set mode = mode | default('light') -%}
{%- set title = title | default(null) -%}
{%- if title -%}
  <h1>{{ title }}</h1>
{%- endif -%}
```

Réserver `{% set %}` aux cas où la **même** valeur coûteuse est réutilisée **au moins deux fois** ou allège réellement une condition complexe.

## Layout et comportement dans le parent

Un composant ne décide **jamais** de son placement dans le parent (sticky, colonne de grille, `self-start`, visibilité responsive liée au layout). Soit le parent passe ces classes via `classes`, soit le parent les pose sur un wrapper autour de l'`include`. Jamais hardcodées dans le composant.

```twig
{# DO: le parent décide du sticky #}
{{ include('components/table-of-contents.html.twig', {
  items: items,
  classes: ['lg:sticky', 'lg:top-32', 'lg:col-span-3']
}) }}

{# DONT: le composant s'auto-sticky #}
<nav class="… lg:sticky lg:top-32">
```

Référence : `table-of-contents.html.twig` (`classes` pour colonne + sticky).

## DONT

- Pas de `{%- if items -%}` autour d'un `{% include %}` quand le composant peut le faire lui-même.
- Pas de préfixe redondant sur les params (`nav_label`, `button_title`) quand le contexte du composant est déjà explicite.
- Pas de duplication de la même garde parent + enfant.
- Pas de `{% set foo = … %}` pour un affichage unique quand l'expression peut rester inline.
- Pas de `{% set foo = foo | default(...) %}` ni `{% set foo = foo | default(null) %}` : supprimer à vue.
- Pas de classes de layout/placement (`sticky`, `col-span-*`, `lg:top-*`, …) hardcodées dans un composant : passer par `classes` ou un wrapper parent.

## Références

- `views/components/pagination.html.twig` : garde `pagination.pages|length` interne.
