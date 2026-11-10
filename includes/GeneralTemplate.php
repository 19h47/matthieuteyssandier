<?php
/**
 * GeneralTemplate
 *
 * @package MatthieuTeyssandier
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

namespace MatthieuTeyssandier;

use Timber\Timber;

/**
 * GeneralTemplate
 */
class GeneralTemplate implements Service {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run(): void {
		add_action( 'wp_body_open', array( $this, 'wp_body_open' ) );
	}

	/**
	 * Render elements after opening body tag. Thanks to wp_body_open hook.
	 *
	 * @see https://developer.wordpress.org/reference/hooks/wp_body_open/
	 */
	public function wp_body_open(): void {
		Timber::render( 'components/skip-links.html.twig', array() );
	}
}
