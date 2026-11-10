# Matthieu Teyssandier

WordPress theme of [matthieuteyssandier.com](https://matthieuteyssandier.com), built on Timber/Twig, Vite, Tailwind CSS v4 and TypeScript.

## Requirements

- WordPress 6.8+ (script modules, speculation rules), PHP 8.4
- [Advanced Custom Fields](https://www.advancedcustomfields.com/) PRO and [Classic Editor](https://wordpress.org/plugins/classic-editor/)
- Composer, pnpm, Node 22

## Getting started

```bash
cp .env.sample .env   # APP_URL of the local site
composer install
pnpm install
pnpm build            # also generates public/sprite.svg from src/icons/
pnpm dev              # local dev server
composer phpcs        # WordPress Coding Standards
```

Set `WP_DEBUG` to `true` in `wp-config.php` while developing: otherwise Timber caches the Twig templates (an admin notice says so).

## Template hierarchy

Root PHP files load the Timber context and render a single Twig view.

| Entry point | Twig view | Purpose |
| --- | --- | --- |
| `front-page.php` | `pages/front-page.html.twig` | The case studies chosen on the front page, side by side |
| `single-case_study.php` | `pages/single-case-study.html.twig` | Case study: text, credits, media blocks, next case study |
| `page-templates/about-page.php` | `pages/about-page.html.twig` | About page (dark) |
| `404.php` | `pages/404.html.twig` | Not found, with falling balls |
| `index.php` | `index.html.twig` | Document shell, and pages without a template (legal pages) |

Every page renders the header previews: one modal `<dialog>` per case study that is not on the front page (`components/preview.html.twig`), opened from its color in the header with [invoker commands](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API) and [`@agencecinq/modal`](https://agencecinq.github.io/ui/).

Pages navigate with [cross-document view transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API): they cross-fade, the header stays in place. The loader plays on arrival on the site and on reload, not when following a link of the site.

## Content

- **Case studies** (`case_study`, categories `case_study_cat`): color, cover, mobile cover, preview image, text in English and French, credits, link, and media blocks (`layouts`: one or two images or videos).
- **Front page**: up to three case studies (`case_studies`).
- **Settings → Theme**: social links, presentation, email, copyright, about page.

## Migration from 2.x to 3.0

3.0 rebuilds the theme on Vite, Tailwind CSS v4, TypeScript and Timber 2 stable. Field names and keys are unchanged, so the content stays as it is. Three changes need an action:

1. **WordPress 6.8 and PHP 8.4** are required. Update WordPress, ACF PRO and Classic Editor first.
2. **The about page template moved** from `templates/about-page.php` to `page-templates/about-page.php`. Reassign it to the about page, in the editor (Page Attributes → Template) or with WP-CLI:

   ```bash
   wp post list --post_type=page --meta_key=_wp_page_template --meta_value=templates/about-page.php --field=ID \
     | xargs -I % wp post meta update % _wp_page_template page-templates/about-page.php
   ```

3. **The theme options moved** from the top-level "Theme Settings" menu to **Settings → Theme**. The values are kept.

Removed in 3.0:

- The social and email settings added to Settings → General (`instagram`, `twitter`, `linkedin`, `public_email` options): the theme reads the social links and the email from Settings → Theme only. The options stay in the database, unused.
- The page transitions of modularload, the smooth scroll of locomotive-scroll, and the canvas circles: view transitions, `<dialog>` and CSS `clip-path` replace them.
- The image quality forced to 100: WordPress compresses again (82 by default).
- The removal of the canonical link: WordPress, or an SEO plugin, prints it again.

## Deployment

`deploy.sh` installs the production dependencies, builds the assets and removes the development files. The `.github/workflows/release.yml` workflow runs it on a `v*` tag and attaches the theme ZIP to the GitHub release.

## Translations

The text domain is `matthieuteyssandier`; the template is `languages/matthieuteyssandier.pot`.
