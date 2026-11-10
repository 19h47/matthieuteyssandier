<?php
/**
 * Context
 *
 * @package MatthieuTeyssandier
 * @subpackage MatthieuTeyssandier/Setup
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

namespace MatthieuTeyssandier\Setup;

use MatthieuTeyssandier\Service;
use Timber\{ Timber };

/**
 * Context
 *
 * Adds custom data to the global context.
 */
class Context implements Service {

	/**
	 * Runs initialization tasks.
	 *
	 * @return void
	 */
	public function run(): void {
		add_filter( 'timber/context', array( $this, 'add_to_context' ) );
	}

	/**
	 * Add custom data to the global context.
	 *
	 * Every page renders the header previews (case studies that are not on
	 * the front page) and the first visit loader (one dot per case study).
	 *
	 * @param array $context The global context.
	 *
	 * @return array
	 */
	public function add_to_context( array $context ): array {
		$context['options_theme'] = get_field( 'options_theme', 'option' );
		$context['front_ids']     = array_map( 'intval', (array) get_field( 'case_studies', get_option( 'page_on_front' ) ) );
		$context['case_studies']  = Timber::get_posts(
			array(
				'post_type'      => 'case_study',
				'posts_per_page' => -1,
			)
		);

		return $context;
	}
}
