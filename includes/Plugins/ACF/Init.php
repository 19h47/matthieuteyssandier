<?php
/**
 * ACF Init
 *
 * @package MatthieuTeyssandier
 * @subpackage MatthieuTeyssandier/Plugins/ACF
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

namespace MatthieuTeyssandier\Plugins\ACF;

use MatthieuTeyssandier\Service;

/**
 * ACF Init
 */
class Init implements Service {

	/**
	 * Runs the initialization tasks.
	 *
	 * @return void
	 */
	public function run(): void {
		add_action( 'acf/init', array( $this, 'add_options_pages' ) );
	}

	/**
	 * Adds the options pages.
	 *
	 * @return void
	 */
	public function add_options_pages(): void {
		if ( ! function_exists( 'acf_add_options_page' ) ) {
			return;
		}

		acf_add_options_page(
			array(
				'page_title'  => __( 'Theme', 'matthieuteyssandier' ),
				'menu_slug'   => 'options-theme',
				'parent_slug' => 'options-general.php',
				'position'    => '',
				'redirect'    => false,
				'autoload'    => true,
			)
		);
	}
}
