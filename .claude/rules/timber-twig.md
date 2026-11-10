---
paths:
  - "views/**/*.twig"
---

# Timber 2 — Twig

Référence : [Timber v2 docs](https://timber.github.io/docs/v2/), [Functions](https://timber.github.io/docs/v2/guides/functions/), [Posts](https://timber.github.io/docs/v2/guides/posts/), [PostExcerpt](https://timber.github.io/docs/v2/reference/timber-postexcerpt/).

## Requêtes — DO

- Utiliser les helpers Timber **déjà exposés en Twig** : `get_posts()`, `get_post()`, et la même famille (`get_image`, `get_term`, …).
- Passer des args `WP_Query` (ou une liste d’IDs) :

```twig
{% set posts = get_posts({
	post_type: 'case_study',
	posts_per_page: -1,
	post_status: 'publish',
	orderby: {
		menu_order: 'ASC',
		title: 'ASC'
	}
}) %}

{# Depuis des IDs #}
{% set posts = get_posts(post_ids) %}
{% set post = get_post(post_id) %}
```

- Même famille, à utiliser au besoin : `get_image`, `get_attachment`, `get_term`, `get_terms`, `get_user`, `get_users`, `get_comment`, `get_comments`. Réserver `function()` / `fn()` au PHP qui n’est pas un helper Timber (`wp_head`, helpers maison, …).
- `{% set %}` est légitime quand la collection sert au moins deux fois (garde + boucle).

## Requêtes — DONT

- **Pas** `function('Timber\\Timber::get_posts', …)` ni `fn('Timber\\Timber::get_posts', …)` : redondant, Timber l’expose déjà.
- Ne pas confondre avec `get_posts()` du core WP (defaults et type de retour différents) : dans les Twig du thème, `get_posts` = Timber.

## Excerpts — DO

- Utiliser **`{{ post.excerpt }}`** (Timber 2). Objet chaînable `Timber\PostExcerpt`.
- Passer les options en hash (forme préférée de la doc) :

```twig
{{ post.excerpt({ words: 40, read_more: false }) }}
```

- Ou chaîner les méthodes :

```twig
{{ post.excerpt.length(40).read_more(false) }}
```

- Pour le chapô / lead d’une single quand l’éditeur a rempli l’extrait WP : préférer **`post.post_excerpt`**, avec fallback via `default` :

```twig
{{ post.post_excerpt | default(post.excerpt({ words: 40, read_more: false }) | striptags) | trim }}
```

- Intro ACF (ou équivalent) avec fallback extrait :

```twig
{{ post.meta('introduction') | default(post.post_excerpt | default(post.excerpt({ words: 40, read_more: false }) | striptags) | trim) }}
```

- Désactiver le « Read more » avec **`read_more: false`** (pas une chaîne vide).
- Après une modif Twig en prod (`WP_DEBUG` false) : vider `vendor/timber/timber/cache/*` (sinon l’ancien bytecode peut encore appeler `preview`).

## Excerpts — DONT

- **Jamais `{{ post.preview }}`** ni `post.preview.length(…)` : deprecated depuis Timber 2.0 (`Helper.php`). Remplacer par `post.excerpt`.
- Ne pas inventer d’API d’extrait hors doc Timber 2.
