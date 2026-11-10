# Thème WordPress Matthieu Teyssandier

Thème du portfolio de Matthieu Teyssandier, par 19h47. Il suit les conventions du starter CINQ (eigrene), sous l'identité 19h47 : `@author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)`, packages `@19h47/matthieuteyssandier` et `19h47/matthieuteyssandier`, namespace `MatthieuTeyssandier\`, text domain `matthieuteyssandier`, custom elements préfixés `mt-`.

## Stack

- **Templating** : Timber 2 + Twig. Les `*.php` racine (`front-page.php`, `single-case_study.php`, `404.php`, `index.php`, `page-templates/about-page.php`) chargent le contexte Timber et rendent un Twig de `views/pages/`, sans logique. `index.html.twig` est la coquille du document ; les pages l'étendent et posent `mode` (`dark` sur l'about) et `fixed` (page sans défilement) avant `{% extends %}`.
- **Build** : Vite (`pnpm dev` / `pnpm build`), `laravel-vite-plugin`. Entrées : `src/stylesheets/styles.css` et `src/scripts/app.js`. Sortie dans `dist/` (ignoré). Les icônes de `src/icons/` (24×24, `currentColor`) sont compilées dans `public/sprite.svg`, utilisées via `views/svg/use.html.twig`.
- **CSS** : Tailwind CSS v4 configuré en CSS (pas de `tailwind.config.js`). Tokens dans `@theme` de `src/stylesheets/theme.css` : `black`, `gray-dark`, `gray-light`, `red`, tailles fluides `text-4xl`…`text-8xl`, `rounded-5xl`, `ease-out`. Grille : `container` + `layout-grid` (12 colonnes, gouttière 0.5rem puis 1.5rem dès `lg`).
- **JS** : TypeScript, composants dans `src/scripts/components/*.ts` montés via `piecesjs` (`load()` dans `app.js`). Pas d'objet global : les données passent par les attributs `data-*` du composant.
- **PHP** : POO, PSR-4 (`MatthieuTeyssandier\` → `includes/`), chaque classe enregistrée dans `includes/Init.php` implémente `Service`. Standards WordPress via `composer phpcs`.
- **Champs** : ACF PRO, groupes en PHP dans `includes/Plugins/ACF/IncludeFields/`. Options : Réglages > Thème (`options-theme`, champ `options_theme`). Ne jamais renommer un `name` ni une `key` de champ : le contenu en base en dépend.
- **Prérequis** : WordPress 6.8, PHP 8.4, ACF PRO, Classic Editor, Composer, pnpm, Node 22.

## Comportements clés

- **Pastilles** : `ColorPicker.ts` reprend la timeline GSAP d'origine (dépliage depuis la première pastille, repli inverse à ×1.25) ; seule la première prend le pointeur tant que le dépliage n'est pas fini ; elles restent dépliées tant qu'un aperçu est ouvert. État replié posé en CSS pour éviter un flash avant le JS.
- **Aperçus** : chaque étude de cas absente de l'accueil a un `<dialog>` modal (`components/preview.html.twig`, `<cinq-modal>` de `@agencecinq/modal`), ouvert depuis sa pastille par `commandfor` / `command="show-modal"`. `Previews.ts` anime tout en GSAP via les hooks `modal:before-open` / `modal:before-close` (`waitUntil`) : cercle (`reveal`) depuis le pointeur, entrées (`entry`), bouton de fermeture (`close`). Une pastille d'un aperçu ouvert ouvre le suivant **par-dessus** (pas de `data-replace`) : sa couleur recouvre la précédente, qui continue de grandir dessous, pendant que l'ancien contenu sort comme les transitions CSS de la prod (fondu 0.45s, descente 1s, le dernier d'abord) ; les aperçus du dessous sont fermés une fois l'écran couvert. Les clics rapides sont gérés : chaque aperçu garde la liste de ceux qu'il couvre, une fermeture en cours se termine dessous, et la pastille d'un aperçu recouvert le ramène au-dessus.
- **Navigation** : view transitions entre documents (`@view-transition` dans `base/base.css`), le header garde sa place (`view-transition-name`, seulement sur le header de page).
- **Loader** : à l'arrivée sur le site et au rechargement, pas en suivant un lien interne (comme la prod, où ces navigations passaient par modularload). Le script du `<head>` pose `data-loading` sur la racine ; la variante `loading:` et l'utilitaire `enter` en dépendent ; `Loader.ts` le retire à la fin.
- **Animations** : `enter` (entrée au chargement, `--index` / `--delay`) et `data-reveal` (au défilement, `Animations.ts`). Tout est désactivé sous `prefers-reduced-motion: reduce`.

## DO / DONT

DO :

- Vérifier HTML, CSS et API du navigateur sur MDN (serveur MCP `mdn`), et la doc WordPress (https://developer.wordpress.org/reference/) avant d'écrire un helper.
- Coder et commenter en anglais ; chaînes utilisateur via `__()` avec le text domain `matthieuteyssandier`, puis régénérer `languages/matthieuteyssandier.pot`.
- Faire passer `composer phpcs`, `pnpm build` et `pnpm exec tsc -p .`.
- Commits en anglais avec gitmoji (skill `git-commits`).
- En TypeScript, privatiser avec `#` (règle `typescript-components`).

DONT :

- Pas de logique dans les `*.php` racine.
- Pas de valeurs de design en dur dans les classes (`bg-[#…]`, `w-[46px]`) : un token dans `@theme`.
- Pas de nouvelle feuille dans `src/stylesheets/components/` (règle `tailwind-twig`).
- Pas d'emoji ni de tiret cadratin dans les contenus rédigés.

Règles (`.claude/rules/`) : `timber-twig`, `twig-components`, `twig-wpcs`, `tailwind-twig`, `typescript-components`.
