<?php
/**
 * Post States
 *
 * @package MatthieuTeyssandier
 * @subpackage MatthieuTeyssandier/Template
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

namespace MatthieuTeyssandier\Template;

use MatthieuTeyssandier\Service;
use WP_Post;

/**
 * PostStates
 *
 * Adds a custom post state to the post/page edit screen.
 */
class PostStates implements Service {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run(): void {
		add_filter( 'display_post_states', array( $this, 'filter_post_states' ), 10, 2 );
	}

	/**
	 * Post states
	 *
	 * @param string[] $post_states An array of post display states.
	 * @param WP_Post  $post        The current post object.
	 *
	 * @return array $states
	 */
	public function filter_post_states( array $post_states, WP_Post $post ): array {
		if ( 'page-templates/about-page.php' === get_page_template_slug( $post ) ) {
			$post_states[] = __( 'About Page', 'matthieuteyssandier' );
		}

		return $post_states;
	}
}
