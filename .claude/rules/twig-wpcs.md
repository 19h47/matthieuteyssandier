---
paths:
  - "views/**/*.twig"
---

# Twig et WordPress Coding Standards

## Principe

Les templates Twig suivent la même logique d'espacement que le PHP WPCS, **en compatibilité avec Prettier** (`@zackad/prettier-plugin-twig`).

## Prettier

Le plugin Twig de Prettier applique par défaut les [coding standards officiels Twig](https://twig.symfony.com/doc/3.x/coding_standards.html) (`foo|bar` sans espaces). Pour rapprocher du WPCS, activer dans `.prettierrc.json` :

```json
{
	"twigFollowOfficialCodingStandards": false
}
```

Effet : espaces autour des `|` (`foo | bar`). Les parenthèses des filtres restent compactes (`split(' ', 2)`), le plugin ne gère pas les espaces intérieurs type PHP (`split( ' ', 2 )`).

Pour conserver un formatage 100 % manuel sur les Twig, les exclure via `.prettierignore` :

```
views/**/*.twig
```

(au prix du tri Tailwind automatique dans les classes des templates).

## DO

- Espacer les filtres avec ` | ` (format Prettier avec `twigFollowOfficialCodingStandards: false`) :

```twig
{{- site.name | split(' ', 2) | join('<br>') | raw -}}
```

- Chaîner les filtres avec ` | ` entre chaque étape.
- Laisser Prettier formater les `.twig` au save plutôt que lutter contre lui.

## DONT

- Pas de chaînes compactes du type `foo|bar('x')|baz` sans espaces autour des `|`.
- Pas de format WPCS PHP strict (`split( ' ', 2 )`) si Prettier est actif sur les Twig : il sera écrasé au save.

## Exemples

```twig
{# DO: compatible Prettier #}
{%- set items = nav_menus.footer.get_items() | default([]) -%}
{%- if items | length -%}
{{ post.title | default(post.hero.title) }}
{{ __('Published on: %s', 'text-domain') | format(post.date) }}

{# DONT #}
{%- set items = nav_menus.footer.get_items()|default([]) -%}
{{- site.name|split(' ', 2)|join('<br>')|raw -}}
```
