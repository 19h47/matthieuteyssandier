<?php
/**
 * Enqueue
 *
 * @package MatthieuTeyssandier
 * @subpackage MatthieuTeyssandier/Setup
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

namespace MatthieuTeyssandier\Setup;

use MatthieuTeyssandier\{ Service, Vite };

/**
 * Theme asset enqueue setup.
 *
 * Registers and enqueues stylesheets and scripts used by the theme.
 */
class Enqueue implements Service {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run(): void {
		add_filter( 'wp_preload_resources', array( $this, 'preload_resources' ) );
		add_filter( 'wp_speculation_rules_configuration', array( $this, 'speculation_rules_configuration' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}


	/**
	 * Preload Neue Montreal, painted above the fold on every page, so it is
	 * not discovered only once the CSS is parsed.
	 *
	 * @param array $resources Resources to preload.
	 * @return array
	 */
	public function preload_resources( array $resources ): array {
		foreach ( array( 'neue-montreal-regular', 'neue-montreal-bold' ) as $font ) {
			$resources[] = array(
				'href'        => Vite::asset( 'src/fonts/' . $font . '.woff2' ),
				'as'          => 'font',
				'type'        => 'font/woff2',
				'crossorigin' => 'anonymous',
			);
		}

		return $resources;
	}

	/**
	 * Prefetch a linked page after a short hover (`moderate`) rather than on
	 * click. Prefetch only: prerendering would play the entrance animations
	 * before the page is shown. `null` (logged-in visitors, plain permalinks)
	 * keeps speculative loading off.
	 *
	 * @param array|null $config Speculation rules configuration.
	 * @return array|null
	 */
	public function speculation_rules_configuration( ?array $config ): ?array {
		if ( null === $config ) {
			return null;
		}

		return array(
			'mode'      => 'prefetch',
			'eagerness' => 'moderate',
		);
	}

	/**
	 * Enqueue styles.
	 *
	 * @return void
	 */
	public function enqueue_styles(): void {
		// phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion -- Vite hashes the file name.
		wp_enqueue_style( get_theme_text_domain() . '-main', Vite::asset( 'src/stylesheets/styles.css' ), array(), null );
	}

	/**
	 * Enqueue scripts
	 *
	 * @return void
	 */
	public function enqueue_scripts(): void {
		Vite::enqueue_script_module();

		wp_enqueue_script_module( get_theme_text_domain() . '-main', Vite::asset( 'src/scripts/app.js' ), array(), null );
	}
}
